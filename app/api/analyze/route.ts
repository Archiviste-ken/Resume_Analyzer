import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Please set GEMINI_API_KEY in .env.local" },
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

    if (file.name.toLowerCase().endsWith(".pdf")) {
      try {
        // pdf-parse v2 uses PDFParse class
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { PDFParse } = require("pdf-parse");
        const parser = new PDFParse({ data: new Uint8Array(buffer) });
        const pdfData = await parser.getText();
        textContent = pdfData.text;
      } catch (pdfError) {
        console.error("PDF parsing error:", pdfError);
        return NextResponse.json(
          { error: "Failed to parse PDF. Ensure it is a valid PDF file." },
          { status: 400 }
        );
      }
    } else if (file.name.toLowerCase().endsWith(".docx")) {
      try {
        const mammoth = await import("mammoth");
        const result = await mammoth.extractRawText({ buffer });
        textContent = result.value;
      } catch (docxError) {
        console.error("DOCX parsing error:", docxError);
        return NextResponse.json(
          { error: "Failed to parse DOCX. Ensure it is a valid document." },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Unsupported file format. Please upload a PDF or DOCX file." },
        { status: 400 }
      );
    }

    if (!textContent.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from the file. It may be empty or image-only." },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert resume analyzer and career coach. Analyze the following resume thoroughly and return a JSON response with the following structure. Be very precise and detailed.

RESUME TEXT:
"""
${textContent}
"""

${jobDescription ? `JOB DESCRIPTION:\n"""\n${jobDescription}\n"""` : ""}

Return ONLY valid JSON (no markdown, no code blocks, no extra text) with this exact structure:
{
  "atsScore": <number 0-100>,
  "atsDetails": {
    "formatting": <number 0-100>,
    "keywords": <number 0-100>,
    "structure": <number 0-100>,
    "readability": <number 0-100>
  },
  "skills": {
    "technical": ["skill1", "skill2"],
    "soft": ["skill1", "skill2"],
    "tools": ["tool1", "tool2"]
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

    text = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

    let analysis;
    try {
      analysis = JSON.parse(text);
    } catch {
      console.error("JSON parse error. Raw response:", text);
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, analysis });
  } catch (error: unknown) {
    console.error("Analysis error:", error);

    if (error instanceof Error) {
      const msg = error.message || "";
      console.error("Error message:", msg);

      if (msg.includes("API_KEY_INVALID") || msg.includes("API key not valid")) {
        return NextResponse.json(
          { error: "Invalid API key. Check your GEMINI_API_KEY in .env.local" },
          { status: 401 }
        );
      }
      if (msg.includes("RESOURCE_EXHAUSTED") || msg.includes("quota") || msg.includes("429") || msg.includes("rate limit")) {
        return NextResponse.json(
          { error: "API rate limit exceeded. Please wait a minute and try again." },
          { status: 429 }
        );
      }
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}