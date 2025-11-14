import { FileSearch } from "lucide-react"

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <FileSearch className="w-14 h-14 mb-3 text-gray-400" />
      <p className="text-sm">{label}</p>
    </div>
  )
}
