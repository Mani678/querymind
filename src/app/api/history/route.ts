import { NextResponse } from "next/server"
import { getOrgHistory } from "@/lib/dynamo"

export async function GET() {
  try {
    const history = await getOrgHistory("demo-org", 50)
    return NextResponse.json({ queries: history })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ queries: [] })
  }
}