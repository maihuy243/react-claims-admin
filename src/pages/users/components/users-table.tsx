import { Dispatch, memo, SetStateAction, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadgeUsers } from "@/components/status-badge-users"
import { useSearchUsers } from "@/hooks/useUser"
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
import { UserItem } from "@/model"
import { EmptyState } from "@/components/empty"

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
  users: UserItem[]
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

  const onUpdateStatus = async (id: string, newStatus: string) => {
    try {
      setLoading(true)
      const status = newStatus == "Đang hoạt động" ? "N" : "Y"
      const result = await CMSApi.updateUserStatus({
        id: id,
        trang_thai: status,
      })
      if (!result.success) {
        err(result.message)
        return
      }
      refetch()
      success(result.message)
      console.log(id, status)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-19rem)] w-full flex-col border">
      {/* Scroll body */}
      <div className="flex-1 overflow-auto">
        <table className="w-full min-w-[1000px] text-sm text-gray-700">
          <thead className="sticky top-0 z-10 text-nowrap border-b bg-gray-50 text-gray-600">
            <tr>
              <th className="px-3 py-3 text-left font-semibold">ID</th>
              <th className="px-3 py-3 text-left font-semibold">
                Mã khách hàng
              </th>
              <th className="px-3 py-3 text-left font-semibold">
                Người được BH
              </th>
              <th className="px-3 py-3 text-left font-semibold">Email</th>
              <th className="px-3 py-3 text-left font-semibold">
                Số điện thoại
              </th>
              <th className="px-3 py-3 text-left font-semibold">CCCD</th>
              <th className="px-3 py-3 text-left font-semibold">Trạng thái</th>
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
                  <td className="px-3 py-2 font-semibold text-orange-600">
                    {u.id}
                  </td>

                  {/* Mã khách hàng */}
                  <td className="px-3 py-2 font-medium">{u.ma_kh || "-"}</td>

                  {/* Người được BH */}
                  <td className="px-3 py-2 font-medium text-blue-700">
                    {u.ten_nguoi_duoc_bao_hiem || "-"}
                  </td>

                  {/* Email */}
                  <td className="px-3 py-2">{u.email || "-"}</td>

                  {/* Số điện thoại */}
                  <td className="px-3 py-2">{u.so_dien_thoai || "-"}</td>

                  {/* CCCD */}
                  <td className="px-3 py-2">{u.cccd || "-"}</td>

                  {/* Trạng thái */}
                  {/* <StatusBadgeUsers status={u.tthai || "-"} /> */}
                  <td className="px-3 py-2">
                    <Select
                      defaultValue={u.tthai}
                      value={u.tthai}
                      onValueChange={(val) => onUpdateStatus(u.id, val)}
                    >
                      <SelectTrigger className="h-8 w-[150px] text-sm">
                        <SelectValue
                          placeholder="Chọn cán bộ"
                          className="bg-red-300!"
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {USER_STATUS.map((p) => (
                          <SelectItem
                            key={p.value}
                            value={p.value}
                            className={`text-sm data-[state=checked]:bg-orange-500 data-[state=checked]:text-white`}
                          >
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
