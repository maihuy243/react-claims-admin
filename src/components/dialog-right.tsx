// components/dialog/DialogRight.tsx
import { Dialog, DialogContent } from "@/components/ui/dialog"

export function DialogRight({
  open,
  onOpenChange,
  children,
  className = "",
}: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          absolute
          !top-16 
          !right-6 
          !left-auto
          !translate-x-0
          !translate-y-0
          w-[360px]
          rounded-2xl
          p-0
          shadow-xl
          border
          bg-white
          ${className}
        `}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}
