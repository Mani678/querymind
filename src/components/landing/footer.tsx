export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "48px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "32px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "13px", color: "var(--primary-foreground)" }}>Q</div>
              <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--foreground)" }}>QueryMind</span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: 1.6 }}>AI-powered business intelligence for modern teams.</p>
          </div>

          {[
            { title: "Product", links: ["Features", "Pricing", "Security", "Roadmap"] },
            { title: "Resources", links: ["Documentation", "API Reference", "Blog", "Community"] },
            { title: "Company", links: ["About", "Careers", "Contact", "Privacy"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 style={{ fontSize: "13px", fontWeight: 600, color: "var(--foreground)", marginBottom: "16px" }}>{title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {links.map(link => (
                  <a key={link} href="#" style={{ fontSize: "13px", color: "var(--muted-foreground)", textDecoration: "none" }}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>© 2026 QueryMind. All rights reserved.</p>
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>Built for H0: Hack the Zero Stack · Aurora DSQL + Vercel</p>
        </div>
      </div>
    </footer>
  )
}