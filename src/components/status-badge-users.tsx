import clsx from "clsx"

export const StatusBadgeUsers = ({ status }: { status: string }) => {
  const color =
    {
      "Đang hoạt động": "bg-[#DCFFF1] text-[#22A06B]",
      "Hoạt động": "bg-[#DCFFF1] text-[#22A06B]",
      "Đang khóa": "bg-[#DCFFF1] text-[#E3066A]",
    }[status] || "bg-gray-100 text-gray-700"

  return (
    <span
      className={clsx(
        "whitespace-nowrap rounded-md px-3 py-1 text-[12px] font-medium",
        color,
      )}
    >
      {status}
    </span>
  )
}
