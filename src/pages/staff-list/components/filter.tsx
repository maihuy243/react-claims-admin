import { Dispatch, memo, SetStateAction, useCallback, useState } from "react"
import { Loader2, Search } from "lucide-react"
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
import { useDidUpdateEffect } from "@/hooks/custom/useDidUpdate"
import { TSearchFilter } from "../index"

function FilterContracts({
  setFilters,
  loading,
}: {
  setFilters: Dispatch<SetStateAction<TSearchFilter | undefined>>
  loading: boolean
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("ten_cb")
  const [status, setStatus] = useState("all")

  const handleBlur = useCallback(() => {
    const params: TSearchFilter = {
      querySearch: searchQuery.trim(),
      status: status,
      type: searchType,
    }
    setFilters(params)
  }, [searchType, searchQuery, setFilters, status])

  useDidUpdateEffect(() => {
    const params: TSearchFilter = {
      querySearch: searchQuery.trim(),
      status: status,
      type: searchType,
    }
    setFilters(params)
  }, [status])

  return (
    <Wrapper className="mb-4 flex flex-col gap-3 transition-all md:flex-row md:items-center md:justify-between md:gap-4 md:py-4">
      {/* Search section */}
      <div className="flex w-full items-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:w-1/2">
        <Select value={searchType} onValueChange={(s) => setSearchType(s)}>
          <SelectTrigger className="w-36 rounded-none border-0 border-r border-gray-200 text-sm text-gray-600 focus:ring-0">
            <SelectValue placeholder="Tìm kiếm theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ten_cb">Tên cán bộ</SelectItem>
            <SelectItem value="ma_cb">Mã cán bộ</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Input
            placeholder="Nhập thông tin"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={handleBlur}
            className="border-0 pl-3 pr-10 text-sm text-gray-700 focus-visible:ring-0"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 h-full hover:bg-transparent"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            ) : (
              <Search className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </div>
      </div>

      {/* Filter section */}
      <div className="flex w-full items-center gap-3 md:w-auto">
        <Select value={status} onValueChange={(s) => setStatus(s)}>
          <SelectTrigger className="min-w-[160px] border-gray-200 text-sm">
            <SelectValue placeholder="Trạng thái: Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Trạng thái: Tất cả</SelectItem>
            <SelectItem value="Đang hoạt động">Đang hoạt động</SelectItem>
            <SelectItem value="Không hoạt động">Không hoạt động</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Wrapper>
  )
}

export default memo(FilterContracts)
