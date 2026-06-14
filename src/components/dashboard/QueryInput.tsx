"use client"
import { useState, useRef, useEffect } from "react"

interface Props {
  onSubmit: (q: string) => void
  loading: boolean
}

export default function QueryInput({ onSubmit, loading }: Props) {
  const [value, setValue] = useState("")
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const ta = ref.current
    if (!ta) return
    ta.style.height = "auto"
    ta.style.height = Math.min(ta.scrollHeight, 180) + "px"
  }, [value])

  function submit() {
    const q = value.trim()
    if (!q || loading) return
    onSubmit(q)
    setValue("")
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit() }
  }

  return (
    <div className="qm-input-wrap">
      <div style={{ padding: "18px 20px 14px" }}>
        <textarea
          ref={ref}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onKey}
          disabled={loading}
          placeholder="Ask anything about your business..."
          rows={2}
          style={{
            width: "100%", background: "transparent", border: "none", outline: "none",
            resize: "none", fontFamily: "inherit", fontSize: "16px",
            color: "var(--text-1)", lineHeight: 1.6,
            minHeight: "52px", maxHeight: "180px",
          }}
        />
      </div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 20px 14px", borderTop: "1px solid var(--border)"
      }}>
        <span style={{ fontSize: "12px", color: "var(--text-3)" }}>
          Enter to run · Shift+Enter for new line · <kbd style={{
            padding: "2px 6px", borderRadius: "4px", fontSize: "11px",
            background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)", color: "var(--text-3)"
          }}>⌘K</kbd>
        </span>
        <button
          className="qm-btn-primary"
          onClick={submit}
          disabled={(!value || !value.trim() || loading) ? true : false}
          style={{ padding: "9px 20px", fontSize: "14px" }}
        >
          {loading ? (
            <><span className="dot" style={{ width: "4px", height: "4px" }} />
              <span className="dot" style={{ width: "4px", height: "4px" }} />
              <span className="dot" style={{ width: "4px", height: "4px" }} /></>
          ) : (
            <><span>⚡</span> Run Query</>
          )}
        </button>
      </div>
    </div>
  )
}
