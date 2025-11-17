import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface FieldProps {
  label: string
  children: React.ReactNode
  required?: boolean
  className?: string
  option?: boolean
}

export function Field({
  label,
  children,
  required,
  className,
  option,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Label className="text-gray-700 font-medium flex items-center gap-1">
        <span>{label}</span>
        {required && <span className="text-red-500">*</span>}
      </Label>

      <div className={cn("relative", option && "cursor-pointer")}>
        {children}

        {option && (
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
        )}
      </div>
    </div>
  )
}
