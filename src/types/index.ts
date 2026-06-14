export type ChartType = "bar" | "line" | "pie" | "table"

export type QueryStatus = "pending" | "success" | "error"

export interface QueryResult {
  queryId: string
  naturalLanguage: string
  generatedSQL: string
  rows: Record<string, any>[]
  rowCount: number
  chartType: ChartType
  // The 3-layer AI analyst response
  whatHappened: string      // Layer 1 — the fact
  whyItHappened: string     // Layer 2 — the diagnosis
  whatToDo: string          // Layer 3 — recommended action
  estimatedImpact: string   // e.g. "$12K MRR recovery"
  executionMs: number
  error?: string
}

export interface DataSource {
  id: string
  name: string
  type: "postgres" | "aurora" | "csv" | "demo"
  isDemo: boolean
  schemaCache?: SchemaCache
}

export interface SchemaCache {
  tables: {
    name: string
    columns: { name: string; type: string }[]
  }[]
}

export interface SavedQuery {
  id: string
  naturalLanguage: string
  chartType: ChartType
  createdAt: string
  isPinned: boolean
  isShared: boolean
  shareToken?: string
  result?: QueryResult
}
