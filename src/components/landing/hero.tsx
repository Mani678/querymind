import Link from "next/link"

export default function Hero() {
  return (
    <section style={{ paddingTop: "140px", paddingBottom: "100px", textAlign: "center", padding: "140px 24px 100px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", marginBottom: "32px", border: "1px solid oklch(0.55 0.16 264 / 0.3)", background: "oklch(0.55 0.16 264 / 0.08)", fontSize: "13px", color: "oklch(0.75 0.12 264)" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "oklch(0.65 0.15 145)", display: "inline-block" }} />
          Built on Aurora DSQL · Vercel · Groq AI
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--foreground)", marginBottom: "24px" }}>
          Your AI{" "}
          <span style={{ color: "var(--primary)" }}>Business Analyst</span>
        </h1>

        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 48px" }}>
          Ask questions about your company data in plain English. Get insights, root causes, and recommended actions in seconds.
        </p>

        {/* Mock query */}
        <div style={{ maxWidth: "620px", margin: "0 auto 48px", background: "var(--card)", border: "1px solid oklch(0.55 0.16 264 / 0.4)", borderRadius: "16px", boxShadow: "0 0 40px oklch(0.55 0.16 264 / 0.1)", overflow: "hidden", textAlign: "left" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
            <p style={{ fontSize: "15px", color: "var(--muted-foreground)" }}>Which customers are most likely to churn?</p>
          </div>
          <div style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ padding: "14px", borderRadius: "12px", background: "oklch(0.55 0.16 264 / 0.08)", border: "1px solid oklch(0.55 0.16 264 / 0.2)" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "oklch(0.75 0.12 264)", marginBottom: "6px", letterSpacing: "0.05em" }}>WHAT HAPPENED</div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--foreground)" }}>$14,200</div>
              <div style={{ fontSize: "13px", color: "var(--muted-foreground)", marginTop: "2px" }}>MRR at risk · 8 customers</div>
            </div>
            <div style={{ padding: "14px", borderRadius: "12px", background: "oklch(0.75 0.15 60 / 0.08)", border: "1px solid oklch(0.75 0.15 60 / 0.2)" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "oklch(0.85 0.12 60)", marginBottom: "6px", letterSpacing: "0.05em" }}>WHY IT HAPPENED</div>
              <div style={{ fontSize: "14px", color: "var(--foreground)", lineHeight: 1.5 }}>No activity in 45 days. 83% on free plan.</div>
            </div>
            <div style={{ padding: "14px", borderRadius: "12px", background: "oklch(0.65 0.15 145 / 0.08)", border: "1px solid oklch(0.65 0.15 145 / 0.2)", gridColumn: "1 / -1" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "oklch(0.75 0.12 145)", marginBottom: "6px", letterSpacing: "0.05em" }}>WHAT TO DO</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                <div style={{ fontSize: "14px", color: "var(--foreground)" }}>Launch Pro re-engagement campaign</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "oklch(0.65 0.15 145)" }}>↑ $8k–$11k recovery</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/dashboard" style={{ padding: "14px 28px", borderRadius: "10px", background: "var(--primary)", color: "var(--primary-foreground)", fontWeight: 500, fontSize: "15px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Try the demo — it's free →
          </Link>
          <a href="mailto:demo@querymind.ai" style={{ padding: "14px 28px", borderRadius: "10px", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "15px", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
            Book a Demo
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap", marginTop: "64px" }}>
          {[
            { stat: "< 2s", label: "Average response" },
            { stat: "3-layer", label: "AI analysis" },
            { stat: "Aurora DSQL", label: "Production DB" },
          ].map(({ stat, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--primary)" }}>{stat}</div>
              <div style={{ fontSize: "13px", color: "var(--muted-foreground)", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}