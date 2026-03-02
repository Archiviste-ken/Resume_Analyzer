import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const maxDuration = 60;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY not configured." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("resume") as File | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let textContent = "";

    // ✅ PDF parsing
    if (file.name.toLowerCase().endsWith(".pdf")) {
      try {
        const { PDFParse } = await import("pdf-parse");
        PDFParse.setWorker("");
        const parser = new PDFParse({ data: new Uint8Array(buffer) });
        const pdfData = await parser.getText();
        textContent = pdfData.text;
      } catch (err) {
        console.error("PDF parse error:", err);
        return NextResponse.json(
          { error: "Failed to parse PDF. Please ensure the file is a valid PDF." },
          { status: 400 }
        );
      }
    }

    // ✅ DOCX parsing
    else if (file.name.toLowerCase().endsWith(".docx")) {
      try {
        const mammoth = await import("mammoth");
        const result = await mammoth.extractRawText({ buffer });
        textContent = result.value;
      } catch (err) {
        console.error("DOCX parse error:", err);
        return NextResponse.json(
          { error: "Failed to parse DOCX." },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Upload PDF or DOCX only." },
        { status: 400 }
      );
    }

    if (!textContent.trim()) {
      return NextResponse.json(
        { error: "No text extracted from file." },
        { status: 400 }
      );
    }

    // Truncate very long resumes to avoid hitting token limits
    const maxChars = 6000;
    if (textContent.length > maxChars) {
      textContent = textContent.substring(0, maxChars);
    }

    // ✅ PROMPT with explicit JSON schema
    const prompt = `
You are an expert ATS resume analyzer. Analyze the following resume and return a JSON object with EXACTLY this structure. All number scores must be between 0 and 100.

RESUME:
${textContent}

${jobDescription ? `JOB DESCRIPTION:\n${jobDescription}` : ""}

Return ONLY a valid JSON object with EXACTLY this structure (no markdown, no explanation, no extra text):
{
  "atsScore": <number 0-100>,
  "atsDetails": {
    "formatting": <number 0-100>,
    "keywords": <number 0-100>,
    "structure": <number 0-100>,
    "readability": <number 0-100>
  },
  "skills": {
    "technical": [<list of technical skill strings>],
    "soft": [<list of soft skill strings>],
    "tools": [<list of tool/platform strings>]
  },
  "experience": {
    "totalYears": <number or string>,
    "positions": [{"title": "<string>", "company": "<string>", "duration": "<string>"}]
  },
  "education": [{"degree": "<string>", "institution": "<string>", "year": "<string>"}],
  "strengths": [<list of strength strings>],
  "weaknesses": [<list of weakness strings>],
  "improvements": [{"category": "<string>", "suggestion": "<string>", "priority": "high|medium|low"}],
  ${jobDescription ? `"jobMatch": {"score": <number 0-100>, "matchedKeywords": [<strings>], "missingKeywords": [<strings>], "suggestions": [<strings>]},` : `"jobMatch": null,`}
  "summary": "<brief 1-2 sentence summary of the resume>"
}
`;

    // ✅ GROQ CALL
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      max_tokens: 2048,
      messages: [
        {
          role: "system",
          content:
            "You are an ATS resume analyzer. You MUST return ONLY valid JSON matching the exact schema requested. No markdown, no explanation, no extra text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let text = completion.choices[0].message.content ?? "";

    // remove markdown if model adds it
    text = text.replace(/```json\s*/gi, "").replace(/```/g, "").trim();

    // Try to extract JSON if there's extra text around it
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      text = jsonMatch[0];
    }

    let analysis;

    try {
      analysis = JSON.parse(text);
    } catch {
      console.error("Invalid JSON from AI:\n", text);
      return NextResponse.json(
        { error: "AI returned invalid JSON. Please try again." },
        { status: 500 }
      );
    }

    // Ensure required fields exist with defaults
    analysis.atsScore = typeof analysis.atsScore === "number" ? analysis.atsScore : 50;
    analysis.atsDetails = {
      formatting: analysis.atsDetails?.formatting ?? 50,
      keywords: analysis.atsDetails?.keywords ?? 50,
      structure: analysis.atsDetails?.structure ?? 50,
      readability: analysis.atsDetails?.readability ?? 50,
    };
    analysis.skills = {
      technical: Array.isArray(analysis.skills?.technical) ? analysis.skills.technical : [],
      soft: Array.isArray(analysis.skills?.soft) ? analysis.skills.soft : [],
      tools: Array.isArray(analysis.skills?.tools) ? analysis.skills.tools : [],
    };
    analysis.experience = {
      totalYears: analysis.experience?.totalYears ?? 0,
      positions: Array.isArray(analysis.experience?.positions) ? analysis.experience.positions : [],
    };
    analysis.education = Array.isArray(analysis.education) ? analysis.education : [];
    analysis.strengths = Array.isArray(analysis.strengths) ? analysis.strengths : [];
    analysis.weaknesses = Array.isArray(analysis.weaknesses) ? analysis.weaknesses : [];
    analysis.improvements = Array.isArray(analysis.improvements) ? analysis.improvements : [];
    analysis.summary = analysis.summary ?? "Resume analysis complete.";
    if (jobDescription && !analysis.jobMatch) {
      analysis.jobMatch = { score: 0, matchedKeywords: [], missingKeywords: [], suggestions: [] };
    }

    return NextResponse.json({ success: true, analysis });
  } catch (error: unknown) {
    console.error("Analysis error:", error);

    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}