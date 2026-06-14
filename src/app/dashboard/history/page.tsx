"use client"
import { useEffect, useState } from "react"

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/history")
      .then(r => r.json())
      .then(d => { setHistory(d.queries || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "40px 28px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: "6px" }}>
        History
      </h1>
      <p style={{ fontSize: "14px", color: "var(--text-3)", marginBottom: "36px" }}>
        Every query run by your team
      </p>

      {/* Search */}
      <div style={{ marginBottom: "24px" }}>
        <input
          placeholder="Search queries..."
          style={{
            width: "100%", padding: "12px 16px", borderRadius: "12px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid var(--border)", color: "var(--text-1)",
            fontFamily: "inherit", fontSize: "14px", outline: "none",
          }}
        />
      </div>

      {loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: "80px" }} />
          ))}
        </div>
      )}

      {!loading && history.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <div style={{ fontSize: "40px", marginBottom: "16px" }}>◷</div>
          <p style={{ fontSize: "16px", color: "var(--text-2)", marginBottom: "8px" }}>No queries yet</p>
          <p style={{ fontSize: "14px", color: "var(--text-3)" }}>Go ask your data something from the Dashboard</p>
        </div>
      )}

      {!loading && history.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {history.map((q: any, i: number) => (
            <div key={q.id || i} className="qm-card" style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-1)", marginBottom: "6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {q.naturalLanguage}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "var(--text-3)" }}>
                  <span>{q.rowCount ?? "—"} rows</span>
                  <span>·</span>
                  <span>{q.executionMs ?? "—"}ms</span>
                  <span>·</span>
                  <span>{new Date(q.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <span style={{
                fontSize: "12px", padding: "4px 10px", borderRadius: "100px", flexShrink: 0,
                background: q.status === "success" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                color: q.status === "success" ? "#10B981" : "#EF4444",
                border: `1px solid ${q.status === "success" ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
              }}>
                {q.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}