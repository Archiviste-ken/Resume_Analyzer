import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs"; // REQUIRED for file parsing
export const maxDuration = 60;

// initialize Groq safely
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    // ✅ API key safety check
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Server misconfigured: missing API key." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("resume") as File | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "Please upload a resume." },
        { status: 400 }
      );
    }

    // 🚫 block very large files (prevents server crash)
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Max 4MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    let textContent = "";

    // =========================
    // ✅ PDF parsing (build-safe)
    // =========================
if (file.name.toLowerCase().endsWith(".pdf")) {
  try {
    const pdfParse = (await import("pdf-parse")) as unknown as (
      buffer: Buffer
    ) => Promise<{ text: string }>;

    const data = await pdfParse(buffer);
    textContent = data.text;

  } catch (err) {
    console.error("PDF parse error:", err);
    return NextResponse.json(
      { error: "Unable to read PDF." },
      { status: 400 }
    );
  }
}
    // =========================
    // ✅ DOCX parsing
    // =========================
    else if (file.name.toLowerCase().endsWith(".docx")) {
      try {
        const mammoth = await import("mammoth");
        const result = await mammoth.extractRawText({ buffer });
        textContent = result.value;
      } catch (err) {
        console.error("DOCX parse error:", err);
        return NextResponse.json(
          { error: "Unable to read DOCX." },
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
        { error: "No readable text found in resume." },
        { status: 400 }
      );
    }

    // limit text to avoid token overflow & timeouts
    if (textContent.length > 6000) {
      textContent = textContent.slice(0, 6000);
    }

    // =========================
    // ✅ PROMPT
    // =========================
    const prompt = `
You are an expert ATS resume analyzer.

RESUME:
${textContent}

${jobDescription ? `JOB DESCRIPTION:\n${jobDescription}` : ""}

Return ONLY valid JSON with:

{
  "atsScore": number,
  "atsDetails": {
    "formatting": number,
    "keywords": number,
    "structure": number,
    "readability": number
  },
  "skills": {
    "technical": [],
    "soft": [],
    "tools": []
  },
  "experience": {
    "totalYears": number,
    "positions": [{"title":"","company":"","duration":""}]
  },
  "education": [{"degree":"","institution":"","year":""}],
  "strengths": [],
  "weaknesses": [],
  "improvements": [{"category":"","suggestion":"","priority":"high|medium|low"}],
  ${jobDescription ? `"jobMatch": {"score": number, "matchedKeywords": [], "missingKeywords": [], "suggestions": []},` : `"jobMatch": null,`}
  "summary": ""
}
`;

    // =========================
    // ✅ GROQ REQUEST
    // =========================
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      max_tokens: 2048,
      messages: [
        {
          role: "system",
          content:
            "Return ONLY valid JSON. No explanation. No markdown.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let text = completion.choices?.[0]?.message?.content ?? "";

    // remove markdown if AI adds it
    text = text.replace(/```json\s*/gi, "").replace(/```/g, "").trim();

    // extract JSON safely
    const match = text.match(/\{[\s\S]*\}/);
    if (match) text = match[0];

    let analysis;
    try {
      analysis = JSON.parse(text);
    } catch {
      console.error("Invalid JSON from AI:", text);
      return NextResponse.json(
        { error: "AI response parsing failed." },
        { status: 500 }
      );
    }

    // =========================
    // ✅ SAFE DEFAULTS
    // =========================
    analysis.atsScore ??= 50;

    analysis.atsDetails ??= {};
    analysis.atsDetails.formatting ??= 50;
    analysis.atsDetails.keywords ??= 50;
    analysis.atsDetails.structure ??= 50;
    analysis.atsDetails.readability ??= 50;

    analysis.skills ??= { technical: [], soft: [], tools: [] };
    analysis.experience ??= { totalYears: 0, positions: [] };
    analysis.education ??= [];
    analysis.strengths ??= [];
    analysis.weaknesses ??= [];
    analysis.improvements ??= [];
    analysis.summary ??= "Resume analysis complete.";

    if (jobDescription && !analysis.jobMatch) {
      analysis.jobMatch = {
        score: 0,
        matchedKeywords: [],
        missingKeywords: [],
        suggestions: [],
      };
    }

    return NextResponse.json({ success: true, analysis });

  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Try again." },
      { status: 500 }
    );
  }
}