"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header style={{
      position: "fixed", top: 0, width: "100%", zIndex: 50,
      background: "oklch(0.11 0.005 0 / 0.95)",
      backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "64px" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "16px", color: "var(--primary-foreground)" }}>Q</div>
            <span style={{ fontWeight: 600, fontSize: "15px", color: "var(--foreground)" }}>QueryMind</span>
          </div>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden-mobile">
            {["Features", "Pricing", "Docs", "Blog"].map(item => (
              <a key={item} href="#" style={{ fontSize: "14px", color: "var(--muted-foreground)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseOver={e => (e.currentTarget.style.color = "var(--foreground)")}
                onMouseOut={e => (e.currentTarget.style.color = "var(--muted-foreground)")}>
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="hidden-mobile">
            <Link href="/dashboard" style={{ fontSize: "14px", color: "var(--muted-foreground)", textDecoration: "none", padding: "8px 16px" }}>Sign in</Link>
            <Link href="/dashboard" style={{ fontSize: "14px", fontWeight: 500, color: "var(--primary-foreground)", background: "var(--primary)", padding: "9px 20px", borderRadius: "8px", textDecoration: "none", transition: "opacity 0.15s" }}
              onMouseOver={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseOut={e => (e.currentTarget.style.opacity = "1")}>
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} style={{ background: "none", border: "none", color: "var(--foreground)", cursor: "pointer" }} className="show-mobile">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div style={{ padding: "16px 0", borderTop: "1px solid var(--border)" }}>
            {["Features", "Pricing", "Docs", "Blog"].map(item => (
              <a key={item} href="#" style={{ display: "block", fontSize: "14px", color: "var(--muted-foreground)", textDecoration: "none", padding: "10px 0" }}>{item}</a>
            ))}
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              <Link href="/dashboard" style={{ flex: 1, textAlign: "center", fontSize: "14px", color: "var(--foreground)", border: "1px solid var(--border)", padding: "10px", borderRadius: "8px", textDecoration: "none" }}>Sign in</Link>
              <Link href="/dashboard" style={{ flex: 1, textAlign: "center", fontSize: "14px", fontWeight: 500, color: "var(--primary-foreground)", background: "var(--primary)", padding: "10px", borderRadius: "8px", textDecoration: "none" }}>Get Started</Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  )
}