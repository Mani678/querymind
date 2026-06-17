import { DsqlSigner } from "@aws-sdk/dsql-signer"
import { Pool } from "pg"

let pool: Pool | null = null

export async function getPool(): Promise<Pool> {
  const endpoint = process.env.AURORA_DSQL_ENDPOINT!
  const region = process.env.AWS_REGION || "eu-west-2"

  const signer = new DsqlSigner({
    hostname: endpoint,
    region,
  })

  const token = await signer.getDbConnectAdminAuthToken()

  if (pool) {
    await pool.end()
    pool = null
  }

  pool = new Pool({
    host: endpoint,
    port: 5432,
    database: "postgres",
    user: "admin",
    password: token,
    ssl: { rejectUnauthorized: false },
    max: 1,
  })

  return pool
}