import {
  useState,
  useMemo,
  useCallback,
  memo,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react"
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
import { useDebounce } from "@/hooks/custom/useDebounce"
import { PROCESSING_OFFICER } from "constant"
import { STATUS_ALL, TFilterLocal } from "../index"

type TSearchQuery = keyof typeof SEARCH_FIELDS

interface FilterContractsProps {
  onFilterChange: (params: Record<string, any>) => void
  isLoading: boolean
  setFiltersLocal: Dispatch<SetStateAction<TFilterLocal>>
  filtersLocal: TFilterLocal
}

function FilterContracts({
  onFilterChange,
  isLoading,
  setFiltersLocal,
  filtersLocal,
}: FilterContractsProps) {
  const [filterType, setFilterType] = useState<TSearchQuery>("id")
  const [searchQuery, setSearchQuery] = useState("")

  const debouncedSearchQuery = useDebounce(searchQuery)

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      onFilterChange?.({})
      return
    }

    const params = !!searchQuery
      ? {
          [filterType]: searchQuery,
        }
      : {}

    onFilterChange?.(params)
  }, [filterType, searchQuery, onFilterChange])

  const onChangeFilterType = useCallback(
    (value: keyof typeof SEARCH_FIELDS) => {
      if (value === filterType) return
      setFilterType(value)
      setSearchQuery("")
    },
    [],
  )

  useEffect(() => {
    handleSearch()
  }, [debouncedSearchQuery])

  return (
    <Wrapper className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4 md:py-4">
      {/* Search Section */}
      <div className="flex w-full items-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:w-1/2">
        <Select defaultValue={filterType} onValueChange={onChangeFilterType}>
          <SelectTrigger className="w-48 rounded-none border-0 border-r border-gray-200 text-sm text-gray-700 focus:ring-0">
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
            className="border-0 pl-3 pr-10 text-sm text-gray-700 focus-visible:ring-0"
          />

          {/* ICON: dùng isLoading từ query */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 h-full hover:bg-transparent"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            ) : (
              <Search className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </div>
      </div>

      {/* Additional filters (nếu cần mình optimize luôn) */}
      <div className="flex w-full items-center gap-3 md:w-auto">
        <Select
          value={filtersLocal.officier}
          onValueChange={(s) => {
            setFiltersLocal((prev: TFilterLocal) => ({ ...prev, officier: s }))
          }}
        >
          <SelectTrigger className="min-w-[160px] border-gray-200 text-sm">
            <SelectValue placeholder="CB xử lý: Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={STATUS_ALL}>CB xử lý: Tất cả</SelectItem>
            {PROCESSING_OFFICER.map((s) => (
              <SelectItem value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filtersLocal.status}
          onValueChange={(s) => {
            setFiltersLocal((prev: TFilterLocal) => ({ ...prev, status: s }))
          }}
        >
          <SelectTrigger className="min-w-[160px] border-gray-200 text-sm">
            <SelectValue placeholder="Trạng thái: Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={STATUS_ALL}>Trạng thái:Tất cả</SelectItem>
            <SelectItem value="Hoạt động">Hoạt động</SelectItem>
            <SelectItem value="Không hoạt động">Không hoạt động</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Wrapper>
  )
}

export default memo(FilterContracts)
