import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  label: string
  value?: Date
  onChange: (date?: Date) => void
}

const DateSearchField = ({ label, value, onChange }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex w-full min-w-0 items-center gap-2 rounded-md border border-gray-300 px-2 py-1">
      <span className="whitespace-nowrap text-sm font-semibold text-gray-700">
        {label}
      </span>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="
              h-8 w-full justify-start px-2
              text-left font-normal
              shadow-none
              hover:bg-transparent
              focus-visible:ring-0
            "
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            {value ? format(value, "yyyy-MM-dd") : "Chọn ngày"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date)
              setOpen(false) // 🔥 chọn là đóng
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateSearchField
