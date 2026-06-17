import Link from "next/link"

export default function SignUpPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "40px 32px", borderRadius: "20px", background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", justifyContent: "center" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white" }}>Q</div>
          <span style={{ fontWeight: 600, fontSize: "16px", color: "var(--text-1)" }}>QueryMind</span>
        </div>

        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-1)", marginBottom: "8px", textAlign: "center" }}>Create your account</h1>
        <p style={{ fontSize: "14px", color: "var(--text-3)", marginBottom: "28px", textAlign: "center" }}>Start querying your data in minutes</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input placeholder="Full name" type="text" style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text-1)", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
          <input placeholder="Work email" type="email" style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text-1)", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
          <input placeholder="Password" type="password" style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text-1)", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
          <Link href="/dashboard" style={{ width: "100%", padding: "13px", borderRadius: "12px", background: "var(--primary)", color: "white", fontFamily: "inherit", fontSize: "14px", fontWeight: 600, cursor: "pointer", border: "none", textAlign: "center", textDecoration: "none", display: "block", marginTop: "4px" }}>
            Create account
          </Link>
        </div>

        <p style={{ textAlign: "center", fontSize: "13px", color: "var(--text-3)", marginTop: "20px" }}>
          Already have an account?{" "}
          <Link href="/sign-in" style={{ color: "var(--primary)", textDecoration: "none" }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}