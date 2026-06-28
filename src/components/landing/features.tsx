import { Brain, Zap, TrendingUp, Shield, Lock, Layers } from "lucide-react"

const features = [
  { icon: Brain, title: "Natural Language Queries", desc: "Ask questions in plain English. No SQL knowledge required." },
  { icon: Zap, title: "3-Layer AI Analysis", desc: "Get what happened, why it happened, and what to do — automatically." },
  { icon: TrendingUp, title: "Revenue Impact Estimates", desc: "Every insight comes with a concrete revenue recovery estimate." },
  { icon: Shield, title: "Action Plan Generator", desc: "One click generates a prioritized action plan ready to execute." },
  { icon: Lock, title: "Executive Brief", desc: "CEO-ready summaries generated instantly for any insight." },
  { icon: Layers, title: "Aurora DSQL + DynamoDB", desc: "Production-grade AWS infrastructure from day one." },
]

export default function Features() {
  return (
    <section style={{ padding: "80px 24px", background: "oklch(0.13 0.005 0 / 0.5)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--foreground)", marginBottom: "16px" }}>
            Everything you need to succeed
          </h2>
          <p style={{ fontSize: "16px", color: "var(--muted-foreground)", maxWidth: "480px", margin: "0 auto" }}>
            Comprehensive tools designed for data-driven teams
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{ padding: "28px", borderRadius: "16px", border: "1px solid var(--border)", background: "var(--card)" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "oklch(0.55 0.16 264 / 0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <Icon size={22} style={{ color: "var(--primary)" }} />
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)", marginBottom: "8px" }}>{title}</h3>
              <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}