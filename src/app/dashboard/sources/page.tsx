import Link from "next/link"

export default function SourcesPage() {
  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "40px 28px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em", marginBottom: "6px" }}>
        Data Sources
      </h1>
      <p style={{ fontSize: "14px", color: "var(--muted-foreground)", marginBottom: "36px" }}>
        Connect your databases and files
      </p>

      {/* Connected */}
      <div style={{ marginBottom: "36px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "var(--muted-foreground)", marginBottom: "12px" }}>CONNECTED</p>
        <div className="qm-card" style={{ padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "oklch(0.55 0.16 264 / 0.15)", border: "1px solid oklch(0.55 0.16 264 / 0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
            🗄️
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>Acme Corp Demo Dataset</div>
            <div style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>Built-in · 3 tables · orders, customers, monthly_revenue</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "oklch(0.65 0.15 145)", flexShrink: 0 }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "oklch(0.65 0.15 145)", display: "inline-block" }} />
            Active
          </div>
        </div>
      </div>

      {/* Add sources */}
      <div>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "var(--muted-foreground)", marginBottom: "12px" }}>ADD A DATA SOURCE</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
          {[
            { icon: "🐘", name: "PostgreSQL", desc: "Connect any Postgres database", available: true, href: "/dashboard/sources/connect?type=postgres" },
            { icon: "⚡", name: "Amazon Aurora", desc: "Aurora PostgreSQL or DSQL", available: true, href: "/dashboard/sources/connect?type=aurora" },
            { icon: "📄", name: "CSV Upload", desc: "Upload a CSV to query instantly", available: true, badge: "Popular", href: "/dashboard/sources/upload" },
            { icon: "🐬", name: "MySQL", desc: "Connect a MySQL database", available: true, href: "/dashboard/sources/connect?type=mysql" },
            { icon: "❄️", name: "Snowflake", desc: "Coming soon", available: false, href: "#" },
            { icon: "🔵", name: "BigQuery", desc: "Coming soon", available: false, href: "#" },
          ].map(({ icon, name, desc, available, badge, href }) => (
            <div key={name} className="qm-card" style={{ padding: "20px", opacity: available ? 1 : 0.4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <span style={{ fontSize: "22px" }}>{icon}</span>
                <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>{name}</span>
                {badge && (
                  <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "100px", background: "oklch(0.55 0.16 264 / 0.15)", color: "oklch(0.75 0.12 264)", border: "1px solid oklch(0.55 0.16 264 / 0.25)", fontWeight: 500 }}>{badge}</span>
                )}
              </div>
              <p style={{ fontSize: "13px", color: "var(--muted-foreground)", marginBottom: "16px" }}>{desc}</p>
              {available && (
                <Link href={href} style={{ display: "block", textAlign: "center", padding: "8px 14px", borderRadius: "10px", border: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: "13px", textDecoration: "none", transition: "all 0.15s" }}>
                  Connect →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}