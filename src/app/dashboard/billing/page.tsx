export default function BillingPage() {
  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "40px 28px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: "6px" }}>
        Billing
      </h1>
      <p style={{ fontSize: "14px", color: "var(--text-3)", marginBottom: "36px" }}>
        Manage your plan and usage
      </p>

      {/* Current plan */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "var(--text-3)", marginBottom: "12px" }}>CURRENT PLAN</p>
        <div className="qm-card" style={{ padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-1)", marginBottom: "4px" }}>Free Plan</div>
            <div style={{ fontSize: "14px", color: "var(--text-3)" }}>10 of 50 queries used this month</div>
            <div style={{ marginTop: "12px", width: "200px", height: "4px", borderRadius: "100px", background: "rgba(255,255,255,0.08)" }}>
              <div style={{ width: "20%", height: "100%", borderRadius: "100px", background: "var(--primary)" }} />
            </div>
          </div>
          <button className="qm-btn-primary" style={{ padding: "12px 24px", fontSize: "14px" }}>
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* Pricing cards */}
      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "var(--text-3)", marginBottom: "12px" }}>PLANS</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
        {[
          {
            name: "Free", price: "$0", period: "/month",
            features: ["50 queries/month", "1 data source", "7-day history", "Community support"],
            cta: "Current plan", active: true, highlight: false,
          },
          {
            name: "Pro", price: "$49", period: "/month",
            features: ["Unlimited queries", "5 data sources", "Unlimited history", "Shareable dashboards", "Priority support"],
            cta: "Upgrade to Pro", active: false, highlight: true,
          },
          {
            name: "Enterprise", price: "Custom", period: "",
            features: ["Unlimited everything", "SSO & SAML", "Custom connectors", "SLA guarantee", "Dedicated support"],
            cta: "Contact Sales", active: false, highlight: false,
          },
        ].map(({ name, price, period, features, cta, active, highlight }) => (
          <div key={name} className="qm-card" style={{
            padding: "24px",
            border: highlight ? "1px solid rgba(109,93,252,0.5)" : "1px solid var(--border)",
            background: highlight ? "linear-gradient(180deg, rgba(109,93,252,0.08), rgba(109,93,252,0.03))" : undefined,
            position: "relative",
          }}>
            {highlight && (
              <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "100px", background: "var(--primary)", color: "white" }}>
                MOST POPULAR
              </div>
            )}
            <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-1)", marginBottom: "8px" }}>{name}</div>
            <div style={{ marginBottom: "20px" }}>
              <span style={{ fontSize: "32px", fontWeight: 700, color: "var(--text-1)" }}>{price}</span>
              <span style={{ fontSize: "14px", color: "var(--text-3)" }}>{period}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
              {features.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-2)" }}>
                  <span style={{ color: "var(--success)", fontSize: "12px" }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
            <button
              className={highlight ? "qm-btn-primary" : "qm-btn-ghost"}
              style={{ width: "100%", justifyContent: "center", padding: "10px", fontSize: "14px" }}
              disabled={active}>
              {cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}