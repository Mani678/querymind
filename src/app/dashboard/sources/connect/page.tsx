"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"

function ConnectForm() {
  const params = useSearchParams()
  const type = params.get("type") || "postgres"
  const router = useRouter()

  const labels: Record<string, { name: string; icon: string; placeholder: string }> = {
    postgres: { name: "PostgreSQL", icon: "🐘", placeholder: "postgresql://user:password@host:5432/dbname" },
    aurora: { name: "Amazon Aurora", icon: "⚡", placeholder: "postgresql://admin:token@cluster.dsql.us-east-1.on.aws:5432/postgres" },
    mysql: { name: "MySQL", icon: "🐬", placeholder: "mysql://user:password@host:3306/dbname" },
  }

  const config = labels[type] || labels.postgres

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 28px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em", marginBottom: "6px" }}>
          {config.icon} Connect {config.name}
        </h1>
        <p style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>Enter your connection details below</p>
      </div>

      <div className="qm-card" style={{ padding: "28px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: 500, color: "var(--foreground)", display: "block", marginBottom: "6px" }}>Connection Name</label>
            <input type="text" placeholder="e.g. Production Database" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", background: "var(--input)", border: "1px solid var(--border)", color: "var(--foreground)", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
          </div>
          <div>
            <label style={{ fontSize: "13px", fontWeight: 500, color: "var(--foreground)", display: "block", marginBottom: "6px" }}>Connection URL</label>
            <input type="text" placeholder={config.placeholder} style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", background: "var(--input)", border: "1px solid var(--border)", color: "var(--foreground)", fontFamily: "monospace", fontSize: "14px", outline: "none" }} />
            <p style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "6px" }}>Your connection string is encrypted at rest</p>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <button
              onClick={() => router.push("/dashboard/sources")}
              className="qm-btn-ghost"
              style={{ flex: 1, justifyContent: "center", padding: "12px" }}>
              Cancel
            </button>
            <button
              onClick={() => { alert("Connection saved! Feature coming soon."); router.push("/dashboard/sources") }}
              className="qm-btn-primary"
              style={{ flex: 1, justifyContent: "center", padding: "12px", fontSize: "14px" }}>
              Test & Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConnectPage() {
  return (
    <Suspense fallback={<div style={{ padding: "40px", color: "var(--muted-foreground)" }}>Loading...</div>}>
      <ConnectForm />
    </Suspense>
  )
}