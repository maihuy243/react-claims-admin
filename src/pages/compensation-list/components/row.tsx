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
import { HoSoBoiThuong } from "@/model"
import { Link } from "react-router-dom"

interface RowProps {
  item: HoSoBoiThuong
  onUpdateOfficer?: (id: string, officer: string) => void
}

const ContractRow = memo(({ item, onUpdateOfficer }: RowProps) => {
  return (
    <tr className="text-nowrap border-b odd:bg-white even:bg-gray-100 hover:bg-gray-200">
      <td className="px-3 py-2 font-semibold text-[#F79009]">
        <Link to={`/contract-detail/${item.id}`} className="hover:underline">
          {item.id}
        </Link>
      </td>
      <td className="px-3 py-2">{item.ngay_tao || "-"}</td>
      <td className="px-3 py-2">{item.ma_dvi || "-"}</td>
      <td className="px-3 py-2">{item.cccd_nguoi_tao || "-"}</td>
      <td className="px-3 py-2">{item.ten_nguoi_tao || "-"}</td>
      <td className="px-3 py-2">{item.ma_khach_hang || "-"}</td>
      <td className="px-3 py-2 font-medium">{item.ho_va_ten || "-"}</td>
      <td className="px-3 py-2">{item.so_giay_to || "-"}</td>
      <td className="px-3 py-2">{item.so_hop_dong || "-"}</td>
      <td className="px-3 py-2">{item.su_kien}</td>
      <td className="px-3 py-2">{item.hinh_thuc}</td>
      {/* CB xử lý */}
      <td className="px-3 py-2">
        <Select
          defaultValue={item.ten_can_bo}
          value={item.ten_can_bo}
          onValueChange={(val) => onUpdateOfficer?.(item.id, val)}
        >
          <SelectTrigger className="h-8 w-[150px] text-sm">
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
