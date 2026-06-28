import { NextRequest, NextResponse } from "next/server"

async function generate(prompt: string): Promise<string> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    }),
  })
  const data = await res.json()
  return data?.choices?.[0]?.message?.content?.trim() ?? ""
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