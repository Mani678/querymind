import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { queries, organizations } from "@/lib/schema"
import { eq, desc } from "drizzle-orm"

export async function GET() {
  try {
    const { userId, orgId } = await auth()
    if (!userId || !orgId) return NextResponse.json({ queries: [] })

    const [org] = await db.select().from(organizations).where(eq(organizations.clerkOrgId, orgId)).limit(1)
    if (!org) return NextResponse.json({ queries: [] })

    const history = await db.select().from(queries)
      .where(eq(queries.orgId, org.id))
      .orderBy(desc(queries.createdAt))
      .limit(50)

    return NextResponse.json({ queries: history })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ queries: [] })
  }
}
