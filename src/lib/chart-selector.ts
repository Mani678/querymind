import type { ChartType } from "@/types"

export function selectChartType(rows: Record<string, any>[], sql: string): ChartType {
  if (!rows || rows.length === 0) return "table"
  const columns = Object.keys(rows[0])
  const numericCols = columns.filter(c => typeof rows[0][c] === "number")
  const textCols = columns.filter(c => typeof rows[0][c] === "string")
  const hasTimeCol = columns.some(c => /date|time|month|week|day|year|quarter/i.test(c))

  if (hasTimeCol && numericCols.length >= 1 && rows.length > 2) return "line"
  if (rows.length <= 8 && numericCols.length === 1 && textCols.length === 1) return "pie"
  if (textCols.length >= 1 && numericCols.length >= 1 && rows.length <= 50) return "bar"
  return "table"
}
