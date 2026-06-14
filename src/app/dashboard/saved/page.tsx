export default function SavedPage() {
  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "40px 28px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: "6px" }}>
        Saved Queries
      </h1>
      <p style={{ fontSize: "14px", color: "var(--text-3)", marginBottom: "36px" }}>
        Pin your most important queries here
      </p>

      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <div style={{ fontSize: "40px", marginBottom: "16px" }}>◈</div>
        <p style={{ fontSize: "16px", color: "var(--text-2)", marginBottom: "8px" }}>No saved queries yet</p>
        <p style={{ fontSize: "14px", color: "var(--text-3)" }}>Run a query and click Pin to save it here</p>
      </div>
    </div>
  )
}