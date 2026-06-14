import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { question, whatHappened, whyItHappened, whatToDo, estimatedImpact } = await req.json()

    const res = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      system: `You are a Chief of Staff writing a brief for a CEO or board. Write an executive summary that is:
- Under 200 words
- Written in confident, direct language
- Structured as: Situation → Root Cause → Recommendation → Expected Outcome
- No bullet points — flowing paragraphs only
- Sounds like it came from McKinsey, not a chatbot`,
      messages: [{
        role: "user",
        content: `Question: ${question}
What happened: ${whatHappened}
Why: ${whyItHappened}
Recommended action: ${whatToDo}
Estimated impact: ${estimatedImpact}`
      }]
    })

    const brief = res.content[0].type === "text" ? res.content[0].text : ""
    return NextResponse.json({ brief })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ brief: "Failed to generate brief." }, { status: 500 })
  }
}