import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { question, whatHappened, whyItHappened, whatToDo, estimatedImpact } = await req.json()

    const prompt = `You are a senior business strategist. Generate a clear numbered action plan.
Format exactly like this — no markdown, no backticks:

IMMEDIATE (24-48 hours):
1. [Specific action]
2. [Specific action]

SHORT-TERM (1-2 weeks):
3. [Specific action]
4. [Specific action]

MEASURE SUCCESS BY:
- [KPI to track]
- [KPI to track]

Question: ${question}
What happened: ${whatHappened}
Why: ${whyItHappened}
Recommended action: ${whatToDo}
Estimated impact: ${estimatedImpact}`

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    })
    const actionPlan = response.text ?? ""
    return NextResponse.json({ actionPlan })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ actionPlan: "Failed to generate action plan." }, { status: 500 })
  }
}