"use client"
import { useState } from "react"
import QueryInput from "@/components/dashboard/QueryInput"
import QueryResult from "@/components/dashboard/QueryResult"
import type { QueryResult as QR } from "@/types"

const SUGGESTED = [
  "Which customers are at risk of churning?",
  "Why did revenue drop last month?",
  "Top upsell opportunities right now?",
  "Products with declining sales in Q2?",
  "Show me top 10 customers by spend",
  "Compare revenue by region last 90 days",
]

const STATS = [
  { label: "Queries run", value: "—", sub: "this month" },
  { label: "Avg response", value: "1.4s", sub: "last 7 days" },
  { label: "Data sources", value: "1", sub: "connected" },
  { label: "Team members", value: "1", sub: "active" },
]

export default function DashboardPage() {
  const [result, setResult] = useState<QR | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [queryCount, setQueryCount] = useState(0)

  async function handleQuery(question: string) {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naturalLanguage: question }),
      })
      const data = await res.json()
      if (!data.success) { setError(data.error || "Something went wrong"); return }
      setResult(data)
      setQueryCount(c => c + 1)
    } catch {
      setError("Failed to connect. Add your ANTHROPIC_API_KEY to .env.local")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "40px 28px" }}>

      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: "6px" }}>
          Ask your data anything
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-3)" }}>
          Connected to Acme Corp · Aurora DSQL + DynamoDB
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "32px" }}>
        {STATS.map(({ label, value, sub }, i) => (
          <div key={label} className="qm-card" style={{ padding: "18px" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-1)", marginBottom: "4px" }}>
              {i === 0 ? queryCount || "—" : value}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-2)", fontWeight: 500 }}>{label}</div>
            <div style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "2px" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Query input */}
      <QueryInput onSubmit={handleQuery} loading={loading} />

      {/* Suggestions */}
      {!result && !loading && (
        <div style={{ marginTop: "24px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.08em", marginBottom: "12px" }}>
            SUGGESTED QUESTIONS
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {SUGGESTED.map(q => (
              <button key={q} className="qm-pill" onClick={() => handleQuery(q)}>{q}</button>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{
          marginTop: "20px", padding: "16px 20px", borderRadius: "12px",
          background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
          fontSize: "14px", color: "#FCA5A5"
        }}>
          ⚠ {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ marginTop: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <span className="dot" /><span className="dot" /><span className="dot" />
            <span style={{ fontSize: "14px", color: "var(--text-3)", marginLeft: "4px" }}>Analyzing your data...</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div className="skeleton" style={{ height: "90px" }} />
            <div className="skeleton" style={{ height: "90px" }} />
            <div className="skeleton" style={{ height: "90px" }} />
            <div className="skeleton" style={{ height: "220px", marginTop: "4px" }} />
          </div>
        </div>
      )}

      {/* Result */}
      {result && !loading && <QueryResult result={result} />}
    </div>
  )
}
