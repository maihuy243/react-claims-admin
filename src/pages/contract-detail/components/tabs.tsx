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
    <div className="flex gap-6 text-sm overflow-x-auto py-2">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={cn(
            "pb-1 whitespace-nowrap",
            active === t.key
              ? "font-semibold text-gray-900 border-b-2 border-orange-500"
              : "text-gray-500 hover:text-gray-700",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
