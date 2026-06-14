import { NextRequest, NextResponse } from "next/server"
import { runQueryPipeline } from "@/lib/analyst"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { naturalLanguage } = body

    if (!naturalLanguage?.trim()) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const result = await runQueryPipeline(naturalLanguage, true)

    return NextResponse.json({
      success: result.success,
      queryId: uuidv4(),
      naturalLanguage,
      generatedSQL: (result as any).sql ?? "",
      rows: (result as any).rows ?? [],
      rowCount: (result as any).rows?.length ?? 0,
      chartType: (result as any).chartType ?? "table",
      whatHappened: (result as any).whatHappened ?? "",
      whyItHappened: (result as any).whyItHappened ?? "",
      whatToDo: (result as any).whatToDo ?? "",
      estimatedImpact: (result as any).estimatedImpact ?? "",
      executionMs: (result as any).executionMs ?? 0,
      error: (result as any).error ?? null,
    })

  } catch (err: any) {
    console.error("Query API error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}