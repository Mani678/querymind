"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function UploadPage() {
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  function handleFile(f: File) {
    if (f.type !== "text/csv" && !f.name.endsWith(".csv")) {
      alert("Please upload a CSV file")
      return
    }
    setFile(f)
  }

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    // Simulate upload for demo
    await new Promise(r => setTimeout(r, 1500))
    setUploading(false)
    alert("CSV uploaded successfully! You can now query it from the dashboard.")
    router.push("/dashboard")
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 28px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em", marginBottom: "6px" }}>Upload CSV</h1>
        <p style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>Upload a CSV file to query it instantly with AI</p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
        onClick={() => document.getElementById("csv-input")?.click()}
        style={{
          border: `2px dashed ${dragging ? "var(--primary)" : file ? "oklch(0.65 0.15 145)" : "var(--border)"}`,
          borderRadius: "16px",
          padding: "60px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: dragging ? "oklch(0.55 0.16 264 / 0.05)" : file ? "oklch(0.65 0.15 145 / 0.05)" : "var(--card)",
          transition: "all 0.15s ease",
          marginBottom: "24px",
        }}>
        <input id="csv-input" type="file" accept=".csv" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
        {file ? (
          <>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>✅</div>
            <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>{file.name}</p>
            <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>{(file.size / 1024).toFixed(1)} KB · Click to change</p>
          </>
        ) : (
          <>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📄</div>
            <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>Drop your CSV here</p>
            <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>or click to browse · Max 10MB</p>
          </>
        )}
      </div>

      {file && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="qm-btn-primary"
          style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "15px", borderRadius: "12px" }}>
          {uploading ? "Uploading..." : "Upload & Start Querying →"}
        </button>
      )}
    </div>
  )
}