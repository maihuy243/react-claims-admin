import { useEffect } from "react"
import { cn } from "@/lib/utils"

export function CustomFloatingPanel({ open, onClose, className = "", children }: any) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const panel = document.getElementById("floating-panel")
      if (open && panel && !panel.contains(e.target as Node)) {
        onClose?.()
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  if (!open) return null

  return (
    <div
      id="floating-panel"
      className={cn(
        "absolute right-6 top-16 w-[360px] rounded-2xl border bg-white shadow-xl p-0 z-[9999] animate-in fade-in slide-in-from-top-2",
        className
      )}
    >
      {children}
    </div>
  )
}
