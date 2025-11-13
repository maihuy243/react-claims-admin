import clsx from "clsx"

export const StatusBadgeUsers = ({ status }: { status: string }) => {
  const color =
    {
      "Đang hoạt động": "bg-green-100 text-green-700",
      "Đang khóa": "bg-red-100 text-red-700",
    }[status] || "bg-gray-100 text-gray-700"

  return (
    <span
      className={clsx(
        "px-2 py-1 rounded-md text-[12px] font-medium whitespace-nowrap",
        color,
      )}
    >
      {status}
    </span>
  )
}
