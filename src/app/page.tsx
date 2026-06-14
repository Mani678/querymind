import Link from "next/link"

export default function HomePage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>

      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: "60px",
        background: "rgba(8,9,13,0.85)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "30px", height: "30px", borderRadius: "8px",
            background: "var(--primary)", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "14px", fontWeight: 700, color: "white"
          }}>Q</div>
          <span style={{ fontWeight: 600, fontSize: "15px", color: "var(--text-1)" }}>QueryMind</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/sign-in" style={{ fontSize: "14px", color: "var(--text-2)", textDecoration: "none", padding: "8px 14px" }}>Sign in</Link>
          <Link href="/dashboard" className="qm-btn-primary" style={{ padding: "9px 18px", textDecoration: "none", fontSize: "14px" }}>Get started free</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "100px 32px 80px", textAlign: "center" }}>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "100px", marginBottom: "32px",
          border: "1px solid rgba(109,93,252,0.3)",
          background: "rgba(109,93,252,0.08)",
          fontSize: "13px", color: "#A5B4FC"
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--success)", display: "inline-block" }} />
          Built on Aurora DSQL · Vercel · Claude AI
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(40px, 6vw, 72px)",
          fontWeight: 700, lineHeight: 1.1,
          letterSpacing: "-0.03em",
          color: "var(--text-1)", marginBottom: "24px"
        }}>
          Your AI<br />
          <span style={{ color: "var(--primary)" }}>Business Analyst</span>
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "var(--text-2)", lineHeight: 1.7,
          maxWidth: "560px", margin: "0 auto 48px"
        }}>
          Ask questions about your company data in plain English. Get insights, root causes, and recommended actions in seconds.
        </p>

        {/* Mock query box */}
        <div style={{
          maxWidth: "600px", margin: "0 auto 48px",
          background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          border: "1px solid rgba(109,93,252,0.4)",
          borderRadius: "16px",
          boxShadow: "0 0 40px rgba(109,93,252,0.12)",
          overflow: "hidden", textAlign: "left"
        }}>
          {/* Input row */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontSize: "15px", color: "var(--text-2)" }}>
              What customers are most likely to churn?
            </div>
          </div>

          {/* Response */}
          <div style={{ padding: "20px 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(109,93,252,0.08)", border: "1px solid rgba(109,93,252,0.2)" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#A5B4FC", marginBottom: "6px", letterSpacing: "0.05em" }}>WHAT HAPPENED</div>
                <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-1)" }}>$14,200</div>
                <div style={{ fontSize: "13px", color: "var(--text-2)", marginTop: "2px" }}>MRR at risk · 8 customers</div>
              </div>
              <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#FCD34D", marginBottom: "6px", letterSpacing: "0.05em" }}>WHY IT HAPPENED</div>
                <div style={{ fontSize: "14px", color: "var(--text-1)", lineHeight: 1.5 }}>No activity in 45 days. 83% on free plan.</div>
              </div>
              <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", gridColumn: "1 / -1" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#6EE7B7", marginBottom: "6px", letterSpacing: "0.05em" }}>WHAT TO DO</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ fontSize: "14px", color: "var(--text-1)" }}>Launch Pro re-engagement campaign</div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#10B981" }}>↑ $8k–$11k recovery</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/dashboard" className="qm-btn-primary" style={{ padding: "14px 28px", fontSize: "15px", textDecoration: "none", borderRadius: "12px" }}>
            Start Free →
          </Link>
          <a href="mailto:demo@querymind.ai" className="qm-btn-ghost" style={{ padding: "14px 28px", fontSize: "15px", textDecoration: "none" }}>
            Book a Demo
          </a>
        </div>
      </div>

      {/* Social proof */}
      <div style={{ textAlign: "center", padding: "0 32px 80px" }}>
        <p style={{ fontSize: "13px", color: "var(--text-3)", marginBottom: "32px", letterSpacing: "0.05em" }}>
          TRUSTED BY MODERN SAAS AND COMMERCE TEAMS
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap" }}>
          {["Acme Corp", "Stripe Co.", "Vercel Inc.", "Linear Ltd.", "Notion HQ"].map(name => (
            <span key={name} style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-3)" }}>{name}</span>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 32px 120px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {[
            { icon: "💬", title: "Ask", color: "var(--primary)", desc: "Type any business question in plain English. No SQL. No analyst. No waiting.", label: "Natural language queries" },
            { icon: "🔍", title: "Understand", color: "var(--warning)", desc: "AI diagnoses root causes by analyzing patterns across your data automatically.", label: "AI root cause analysis" },
            { icon: "⚡", title: "Act", color: "var(--success)", desc: "Get concrete recommendations with estimated revenue impact. Share with your team instantly.", label: "Revenue-focused actions" },
          ].map(({ icon, title, color, desc, label }) => (
            <div key={title} className="qm-card" style={{ padding: "32px" }}>
              <div style={{ fontSize: "32px", marginBottom: "20px" }}>{icon}</div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color, marginBottom: "8px" }}>{label.toUpperCase()}</div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-1)", marginBottom: "12px" }}>{title}</div>
              <div style={{ fontSize: "15px", color: "var(--text-2)", lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
