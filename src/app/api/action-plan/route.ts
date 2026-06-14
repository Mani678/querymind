import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { question, whatHappened, whyItHappened, whatToDo, estimatedImpact } = await req.json()

    const res = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      system: `You are a senior business strategist. Generate a clear, numbered action plan based on a data insight.
Format it as:
IMMEDIATE (24-48 hours):
1. [Specific action]
2. [Specific action]

SHORT-TERM (1-2 weeks):
3. [Specific action]
4. [Specific action]

MEASURE SUCCESS BY:
- [KPI to track]
- [KPI to track]

Be specific, actionable, and concise. No filler.`,
      messages: [{
        role: "user",
        content: `Question: ${question}
What happened: ${whatHappened}
Why: ${whyItHappened}
Recommended action: ${whatToDo}
Estimated impact: ${estimatedImpact}`
      }]
    })

    const actionPlan = res.content[0].type === "text" ? res.content[0].text : ""
    return NextResponse.json({ actionPlan })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ actionPlan: "Failed to generate action plan." }, { status: 500 })
  }
}