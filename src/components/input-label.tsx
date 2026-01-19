import { Input } from "./ui/input"

const SearchField = ({
  label,
  value,
  onChange,
  placeholder: p = "Tìm kiếm...",
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) => {
  return (
    <div className="flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1">
      <span className="whitespace-nowrap text-sm font-semibold text-gray-700">
        {label}
      </span>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={p}
        className="h-8 border-0 px-2 shadow-none outline-none ring-0 ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  )
}

export default SearchField
