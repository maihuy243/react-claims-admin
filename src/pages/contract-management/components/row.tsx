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
    <tr className="text-nowrap border-b odd:bg-white even:bg-gray-100 hover:bg-gray-200">
      <td className="text-ellipsis px-3 py-2 font-semibold text-[#F79009]">
        {item.id}
      </td>

      <td className="text-ellipsis px-3 py-2">{item.ma_dvi}</td>

      <td className="text-ellipsis px-3 py-2 font-medium">
        {item.so_hop_dong}
      </td>

      <td className="w-fit text-ellipsis px-3 py-2">{item.chu_hop_dong}</td>

      <td className="text-ellipsis px-3 py-2">{item.ngay_hieu_luc}</td>

      <td className="text-ellipsis px-3 py-2">{item.ngay_het_han}</td>

      {/* CB xử lý */}
      <td className="px-3 py-2">
        <Select
          defaultValue={item.can_bo_xu_ly}
          value={item.can_bo_xu_ly}
          onValueChange={(val) => onUpdateOfficer?.(item.so_hop_dong, val)}
        >
          <SelectTrigger className="h-8 w-[200px] text-sm">
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

      <td className="sticky right-0 z-20 bg-inherit px-3 py-2 shadow-[-4px_0_8px_rgba(0,0,0,0.06)]">
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
