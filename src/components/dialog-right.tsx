// components/dialog/DialogRight.tsx
import { Dialog, DialogContentNoBlur } from "@/components/ui/dialog"

export function DialogRight({
  open,
  onOpenChange,
  children,
  className = "",
}: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContentNoBlur
        className={`absolute !left-auto !right-6 !top-16 w-[360px] !translate-x-0 !translate-y-0 rounded-2xl border bg-white p-0 shadow-xl ${className} `}
      >
        {children}
      </DialogContentNoBlur>
    </Dialog>
  )
}
