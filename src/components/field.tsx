import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FieldProps {
  label: string
  children: React.ReactNode
  required?: boolean
  className?: string
}

export function Field({ label, children, required, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Label className="text-gray-700 font-medium flex items-center gap-1">
        <span>{label}</span>
        {required && <span className="text-red-500">*</span>}
      </Label>

      {children}
    </div>
  )
}
