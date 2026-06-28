import { NextRequest, NextResponse } from "next/server"

async function generate(prompt: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY!,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  )
  const data = await res.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? ""
}

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

    const actionPlan = await generate(prompt)
    return NextResponse.json({ actionPlan })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ actionPlan: "Failed to generate action plan." }, { status: 500 })
  }
}