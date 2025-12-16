import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const STATUS_MAP: Record<string, { bg: string; text: string }> = {
  "Đã tiếp nhận": {
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  "Đang trình": {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
  "Bổ sung chứng từ": {
    bg: "bg-red-100",
    text: "text-red-700",
  },
  "Đang giải quyết": {
    bg: "bg-orange-100",
    text: "text-orange-700",
  },
  "Đã duyệt": {
    bg: "bg-green-100",
    text: "text-green-700",
  },
  "Đã thanh toán": {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
  "Từ chối": {
    bg: "bg-gray-200",
    text: "text-gray-800",
  },
  "Hoạt động": {
    bg: "bg-[#DCFFF1]",
    text: "text-[#22A06B]",
  },

  // 🔥 thêm mới
  "Hoàn tất": {
    bg: "bg-green-50",
    text: "text-green-800",
  },
  "Huỷ": {
    bg: "bg-red-50",
    text: "text-red-800",
  },
}


export function StatusBadge({
  status,
  className,
}: {
  status: string
  className?: string
}) {
  const color = STATUS_MAP[status] ?? {
    bg: "bg-gray-100",
    text: "text-gray-700",
  }

  return (
    <Badge
      className={cn(
        "select-none rounded-md px-2.5 py-0.5 text-[11px] font-medium",
        color.bg,
        color.text,
        className,
      )}
    >
      {status}
    </Badge>
  )
}
