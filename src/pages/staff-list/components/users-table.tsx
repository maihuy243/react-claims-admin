import { Dispatch, memo, SetStateAction, useState } from "react"
import SkeletonRowContract from "@/pages/compensation-list/components/skeleton-row"
import { CanBoItem } from "@/model"
import { EmptyState } from "@/components/empty"
import clsx from "clsx"
import TablePagination from "@/components/panigation"
import { useNavigate } from "react-router-dom"

const UsersListScreen = ({
  isLoading,
  users,
  total_pages,
  total_record,
  setCurrentPage,
  currentPage,
  pageSize,
  setPageSize,
}: {
  refetch: any
  isLoading: boolean
  users: CanBoItem[]
  total_pages: number
  total_record: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  currentPage: number
  setPageSize: Dispatch<SetStateAction<string>>
  pageSize: string
}) => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate("/contracts")
  }

  return (
    <div className="flex h-[calc(100vh-19rem)] w-full flex-col border">
      {/* Scroll body */}
      <div className="flex-1 overflow-auto">
        <table className="w-full min-w-[1000px] text-sm text-gray-700">
          <thead className="sticky top-0 z-10 text-nowrap border-b bg-gray-50 text-gray-600">
            <tr>
              <th className="px-3 py-3 text-left font-semibold">Mã cán bộ</th>
              <th className="px-3 py-3 text-left font-semibold">Tên cán bộ</th>
              <th className="px-3 py-3 text-left font-semibold">
                Tổng số hồ sơ
              </th>
              <th className="px-3 py-3 text-left font-semibold">
                Đã hoàn thành
              </th>
              <th className="px-3 py-3 text-left font-semibold">Đang xử lý</th>
              <th className="px-3 py-3 text-left font-semibold">Chưa xử lý </th>
            </tr>
          </thead>

          <tbody>
            {isLoading && <SkeletonRowContract />}

            {!isLoading && users.length === 0 && (
              <tr>
                <td colSpan={8}>
                  <div className="flex h-[300px] items-center justify-center">
                    <EmptyState label="Không có người dùng nào" />
                  </div>
                </td>
              </tr>
            )}

            {!isLoading &&
              users.map((u, i) => (
                <tr
                  key={i}
                  className="text-nowrap border-b odd:bg-white even:bg-gray-100 hover:bg-gray-200"
                >
                  <td className="px-3 py-2 font-medium">{u.ma_cb || "-"}</td>
                  <td className="px-3 py-2 font-medium">{u.ten_cb || "-"}</td>
                  <td
                    className={clsx(
                      "px-3 py-2",
                      String(u.tong_hs) && "text-[#F79009] underline",
                    )}
                  >
                    {typeof u.tong_hs === "number" ? (
                      <span className="cursor-pointer" onClick={onClick}>
                        {u.tong_hs}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td
                    className={clsx(
                      "px-3 py-2",
                      String(u.da_ht) && "text-[#F79009] underline",
                    )}
                  >
                    {typeof u.da_ht === "number" ? (
                      <span className="cursor-pointer" onClick={onClick}>
                        {u.da_ht}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td
                    className={clsx(
                      "px-3 py-2",
                      String(u.dang_xl) && "text-[#F79009] underline",
                    )}
                  >
                    {typeof u.dang_xl === "number" ? (
                      <span className="cursor-pointer" onClick={onClick}>
                        {u.dang_xl}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td
                    className={clsx(
                      "px-3 py-2",
                      String(u.chua_xl) && "text-[#F79009] underline",
                    )}
                  >
                    {typeof u.chua_xl === "number" ? (
                      <span className="cursor-pointer" onClick={onClick}>
                        {u.chua_xl}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
        totalRecord={total_record}
        totalPages={total_pages}
      />
    </div>
  )
}

export default memo(UsersListScreen)
