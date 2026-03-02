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
        const parser = new PDFParse({ data: new Uint8Array(buffer) });
        const pdfData = await parser.getText();
        textContent = pdfData.text;
      } catch (err) {
        console.error("PDF parse error:", err);
        return NextResponse.json(
          { error: "Failed to parse PDF." },
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

    // ✅ PROMPT
    const prompt = `
You are an expert ATS resume analyzer.

Analyze the resume and return structured JSON.

RESUME:
${textContent}

${jobDescription ? `JOB DESCRIPTION:\n${jobDescription}` : ""}

Return ONLY valid JSON.
Do not include markdown.
Do not include explanations.
`;

    // ✅ GROQ CALL
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are an ATS resume analyzer that returns structured JSON.",
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

    let analysis;

    try {
      analysis = JSON.parse(text);
    } catch {
      console.error("Invalid JSON from AI:\n", text);
      return NextResponse.json(
        { error: "AI returned invalid JSON." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, analysis });
  } catch (error: unknown) {
    console.error("Analysis error:", error);

    return NextResponse.json(
      { error: "Analysis failed." },
      { status: 500 }
    );
  }
}