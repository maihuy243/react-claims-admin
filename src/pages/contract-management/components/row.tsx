import { memo } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StatusBadge } from "@/components/status-badge"
import { PROCESSING_OFFICER } from "constant"
import { HDItem } from "@/model"

interface RowProps {
  item: HDItem
  onUpdateOfficer?: (id: string, officer: string) => void
}

const ContractRow = memo(({ item, onUpdateOfficer }: RowProps) => {
  return (
    <tr className="border-b text-nowrap odd:bg-white even:bg-gray-100 hover:bg-gray-200">
      <td className="px-3 py-2 text-orange-600 font-semibold">{item.id}</td>

      <td className="px-3 py-2">{item.ma_dvi}</td>

      <td className="px-3 py-2 font-medium text-blue-700">
        {item.so_hop_dong}
      </td>

      <td className="px-3 py-2">{item.chu_hop_dong}</td>

      <td className="px-3 py-2">{item.ngay_hieu_luc}</td>

      <td className="px-3 py-2">{item.ngay_het_han}</td>

      {/* CB xử lý */}
      <td className="px-3 py-2">
        <Select
          defaultValue={item.can_bo_xu_ly}
          value={item.can_bo_xu_ly}
          onValueChange={(val) => onUpdateOfficer?.(item.id, val)}
        >
          <SelectTrigger className="h-8 text-sm w-[150px]">
            <SelectValue placeholder="Chọn cán bộ" />
          </SelectTrigger>

          <SelectContent>
            {PROCESSING_OFFICER.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </td>

      <td className="px-3 py-2">
        <StatusBadge status={item.trang_thai} />
      </td>
    </tr>
  )
})

// So sánh props
export default memo(ContractRow, (prev, next) => {
  return (
    prev.item === next.item && prev.onUpdateOfficer === next.onUpdateOfficer
  )
})
