import Link from "next/link"

export default function SignUpPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#08090D", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: "40px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#6366F1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "18px", color: "white" }}>Q</div>
          <span style={{ fontWeight: 600, fontSize: "18px", color: "white" }}>QueryMind</span>
        </div>

        {/* Card */}
        <div style={{ background: "#13131F", border: "1px solid #1E1E30", borderRadius: "20px", padding: "40px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "white", marginBottom: "8px", letterSpacing: "-0.02em" }}>Create your account</h1>
          <p style={{ fontSize: "14px", color: "#6B6B8A", marginBottom: "32px" }}>Start querying your data in minutes. Free forever.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 500, color: "white", display: "block", marginBottom: "6px" }}>First name</label>
                <input type="text" placeholder="John" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", background: "#1E1E30", border: "1px solid #2A2A40", color: "white", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 500, color: "white", display: "block", marginBottom: "6px" }}>Last name</label>
                <input type="text" placeholder="Doe" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", background: "#1E1E30", border: "1px solid #2A2A40", color: "white", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "white", display: "block", marginBottom: "6px" }}>Work email</label>
              <input type="email" placeholder="you@company.com" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", background: "#1E1E30", border: "1px solid #2A2A40", color: "white", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "white", display: "block", marginBottom: "6px" }}>Password</label>
              <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", background: "#1E1E30", border: "1px solid #2A2A40", color: "white", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
            </div>
            <Link href="/dashboard" style={{ width: "100%", padding: "13px", borderRadius: "10px", background: "#6366F1", color: "white", fontWeight: 600, fontSize: "14px", textDecoration: "none", textAlign: "center", display: "block", marginTop: "8px" }}>
              Create free account
            </Link>
          </div>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <span style={{ fontSize: "13px", color: "#6B6B8A" }}>Already have an account? </span>
            <Link href="/sign-in" style={{ fontSize: "13px", color: "#6366F1", textDecoration: "none", fontWeight: 500 }}>Sign in</Link>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#6B6B8A", marginTop: "24px" }}>
          By creating an account you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}