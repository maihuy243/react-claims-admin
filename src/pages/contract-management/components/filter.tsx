import { useState, useMemo, useCallback, memo } from "react"
import { Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Wrapper from "@/components/wrapper"
import { SEARCH_FIELDS } from "@/configs/constants"

type TSearchQuery = keyof typeof SEARCH_FIELDS

interface FilterContractsProps {
  onFilterChange: (params: Record<string, any>) => void
  isLoading: boolean
}

function FilterContracts({ onFilterChange, isLoading }: FilterContractsProps) {
  const [filterType, setFilterType] = useState<TSearchQuery>("id")
  const [searchQuery, setSearchQuery] = useState("")

  const handleBlur = useCallback(() => {
    if (!searchQuery.trim()) {
      onFilterChange?.({})
      return
    }

    const params =
      filterType === "all"
        ? {
            so_hop_dong: searchQuery,
            chu_hop_dong: searchQuery,
            ten_can_bo: searchQuery,
          }
        : {
            [filterType]: searchQuery,
          }

    onFilterChange?.(params)
  }, [filterType, searchQuery, onFilterChange])

  const onChangeFilterType = useCallback(
    (value: keyof typeof SEARCH_FIELDS) => {
      setFilterType(value)
    },
    [],
  )

  return (
    <Wrapper
      className="
        flex flex-col 
        md:flex-row md:items-center md:justify-between 
        gap-3 md:gap-4 
        mb-4 md:py-4
      "
    >
      {/* Search Section */}
      <div className="w-full md:w-1/2 flex items-center bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <Select defaultValue={filterType} onValueChange={onChangeFilterType}>
          <SelectTrigger className="w-48 border-0 border-r border-gray-200 rounded-none focus:ring-0 text-sm text-gray-700">
            <SelectValue placeholder="Tìm kiếm theo" />
          </SelectTrigger>

          <SelectContent>
            {Object.entries(SEARCH_FIELDS).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Input
            placeholder="Nhập thông tin"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={handleBlur}
            className="border-0 focus-visible:ring-0 text-sm text-gray-700 pl-3 pr-10"
          />

          {/* ICON: dùng isLoading từ query */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 h-full hover:bg-transparent"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
            ) : (
              <Search className="w-4 h-4 text-gray-500" />
            )}
          </Button>
        </div>
      </div>

      {/* Additional filters (nếu cần mình optimize luôn) */}
      <div className="w-full md:w-auto flex items-center gap-3">
        <Select defaultValue="all">
          <SelectTrigger className="min-w-[160px] text-sm border-gray-200">
            <SelectValue placeholder="Sự kiện: Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Sự kiện: Tất cả</SelectItem>
            <SelectItem value="health">Sức khỏe</SelectItem>
            <SelectItem value="accident">Tai nạn</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="min-w-[160px] text-sm border-gray-200">
            <SelectValue placeholder="Trạng thái: Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="pending">Chờ duyệt</SelectItem>
            <SelectItem value="approved">Đã duyệt</SelectItem>
            <SelectItem value="rejected">Từ chối</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Wrapper>
  )
}

export default memo(FilterContracts)
