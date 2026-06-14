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

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      queryId: uuidv4(),
      naturalLanguage,
      generatedSQL: result.sql ?? "",
      rows: result.rows ?? [],
      rowCount: result.rows?.length ?? 0,
      chartType: result.chartType ?? "table",
      whatHappened: result.whatHappened ?? "",
      whyItHappened: result.whyItHappened ?? "",
      whatToDo: result.whatToDo ?? "",
      estimatedImpact: result.estimatedImpact ?? "",
      executionMs: result.executionMs ?? 0,
    })

  } catch (err: any) {
    console.error("Query API error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}