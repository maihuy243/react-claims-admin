import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputToolTip = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <input
              ref={ref}
              type={type}
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                "overflow-hidden truncate whitespace-nowrap",
                "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
                "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:bg-[#eaebec] disabled:opacity-70",
                className,
              )}
              {...props}
            />
          </TooltipTrigger>
          {props.value && (
            <TooltipContent>
              <p>{props.value}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    )
  },
)

export { InputToolTip }
