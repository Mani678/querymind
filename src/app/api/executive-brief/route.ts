import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { question, whatHappened, whyItHappened, whatToDo, estimatedImpact } = await req.json()

    const prompt = `You are a Chief of Staff writing a brief for a CEO. Write an executive summary under 200 words.
Structure: Situation → Root Cause → Recommendation → Expected Outcome.
No bullet points. Flowing paragraphs only. Direct and confident tone.

Question: ${question}
What happened: ${whatHappened}
Why: ${whyItHappened}
Recommended action: ${whatToDo}
Estimated impact: ${estimatedImpact}`

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    })
    const brief = response.text ?? ""
    return NextResponse.json({ brief })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ brief: "Failed to generate brief." }, { status: 500 })
  }
}