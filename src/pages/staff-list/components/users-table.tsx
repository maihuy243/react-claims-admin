import { Dispatch, memo, SetStateAction, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import SkeletonRowContract from "@/pages/compensation-list/components/skeleton-row"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { USER_STATUS } from "constant"
import { useUIStore } from "@/store/state"
import { useShallow } from "zustand/shallow"
import { CMSApi } from "@/api"
import { CanBoItem, UserItem } from "@/model"
import { EmptyState } from "@/components/empty"
import clsx from "clsx"

const UsersListScreen = ({
  refetch,
  isLoading,
  users,
  total_pages,
  total_record,
  setCurrentPage,
  currentPage,
}: {
  refetch: any
  isLoading: boolean
  users: CanBoItem[]
  total_pages: number
  total_record: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  currentPage: number
}) => {
  const { err, setLoading, success } = useUIStore(
    useShallow((s) => ({
      loading: s.loading,
      setLoading: s.setLoading,
      success: s.showSuccess,
      err: s.showError,
    })),
  )

  return (
    <div className="flex h-[calc(100vh-19rem)] w-full flex-col border">
      {/* Scroll body */}
      <div className="flex-1 overflow-auto">
        <table className="w-full min-w-[1000px] text-sm text-gray-700">
          <thead className="sticky top-0 z-10 text-nowrap border-b bg-gray-50 text-gray-600">
            <tr>
              <th className="px-3 py-3 text-left font-semibold">Mã cán bộ</th>
              <th className="px-3 py-3 text-left font-semibold">
                Số điện thoại
              </th>
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
                  <td className="px-3 py-2 font-medium text-blue-700">
                    {u.ten_cb || "-"}
                  </td>
                  <td className="px-3 py-2">{u?.sdt || "-"}</td>
                  <td
                    className={clsx(
                      "px-3 py-2",
                      u.tong_hs && "text-[#F79009] underline",
                    )}
                  >
                    {u.tong_hs || "-"}
                  </td>
                  <td
                    className={clsx(
                      "px-3 py-2",
                      u.da_ht && "text-[#F79009] underline",
                    )}
                  >
                    {u.da_ht || "-"}
                  </td>
                  <td
                    className={clsx(
                      "px-3 py-2",
                      u.dang_xl && "text-[#F79009] underline",
                    )}
                  >
                    {u.dang_xl || "-"}
                  </td>
                  <td
                    className={clsx(
                      "px-3 py-2",
                      u.chua_xl && "text-[#F79009] underline",
                    )}
                  >
                    {u.chua_xl || "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="sticky bottom-0 flex items-center justify-between border-t bg-white p-3 text-sm text-gray-500">
        <span>Tổng {total_record} dòng</span>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div>{currentPage}</div>

          <Button
            variant="outline"
            size="icon"
            disabled={currentPage >= total_pages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(UsersListScreen)
