import Link from "next/link"
import { Check } from "lucide-react"

export default function CTA() {
  return (
    <section style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "center" }}>
          {/* Left */}
          <div>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--foreground)", marginBottom: "20px" }}>
              Ready to transform your analytics?
            </h2>
            <p style={{ fontSize: "16px", color: "var(--muted-foreground)", marginBottom: "32px", lineHeight: 1.6 }}>
              Join teams using QueryMind to make better decisions with data.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {["Real-time data insights", "No technical setup required", "Production AWS infrastructure", "Enterprise-grade security"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Check size={16} style={{ color: "var(--primary)", flexShrink: 0 }} />
                  <span style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/dashboard" style={{ padding: "12px 24px", borderRadius: "10px", background: "var(--primary)", color: "var(--primary-foreground)", fontWeight: 500, fontSize: "14px", textDecoration: "none" }}>
                Start Free Trial →
              </Link>
              <a href="mailto:demo@querymind.ai" style={{ padding: "12px 24px", borderRadius: "10px", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "14px", textDecoration: "none" }}>
                Schedule Demo
              </a>
            </div>
          </div>

          {/* Right - Pricing */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { tier: "Free", price: "$0", desc: "50 queries/month · 1 data source", highlight: false },
              { tier: "Pro", price: "$49", desc: "Unlimited queries · 5 data sources · Dashboards", highlight: true },
              { tier: "Enterprise", price: "Custom", desc: "Unlimited everything · SSO · SLA", highlight: false },
            ].map(({ tier, price, desc, highlight }) => (
              <div key={tier} style={{ padding: "20px 24px", borderRadius: "14px", border: highlight ? "1px solid oklch(0.55 0.16 264 / 0.5)" : "1px solid var(--border)", background: highlight ? "oklch(0.55 0.16 264 / 0.06)" : "var(--card)", position: "relative" }}>
                {highlight && (
                  <div style={{ position: "absolute", top: "-11px", left: "20px", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "100px", background: "var(--primary)", color: "var(--primary-foreground)" }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>{tier}</span>
                  <span style={{ fontSize: "22px", fontWeight: 700, color: "var(--foreground)" }}>{price}</span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}