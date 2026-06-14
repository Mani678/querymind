"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: "⊞" },
  { href: "/dashboard/history", label: "History", icon: "◷" },
  { href: "/dashboard/sources", label: "Data Sources", icon: "⬡" },
  { href: "/dashboard/saved", label: "Saved", icon: "◈" },
  { href: "/dashboard/billing", label: "Billing", icon: "◎" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--bg)" }}>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: "240px",
        flexShrink: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg2)",
        borderRight: "1px solid var(--border)",
        position: "fixed",
        left: mobileOpen ? 0 : undefined,
        zIndex: 50,
        transition: "transform 0.2s ease",
        ...(typeof window !== "undefined" && window.innerWidth < 768 ? {
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        } : {}),
      }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "10px",
              background: "var(--primary)", display: "flex", alignItems: "center",
              justifyContent: "center", fontWeight: 700, fontSize: "15px", color: "white", flexShrink: 0
            }}>Q</div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-1)" }}>QueryMind</div>
              <div style={{ fontSize: "11px", color: "var(--text-3)" }}>AI Business Analyst</div>
            </div>
          </div>

          {/* Org badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "8px 12px", borderRadius: "10px",
            background: "rgba(109,93,252,0.08)", border: "1px solid rgba(109,93,252,0.2)"
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--success)", flexShrink: 0, display: "inline-block" }} />
            <span style={{ fontSize: "12px", color: "#A5B4FC", fontWeight: 500 }}>Acme Corp · Demo</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 12px", display: "flex", flexDirection: "column", gap: "2px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.08em", padding: "8px 8px 4px" }}>MENU</div>
          {NAV.map(({ href, label, icon }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 12px", borderRadius: "10px", textDecoration: "none",
                fontSize: "14px", fontWeight: active ? 500 : 400,
                color: active ? "var(--text-1)" : "var(--text-2)",
                background: active ? "rgba(109,93,252,0.12)" : "transparent",
                border: active ? "1px solid rgba(109,93,252,0.2)" : "1px solid transparent",
                transition: "all 0.15s ease",
              }}>
                <span style={{ fontSize: "16px", opacity: active ? 1 : 0.6 }}>{icon}</span>
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Plan */}
        <div style={{ padding: "16px", borderTop: "1px solid var(--border)" }}>
          <div style={{ padding: "14px", borderRadius: "12px", background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-1)" }}>Free Plan</span>
              <span style={{ fontSize: "12px", color: "var(--text-3)" }}>10/50 queries</span>
            </div>
            <div style={{ height: "3px", borderRadius: "100px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <div style={{ width: "20%", height: "100%", borderRadius: "100px", background: "var(--primary)" }} />
            </div>
            <button className="qm-btn-primary" style={{ width: "100%", justifyContent: "center", padding: "9px", marginTop: "12px", fontSize: "13px" }}>
              Upgrade to Pro
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

        {/* Mobile topbar */}
        <div style={{
          display: "none",
          alignItems: "center", gap: "12px",
          padding: "0 16px", height: "56px",
          background: "var(--bg2)", borderBottom: "1px solid var(--border)",
        }} className="mobile-topbar">
          <button onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", color: "var(--text-2)", cursor: "pointer", fontSize: "20px" }}>☰</button>
          <span style={{ fontWeight: 600, fontSize: "15px", color: "var(--text-1)" }}>QueryMind</span>
        </div>

        <main style={{ flex: 1, overflowY: "auto" }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          aside { transform: translateX(-100%) !important; position: fixed !important; }
          aside.open { transform: translateX(0) !important; }
          .mobile-topbar { display: flex !important; }
          div[style*="marginLeft: 240px"] { margin-left: 0 !important; width: 100% !important; }
        }
      `}</style>
    </div>
  )
}
