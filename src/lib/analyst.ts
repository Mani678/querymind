import Anthropic from "@anthropic-ai/sdk"
import { getDemoData, DEMO_SCHEMA } from "./demo-data"
import { selectChartType } from "./chart-selector"
import type { SchemaCache, ChartType } from "@/types"

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

// ── Step 1: NL → SQL ─────────────────────────────────────────
export async function generateSQL(naturalLanguage: string, schema: SchemaCache): Promise<string> {
  const schemaText = schema.tables.map(t =>
    `Table: ${t.name}\nColumns: ${t.columns.map(c => `${c.name} (${c.type})`).join(", ")}`
  ).join("\n\n")

  const res = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1000,
    system: `You are a SQL expert. Generate safe read-only SELECT queries.
RULES:
- Only SELECT. Never INSERT, UPDATE, DELETE, DROP, CREATE, ALTER.
- Use exact table and column names from the schema.
- Add LIMIT 500 unless aggregating.
- Return ONLY the SQL. No explanation. No markdown.
- If impossible with this schema, return: ERROR: <reason>

SCHEMA:
${schemaText}`,
    messages: [{ role: "user", content: naturalLanguage }],
  })

  return res.content[0].type === "text" ? res.content[0].text.trim() : "ERROR: No response"
}

// ── Step 2: Execute against demo data ────────────────────────
export function executeDemoQuery(sql: string): Record<string, any>[] {
  const { orders, customers, monthly_revenue } = getDemoData()
  const sqlLower = sql.toLowerCase()

  // Route to the right table
  if (sqlLower.includes("monthly_revenue")) {
    return monthly_revenue
  }
  if (sqlLower.includes("customers")) {
    // Basic filter support
    if (sqlLower.includes("churn_risk = 'high'") || sqlLower.includes("churn_risk='high'")) {
      return customers.filter(c => c.churn_risk === "high")
    }
    if (sqlLower.includes("plan = 'enterprise'") || sqlLower.includes("plan='enterprise'")) {
      return customers.filter(c => c.plan === "enterprise")
    }
    if (sqlLower.includes("order by mrr desc")) {
      return [...customers].sort((a, b) => b.mrr - a.mrr).slice(0, 20)
    }
    return customers.slice(0, 50)
  }
  if (sqlLower.includes("orders")) {
    if (sqlLower.includes("group by category")) {
      const grouped: Record<string, number> = {}
      orders.forEach(o => { grouped[o.category] = (grouped[o.category] || 0) + o.amount })
      return Object.entries(grouped).map(([category, total_revenue]) => ({ category, total_revenue: Math.round(total_revenue) }))
    }
    if (sqlLower.includes("group by region")) {
      const grouped: Record<string, number> = {}
      orders.forEach(o => { grouped[o.region] = (grouped[o.region] || 0) + o.amount })
      return Object.entries(grouped).map(([region, total_revenue]) => ({ region, total_revenue: Math.round(total_revenue) }))
    }
    if (sqlLower.includes("status = 'pending'") || sqlLower.includes("status='pending'")) {
      return orders.filter(o => o.status === "pending").slice(0, 50)
    }
    if (sqlLower.includes("order by amount desc")) {
      return [...orders].sort((a, b) => b.amount - a.amount).slice(0, 20)
    }
    return orders.slice(0, 50)
  }

  return []
}

// ── Step 3: 3-Layer AI Analyst ────────────────────────────────
export async function generateAnalysis(
  naturalLanguage: string,
  sql: string,
  rows: Record<string, any>[],
  schema: SchemaCache
): Promise<{
  whatHappened: string
  whyItHappened: string
  whatToDo: string
  estimatedImpact: string
}> {
  const schemaText = schema.tables.map(t =>
    `Table: ${t.name} — columns: ${t.columns.map(c => c.name).join(", ")}`
  ).join("\n")

  const res = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1000,
    system: `You are a senior business analyst. Given a user's question, the SQL run, and the results, provide a 3-layer analysis.

Return ONLY valid JSON in this exact shape — no markdown, no extra text:
{
  "whatHappened": "1 sentence. The key factual finding with specific numbers.",
  "whyItHappened": "1-2 sentences. The most likely cause or contributing factor based on the data patterns.",
  "whatToDo": "1-2 sentences. The single most impactful recommended action.",
  "estimatedImpact": "Short phrase with a number if possible. e.g. '$8K–$12K revenue recovery' or '~15% churn reduction'"
}

Be specific. Use numbers from the data. No filler phrases like "Based on the analysis...".`,
    messages: [{
      role: "user",
      content: `Question: "${naturalLanguage}"
SQL run: ${sql}
Results (${rows.length} rows, first 30 shown):
${JSON.stringify(rows.slice(0, 30), null, 2)}
Available schema for context:
${schemaText}`
    }],
  })

  try {
    const text = res.content[0].type === "text" ? res.content[0].text.trim() : "{}"
    const clean = text.replace(/```json|```/g, "").trim()
    return JSON.parse(clean)
  } catch {
    return {
      whatHappened: "Query returned " + rows.length + " results.",
      whyItHappened: "Review the data above for patterns.",
      whatToDo: "Consider filtering or grouping the data further.",
      estimatedImpact: "Unknown",
    }
  }
}

// ── Full pipeline ─────────────────────────────────────────────
export async function runQueryPipeline(naturalLanguage: string, isDemo = true) {
  const schema = DEMO_SCHEMA // swap for real schema introspection later
  const startTime = Date.now()

  // Step 1: NL → SQL
  const sql = await generateSQL(naturalLanguage, schema)
  if (sql.startsWith("ERROR:")) {
    return { success: false, error: sql.replace("ERROR: ", ""), sql: null, rows: [], executionMs: 0 }
  }

  // Step 2: Execute
  const rows = isDemo ? executeDemoQuery(sql) : []

  // Step 3: Chart type
  const chartType: ChartType = selectChartType(rows, sql)

  // Step 4: 3-layer analysis
  const analysis = await generateAnalysis(naturalLanguage, sql, rows, schema)

  const executionMs = Date.now() - startTime

  return {
    success: true,
    sql,
    rows,
    rowCount: rows.length,
    chartType,
    executionMs,
    ...analysis,
  }
}
