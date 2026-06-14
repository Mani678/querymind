"use client"
import { useState } from "react"
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts"
import type { QueryResult } from "@/types"

const COLORS = ["#6D5DFC", "#00D4FF", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6"]

const TT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "10px 14px", fontSize: "12px" }}>
      <div style={{ color: "var(--text-3)", marginBottom: "6px" }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ color: p.color, fontWeight: 500 }}>
          {p.dataKey}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
        </div>
      ))}
    </div>
  )
}

export default function QueryResult({ result }: { result: QueryResult }) {
  const [view, setView] = useState<"chart" | "table" | "sql">("chart")
  const [copied, setCopied] = useState(false)
  const [actionPlan, setActionPlan] = useState<string | null>(null)
  const [brief, setBrief] = useState<string | null>(null)
  const [loadingAction, setLoadingAction] = useState(false)
  const [loadingBrief, setLoadingBrief] = useState(false)

  const cols = result.rows?.length ? Object.keys(result.rows[0]) : []

  function copySQL() {
    navigator.clipboard.writeText(result.generatedSQL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function generateActionPlan() {
    setLoadingAction(true)
    try {
      const res = await fetch("/api/action-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: result.naturalLanguage,
          whatHappened: result.whatHappened,
          whyItHappened: result.whyItHappened,
          whatToDo: result.whatToDo,
          estimatedImpact: result.estimatedImpact,
        }),
      })
      const data = await res.json()
      setActionPlan(data.actionPlan)
    } catch {
      setActionPlan("Failed to generate action plan. Try again.")
    } finally {
      setLoadingAction(false)
    }
  }

  async function generateBrief() {
    setLoadingBrief(true)
    try {
      const res = await fetch("/api/executive-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: result.naturalLanguage,
          whatHappened: result.whatHappened,
          whyItHappened: result.whyItHappened,
          whatToDo: result.whatToDo,
          estimatedImpact: result.estimatedImpact,
        }),
      })
      const data = await res.json()
      setBrief(data.brief)
    } catch {
      setBrief("Failed to generate brief. Try again.")
    } finally {
      setLoadingBrief(false)
    }
  }

  // Derive business impact from result
  const impactNumber = result.estimatedImpact?.match(/\$[\d,k]+/i)?.[0] || null
  const confidence = result.rowCount > 20 ? "High" : result.rowCount > 10 ? "Medium" : "Low"
  const confidenceColor = confidence === "High" ? "var(--success)" : confidence === "Medium" ? "var(--warning)" : "#EF4444"

  return (
    <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>

      {/* Status bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-3)" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--success)", display: "inline-block" }} />
        Completed in {result.executionMs}ms · {result.rowCount} rows · Aurora DSQL
      </div>

      {/* Question echo */}
      <div style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-1)", lineHeight: 1.4, padding: "4px 0" }}>
        {result.naturalLanguage}
      </div>

      {/* 3 Analyst Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

        <div className="layer-card layer-what">
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#A5B4FC", marginBottom: "10px" }}>📊 WHAT HAPPENED</div>
          <p style={{ fontSize: "15px", color: "var(--text-1)", lineHeight: 1.6 }}>{result.whatHappened}</p>
        </div>

        <div className="layer-card layer-why">
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#FCD34D", marginBottom: "10px" }}>🔍 WHY IT HAPPENED</div>
          <p style={{ fontSize: "15px", color: "var(--text-1)", lineHeight: 1.6 }}>{result.whyItHappened}</p>
        </div>

        <div className="layer-card layer-do">
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#6EE7B7", marginBottom: "10px" }}>⚡ WHAT TO DO</div>
          <p style={{ fontSize: "15px", color: "var(--text-1)", lineHeight: 1.6, marginBottom: "14px" }}>{result.whatToDo}</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "100px", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", fontSize: "13px", fontWeight: 600, color: "#10B981" }}>
            💰 {result.estimatedImpact}
          </div>
        </div>
      </div>

      {/* Business Impact Card */}
      <div className="qm-card" style={{ padding: "24px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "var(--text-3)", marginBottom: "16px" }}>📈 BUSINESS IMPACT</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "26px", fontWeight: 700, color: "#6D5DFC", marginBottom: "4px" }}>
              {impactNumber || "~$0"}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-3)" }}>Revenue at risk</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "26px", fontWeight: 700, color: "#F59E0B", marginBottom: "4px" }}>
              {result.rowCount}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-3)" }}>Records affected</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "26px", fontWeight: 700, color: confidenceColor, marginBottom: "4px" }}>
              {confidence}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-3)" }}>Confidence</div>
          </div>
        </div>
      </div>

      {/* Action Center */}
      <div className="qm-card" style={{ padding: "24px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "var(--text-3)", marginBottom: "16px" }}>🎯 ACTION CENTER</div>

        {!actionPlan && (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              className="qm-btn-primary"
              onClick={generateActionPlan}
              disabled={loadingAction}
              style={{ padding: "10px 20px", fontSize: "14px" }}>
              {loadingAction ? "Generating..." : "⚡ Generate Action Plan"}
            </button>
            <button className="qm-btn-ghost" style={{ padding: "10px 20px", fontSize: "14px" }}
              onClick={() => {
                const subject = encodeURIComponent(`Action Required: ${result.naturalLanguage}`)
                const body = encodeURIComponent(`Hi,\n\nHere's a summary of our data analysis:\n\n${result.whatHappened}\n\nWhy this happened:\n${result.whyItHappened}\n\nRecommended action:\n${result.whatToDo}\n\nEstimated impact: ${result.estimatedImpact}\n\nGenerated by QueryMind`)
                window.location.href = `mailto:?subject=${subject}&body=${body}`
              }}>
              📧 Draft Email
            </button>
            <button className="qm-btn-ghost" style={{ padding: "10px 20px", fontSize: "14px" }}
              onClick={generateBrief}
              disabled={loadingBrief}>
              {loadingBrief ? "Generating..." : "📄 Executive Brief"}
            </button>
          </div>
        )}

        {actionPlan && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-1)" }}>Your Action Plan</span>
              <button className="qm-btn-ghost" onClick={() => setActionPlan(null)} style={{ padding: "4px 10px", fontSize: "12px" }}>Reset</button>
            </div>
            <div style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
              {actionPlan}
            </div>
          </div>
        )}
      </div>

      {/* Executive Brief */}
      {brief && (
        <div className="qm-card" style={{ padding: "24px", border: "1px solid rgba(109,93,252,0.3)", background: "linear-gradient(135deg, rgba(109,93,252,0.06), rgba(109,93,252,0.02))" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#A5B4FC" }}>📄 EXECUTIVE BRIEF</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button className="qm-btn-ghost" onClick={() => navigator.clipboard.writeText(brief)} style={{ padding: "4px 10px", fontSize: "12px" }}>Copy</button>
              <button className="qm-btn-ghost" onClick={() => setBrief(null)} style={{ padding: "4px 10px", fontSize: "12px" }}>Close</button>
            </div>
          </div>
          <div style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
            {brief}
          </div>
        </div>
      )}

      {/* Chart / Table / SQL */}
      <div className="qm-card" style={{ overflow: "hidden", marginTop: "4px" }}>
        <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid var(--border)", padding: "0 4px" }}>
          {(["chart", "table", "sql"] as const).map(t => (
            <button key={t} className={`qm-tab ${view === t ? "active" : ""}`} onClick={() => setView(t)}>
              {t === "chart" ? "📈" : t === "table" ? "⊟" : "</>"}
              {" "}{t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <button className="qm-btn-ghost" onClick={() => { navigator.clipboard.writeText(window.location.origin + "/share/" + result.queryId); alert("Link copied!") }} style={{ padding: "6px 12px", fontSize: "12px", margin: "0 4px" }}>Share</button>
          <button className="qm-btn-ghost" style={{ padding: "6px 12px", fontSize: "12px", margin: "0 4px 0 0" }}>Pin</button>
        </div>

        <div style={{ padding: "20px" }}>
          {view === "chart" && result.rows?.length > 0 && (
            <div style={{ height: "240px" }}>
              {result.chartType === "bar" && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.rows} margin={{ top: 4, right: 4, left: -24, bottom: 4 }}>
                    <XAxis dataKey={cols[0]} tick={{ fontSize: 11, fill: "var(--text-3)" }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--text-3)" }} tickLine={false} axisLine={false} />
                    <Tooltip content={<TT />} />
                    {cols.slice(1).map((k, i) => <Bar key={k} dataKey={k} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} maxBarSize={52} />)}
                  </BarChart>
                </ResponsiveContainer>
              )}
              {result.chartType === "line" && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={result.rows} margin={{ top: 4, right: 4, left: -24, bottom: 4 }}>
                    <XAxis dataKey={cols[0]} tick={{ fontSize: 11, fill: "var(--text-3)" }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--text-3)" }} tickLine={false} axisLine={false} />
                    <Tooltip content={<TT />} />
                    <Legend wrapperStyle={{ fontSize: 12, color: "var(--text-3)" }} />
                    {cols.slice(1).map((k, i) => <Line key={k} type="monotone" dataKey={k} stroke={COLORS[i % COLORS.length]} strokeWidth={2} dot={false} />)}
                  </LineChart>
                </ResponsiveContainer>
              )}
              {result.chartType === "pie" && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={result.rows} dataKey={cols[1]} nameKey={cols[0]} cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                      {result.rows.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip content={<TT />} />
                  </PieChart>
                </ResponsiveContainer>
              )}
              {result.chartType === "table" && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-3)", fontSize: "14px" }}>
                  Switch to Table view for this data
                </div>
              )}
            </div>
          )}

          {view === "table" && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr>
                    {cols.map(c => (
                      <th key={c} style={{ textAlign: "left", padding: "8px 12px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", color: "var(--text-3)", borderBottom: "1px solid var(--border)" }}>
                        {c.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.slice(0, 50).map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      {cols.map(c => (
                        <td key={c} style={{ padding: "10px 12px", color: "var(--text-2)" }}>
                          {typeof row[c] === "number" ? row[c].toLocaleString() : String(row[c] ?? "—")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {result.rows.length > 50 && (
                <p style={{ textAlign: "center", padding: "12px", fontSize: "12px", color: "var(--text-3)" }}>
                  Showing 50 of {result.rows.length} rows
                </p>
              )}
            </div>
          )}

          {view === "sql" && (
            <div>
              <pre style={{ background: "var(--bg)", borderRadius: "10px", padding: "16px 20px", fontSize: "13px", color: "#A5B4FC", overflowX: "auto", lineHeight: 1.7, fontFamily: "'Fira Code', monospace", border: "1px solid var(--border)" }}>
                {result.generatedSQL}
              </pre>
              <button className="qm-btn-ghost" onClick={copySQL} style={{ marginTop: "10px", padding: "7px 14px", fontSize: "12px" }}>
                {copied ? "✓ Copied!" : "Copy SQL"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}