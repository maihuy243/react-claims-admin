import React, { memo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HDItem } from "@/model"
import ContractRow from "../components/row"
import { EmptyState } from "@/components/empty"
import SkeletonRowContract from "./skeleton-row"

interface Props {
  data: HDItem[]
  total: number
  page: number
  pageSize: number
  loading?: boolean
  onPageChange: (page: number) => void
  onUpdateOfficer?: (id: string, officer: string) => void
}

const ContractsTable = memo(function ContractsTable({
  data,
  total,
  page,
  pageSize,
  loading,
  onPageChange,
  onUpdateOfficer,
}: Props) {
  const pageCount = Math.ceil(total / pageSize)

  return (
    <div className="border flex flex-col h-[calc(100vh-19rem)] w-full">
      {/* TABLE */}
      <div className="flex-1 overflow-auto">
        <table className="w-full min-w-[1000px] text-sm text-gray-700">
          {/* HEADER */}
          <thead className="sticky top-0 bg-gray-50 border-b text-gray-700 z-10 text-nowrap">
            <tr>
              <th className="px-3 py-3 text-left font-semibold">ID</th>
              <th className="px-3 py-3 text-left font-semibold">Mã đơn vị</th>
              <th className="px-3 py-3 text-left font-semibold">Số hợp đồng</th>
              <th className="px-3 py-3 text-left font-semibold">
                Chủ hợp đồng
              </th>
              <th className="px-3 py-3 text-left font-semibold">
                Ngày hiệu lực
              </th>
              <th className="px-3 py-3 text-left font-semibold">
                Ngày hết hạn
              </th>
              <th className="px-3 py-3 text-left font-semibold">
                Cán bộ xử lý
              </th>
              <th className="px-3 py-3 text-left font-semibold">Trạng thái</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {/* 1) Đang fetch lần đầu → skeleton */}
            {loading && data.length === 0 && <SkeletonRowContract />}

            {/* 2) Không có data → Empty UI */}
            {!loading && data.length === 0 && (
              <tr>
                <td colSpan={8}>
                  <div className="flex justify-center items-center h-[300px]">
                    <EmptyState label="Không có hợp đồng nào" />
                  </div>
                </td>
              </tr>
            )}

            {/* 3) Có data → render row */}
            {!loading &&
              data.length > 0 &&
              data.map((item) => (
                <ContractRow
                  key={item.id}
                  item={item}
                  onUpdateOfficer={onUpdateOfficer}
                />
              ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="border-t p-3 flex items-center justify-between text-sm text-gray-600 bg-white sticky bottom-0">
        <span>Tổng {total} dòng</span>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <span>{page}</span>

          <Button
            variant="outline"
            size="icon"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
})

export default ContractsTable
