"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const NAV = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "https://github.com/Mani678/querymind", external: true },
  { label: "Blog", href: "https://dev.to/search?q=querymind", external: true },
]

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
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "16px", color: "var(--primary-foreground)" }}>Q</div>
            <span style={{ fontWeight: 600, fontSize: "15px", color: "var(--foreground)" }}>QueryMind</span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden-mobile">
            {NAV.map(({ label, href, external }) => (
              <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
                style={{ fontSize: "14px", color: "var(--muted-foreground)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseOver={e => (e.currentTarget.style.color = "var(--foreground)")}
                onMouseOut={e => (e.currentTarget.style.color = "var(--muted-foreground)")}>
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="hidden-mobile">
            <Link href="/dashboard" style={{ fontSize: "14px", color: "var(--muted-foreground)", textDecoration: "none", padding: "8px 16px" }}>
              Sign in
            </Link>
            <Link href="/dashboard" style={{ fontSize: "14px", fontWeight: 500, color: "var(--primary-foreground)", background: "var(--primary)", padding: "9px 20px", borderRadius: "8px", textDecoration: "none" }}>
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
            {NAV.map(({ label, href, external }) => (
              <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
                onClick={() => setIsOpen(false)}
                style={{ display: "block", fontSize: "14px", color: "var(--muted-foreground)", textDecoration: "none", padding: "10px 0" }}>
                {label}
              </a>
            ))}
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              <Link href="/dashboard" onClick={() => setIsOpen(false)} style={{ flex: 1, textAlign: "center", fontSize: "14px", color: "var(--foreground)", border: "1px solid var(--border)", padding: "10px", borderRadius: "8px", textDecoration: "none" }}>
                Sign in
              </Link>
              <Link href="/dashboard" onClick={() => setIsOpen(false)} style={{ flex: 1, textAlign: "center", fontSize: "14px", fontWeight: 500, color: "var(--primary-foreground)", background: "var(--primary)", padding: "10px", borderRadius: "8px", textDecoration: "none" }}>
                Get Started
              </Link>
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