import { drizzle } from "drizzle-orm/node-postgres"
import { getPool } from "./aurora"
import * as schema from "./schema"

let dbInstance: ReturnType<typeof drizzle> | null = null

export async function getDb() {
  const pool = await getPool()
  dbInstance = drizzle(pool, { schema })
  return dbInstance
}

// Keep a sync version for compatibility
import { Pool } from "pg"
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  max: 10,
})

export const db = drizzle(pool, { schema })
export { pool }