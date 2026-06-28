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