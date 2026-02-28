import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read file content
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let textContent = "";

    if (file.name.endsWith(".pdf")) {
      // Dynamic import for pdf-parse
      const pdfParse = (await import("pdf-parse")).default;
      const pdfData = await pdfParse(buffer);
      textContent = pdfData.text;
    } else if (file.name.endsWith(".docx")) {
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      textContent = result.value;
    } else {
      return NextResponse.json({ error: "Unsupported file format. Use PDF or DOCX." }, { status: 400 });
    }

    if (!textContent.trim()) {
      return NextResponse.json({ error: "Could not extract text from the file." }, { status: 400 });
    }

    const prompt = `
You are an expert resume analyzer and career coach. Analyze the following resume thoroughly and return a JSON response with the following structure. Be very precise and detailed.

RESUME TEXT:
"""
${textContent}
"""

${jobDescription ? `JOB DESCRIPTION:\n"""\n${jobDescription}\n"""` : ""}

Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:
{
  "atsScore": <number 0-100>,
  "atsDetails": {
    "formatting": <number 0-100>,
    "keywords": <number 0-100>,
    "structure": <number 0-100>,
    "readability": <number 0-100>
  },
  "skills": {
    "technical": ["skill1", "skill2", ...],
    "soft": ["skill1", "skill2", ...],
    "tools": ["tool1", "tool2", ...]
  },
  "experience": {
    "totalYears": <number or "Entry Level">,
    "positions": [
      {
        "title": "...",
        "company": "...",
        "duration": "..."
      }
    ]
  },
  "education": [
    {
      "degree": "...",
      "institution": "...",
      "year": "..."
    }
  ],
  "strengths": ["strength1", "strength2", "strength3", "strength4", "strength5"],
  "weaknesses": ["weakness1", "weakness2", "weakness3", "weakness4", "weakness5"],
  "improvements": [
    {
      "category": "...",
      "suggestion": "...",
      "priority": "high" | "medium" | "low"
    }
  ],
  "jobMatch": ${jobDescription ? `{
    "score": <number 0-100>,
    "matchedKeywords": ["keyword1", "keyword2"],
    "missingKeywords": ["keyword1", "keyword2"],
    "suggestions": ["suggestion1", "suggestion2"]
  }` : "null"},
  "summary": "A 2-3 sentence professional summary of the candidate's profile"
}
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // Clean JSON from potential markdown wrapping
    text = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const analysis = JSON.parse(text);

    return NextResponse.json({ success: true, analysis });
  } catch (error: unknown) {
    console.error("Analysis error:", error);
    const message = error instanceof Error ? error.message : "Analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}