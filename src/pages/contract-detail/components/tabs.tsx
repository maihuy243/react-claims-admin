import { cn } from "@/lib/utils"

interface TabsHeaderProps {
  active: string
  onChange: (k: string) => void
}

const tabs = [
  { key: "info", label: "Thông tin bồi thường" },
  { key: "account", label: "Tài khoản ứng dụng" },
  { key: "contact", label: "Liên hệ" },
  { key: "contract", label: "Hợp đồng" },
  { key: "history", label: "Lịch sử" },
]

export function TabsHeader({ active, onChange }: TabsHeaderProps) {
  return (
    <div className="flex gap-6 overflow-x-auto py-4 md:py-2 text-sm">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={cn(
            "whitespace-nowrap pb-1",
            active === t.key
              ? "border-b-2 border-orange-500 font-semibold text-gray-900"
              : "text-gray-500 hover:text-gray-700",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
