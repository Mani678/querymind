import Link from "next/link"

export default function SignInPage() {
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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "white", marginBottom: "8px", letterSpacing: "-0.02em" }}>Welcome back</h1>
          <p style={{ fontSize: "14px", color: "#6B6B8A", marginBottom: "32px" }}>Sign in to your account to continue</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "white", display: "block", marginBottom: "6px" }}>Email address</label>
              <input type="email" placeholder="you@company.com" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", background: "#1E1E30", border: "1px solid #2A2A40", color: "white", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "white", display: "block", marginBottom: "6px" }}>Password</label>
              <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", background: "#1E1E30", border: "1px solid #2A2A40", color: "white", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
            </div>
            <Link href="/dashboard" style={{ width: "100%", padding: "13px", borderRadius: "10px", background: "#6366F1", color: "white", fontWeight: 600, fontSize: "14px", textDecoration: "none", textAlign: "center", display: "block", marginTop: "8px" }}>
              Sign in to QueryMind
            </Link>
          </div>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <span style={{ fontSize: "13px", color: "#6B6B8A" }}>Don't have an account? </span>
            <Link href="/sign-up" style={{ fontSize: "13px", color: "#6366F1", textDecoration: "none", fontWeight: 500 }}>Sign up free</Link>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#6B6B8A", marginTop: "24px" }}>
          By signing in you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}