import { Dispatch, memo, SetStateAction } from "react"
import { HoSoBoiThuong } from "@/model"
import ContractRow from "../components/row"
import { EmptyState } from "@/components/empty"
import SkeletonRowContract from "./skeleton-row"
import TablePagination from "@/components/panigation"

interface Props {
  data: HoSoBoiThuong[]
  total: number
  page: number
  totalPage: number
  loading?: boolean
  onPageChange: (page: number) => void
  onUpdateOfficer?: (id: string, officer: string) => void
  setPageSize: Dispatch<SetStateAction<string>>
  pageSize: string
}

const ContractsTable = memo(function ContractsTable({
  data,
  total,
  page,
  totalPage,
  loading,
  onPageChange,
  onUpdateOfficer,
  setPageSize,
  pageSize,
}: Props) {
  return (
    <div className="flex h-[calc(100vh-19rem)] w-full flex-col border">
      {/* TABLE */}
      <div className="flex-1 overflow-auto">
        <table className="w-full min-w-[1000px] text-sm text-gray-700">
          {/* HEADER */}
          <thead className="sticky top-0 z-10 text-nowrap border-b bg-gray-50 text-gray-700">
            <tr>
              <th className="px-3 py-3 text-left font-semibold">ID</th>
              <th className="px-3 py-3 text-left font-semibold">Ngày tạo</th>
              <th className="px-3 py-3 text-left font-semibold">Mã đơn vị</th>
              <th className="px-3 py-3 text-left font-semibold">CCCD người tạo</th>
              <th className="px-3 py-3 text-left font-semibold">Tên người tạo</th>
              <th className="px-3 py-3 text-left font-semibold">Mã KH</th>
              <th className="px-3 py-3 text-left font-semibold">Họ và tên</th>
              <th className="px-3 py-3 text-left font-semibold">Số giấy tờ</th>
              <th className="px-3 py-3 text-left font-semibold">Số hợp đồng</th>
              <th className="px-3 py-3 text-left font-semibold">Sự kiện</th>
              <th className="px-3 py-3 text-left font-semibold">Hình thức</th>
              <th className="px-3 py-3 text-left font-semibold">CB xử lý</th>
              <th className="sticky right-0 z-30 bg-gray-50 px-3 py-3 text-left font-semibold shadow-[-4px_0_8px_rgba(0,0,0,0.06)]">
                Trạng thái
              </th>
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
                  <div className="flex h-[300px] items-center justify-center">
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
      <TablePagination
        currentPage={page}
        onPageChange={onPageChange}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
        totalRecord={total}
        totalPages={totalPage}
      />
    </div>
  )
})

export default ContractsTable
