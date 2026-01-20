import {
  memo,
  Dispatch,
  SetStateAction,
} from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Wrapper from "@/components/wrapper"
import { STATUS_ALL, TFilterLocalDSBT } from "../index"


interface FilterContractsProps {
  onFilterChange: (params: Record<string, any>) => void
  isLoading: boolean
  setFiltersLocal: Dispatch<SetStateAction<TFilterLocalDSBT>>
  filtersLocal: TFilterLocalDSBT
}

function FilterContracts({
  setFiltersLocal,
  filtersLocal,
}: FilterContractsProps) {
  return (
    <Wrapper className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4 md:py-4">
      <div></div>

      {/* Additional filters (nếu cần mình optimize luôn) */}
      <div className="flex w-full items-center gap-3 md:w-auto">
        <Select
          value={filtersLocal.priority}
          onValueChange={(value) => {
            setFiltersLocal((prev) => ({
              ...prev,
              priority: value,
            }))
          }}
        >
          <SelectTrigger className="min-w-[160px] border-gray-200 text-sm">
            <SelectValue placeholder="Ưu tiên: Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Ưu tiên: Có</SelectItem>
            <SelectItem value="0">Ưu tiên: Không</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filtersLocal.event}
          onValueChange={(s) =>
            setFiltersLocal((prev) => ({ ...prev, event: s }))
          }
        >
          <SelectTrigger className="min-w-[160px] border-gray-200 text-sm">
            <SelectValue placeholder="Sự kiện: Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={STATUS_ALL}>Sự kiện: Tất cả</SelectItem>
            <SelectItem value="Ốm bệnh">Ốm bệnh</SelectItem>
            <SelectItem value="Tai nạn">Tai nạn</SelectItem>
            <SelectItem value="Thai sản">Thai sản</SelectItem>
            <SelectItem value="Răng">Răng</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filtersLocal.status}
          onValueChange={(s) =>
            setFiltersLocal((prev) => ({ ...prev, status: s }))
          }
        >
          <SelectTrigger className="min-w-[160px] border-gray-200 text-sm">
            <SelectValue placeholder="Trạng thái: Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={STATUS_ALL}>Trạng thái: Tất cả</SelectItem>
            <SelectItem value="Đã tiếp nhận">Đã tiếp nhận</SelectItem>
            <SelectItem value="Đang giải quyết">Đang giải quyết</SelectItem>
            <SelectItem value="Bổ sung chứng từ">Bổ sung chứng từ</SelectItem>
            <SelectItem value="Từ chối">Từ chối</SelectItem>
            <SelectItem value="Đã duyệt">Đã duyệt</SelectItem>
            <SelectItem value="Hoàn tất">Hoàn tất</SelectItem>
            <SelectItem value="Huỷ">Huỷ</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Wrapper>
  )
}

export default memo(FilterContracts)
