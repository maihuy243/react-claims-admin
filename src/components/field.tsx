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
    <div className={cn("flex flex-col gap-2", className)}>
      <Label className="flex items-center gap-1 font-medium text-gray-700">
        <span>{label}</span>
        {required && <span className="text-red-500">*</span>}
      </Label>

      <div className={cn("relative", option && "cursor-pointer")}>
        {children}

        {option && (
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        )}
      </div>
    </div>
  )
}
