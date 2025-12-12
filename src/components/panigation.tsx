import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { COLOR_OPTION } from "constant"

type TablePaginationProps = {
  totalRecord: number
  currentPage: number
  totalPages: number
  pageSize: string
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange: (size: string) => void
}

const TablePagination = ({
  totalRecord,
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps) => {
  return (
    <div className="sticky bottom-0 flex items-center justify-end gap-0 border-t bg-white p-3 text-sm text-gray-500">
      {/* Left */}
      <span>Tất cả {totalRecord} dòng</span>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Page size */}

        {/* Pagination */}
        <div className="flex items-center gap-0">
          <Button
            variant="ghost"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex h-6 w-6 items-center justify-center bg-[#f9f0fc] text-[#A531DC]">
            {currentPage}
          </div>

          <Button
            variant="ghost"
            size="icon"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Select value={pageSize} onValueChange={onPageSizeChange}>
          <SelectTrigger className="h-8 text-sm">
            <SelectValue placeholder="Chọn pageSize" />
          </SelectTrigger>

          <SelectContent>
            {pageSizeOptions.map((p) => (
              <SelectItem key={p} value={String(p)} className={COLOR_OPTION}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default TablePagination
