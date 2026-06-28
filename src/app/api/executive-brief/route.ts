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

    const prompt = `You are a Chief of Staff writing a brief for a CEO. Write an executive summary under 200 words.
Structure: Situation → Root Cause → Recommendation → Expected Outcome.
No bullet points. Flowing paragraphs only. Direct and confident tone.

Question: ${question}
What happened: ${whatHappened}
Why: ${whyItHappened}
Recommended action: ${whatToDo}
Estimated impact: ${estimatedImpact}`

    const brief = await generate(prompt)
    return NextResponse.json({ brief })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ brief: "Failed to generate brief." }, { status: 500 })
  }
}