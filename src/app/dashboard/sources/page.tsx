export default function SourcesPage() {
  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "40px 28px" }}>

      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: "6px" }}>
        Data Sources
      </h1>
      <p style={{ fontSize: "14px", color: "var(--text-3)", marginBottom: "36px" }}>
        Connect your databases and files
      </p>

      {/* Connected */}
      <div style={{ marginBottom: "36px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "var(--text-3)", marginBottom: "12px" }}>CONNECTED</p>
        <div className="qm-card" style={{ padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(109,93,252,0.15)", border: "1px solid rgba(109,93,252,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
            🗄️
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-1)", marginBottom: "4px" }}>Acme Corp Demo Dataset</div>
            <div style={{ fontSize: "13px", color: "var(--text-3)" }}>Built-in · 3 tables · orders, customers, monthly_revenue</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--success)", flexShrink: 0 }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--success)", display: "inline-block" }} />
            Active
          </div>
        </div>
      </div>

      {/* Add sources */}
      <div>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "var(--text-3)", marginBottom: "12px" }}>ADD A DATA SOURCE</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
          {[
            { icon: "🐘", name: "PostgreSQL", desc: "Connect any Postgres database", available: true },
            { icon: "⚡", name: "Amazon Aurora", desc: "Aurora PostgreSQL or DSQL", available: true },
            { icon: "📄", name: "CSV Upload", desc: "Upload a CSV to query instantly", available: true, badge: "Popular" },
            { icon: "🐬", name: "MySQL", desc: "Connect a MySQL database", available: true },
            { icon: "❄️", name: "Snowflake", desc: "Coming soon", available: false },
            { icon: "🔵", name: "BigQuery", desc: "Coming soon", available: false },
          ].map(({ icon, name, desc, available, badge }) => (
            <div key={name} className="qm-card" style={{ padding: "20px", opacity: available ? 1 : 0.4, cursor: available ? "pointer" : "default" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <span style={{ fontSize: "22px" }}>{icon}</span>
                <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-1)" }}>{name}</span>
                {badge && (
                  <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "100px", background: "rgba(109,93,252,0.15)", color: "#A5B4FC", border: "1px solid rgba(109,93,252,0.25)", fontWeight: 500 }}>{badge}</span>
                )}
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-3)", marginBottom: "16px" }}>{desc}</p>
              {available && (
                <button className="qm-btn-ghost" style={{ padding: "7px 14px", fontSize: "13px", width: "100%", justifyContent: "center" }}>
                  Connect →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}