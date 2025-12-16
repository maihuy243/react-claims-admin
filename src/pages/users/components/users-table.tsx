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
import TablePagination from "@/components/panigation"
import { DropdownTacVu } from "@/components/dropdown-menu"
import AlertCommon from "@/components/alert"

const UsersListScreen = ({
  refetch,
  isLoading,
  users,
  total_pages,
  total_record,
  setCurrentPage,
  currentPage,
  setPageSize,
  pageSize,
}: {
  refetch: any
  isLoading: boolean
  users: UserItem[]
  total_pages: number
  total_record: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  currentPage: number
  setPageSize: Dispatch<SetStateAction<string>>
  pageSize: string
}) => {
  const [alert, setAlert] = useState<boolean>(false)
  const [messsage, setMessage] = useState<string>("")
  const [payload, setPayload] = useState<{ id: string; status: string }>({
    id: "",
    status: "",
  })

  const { err, setLoading, success } = useUIStore(
    useShallow((s) => ({
      loading: s.loading,
      setLoading: s.setLoading,
      success: s.showSuccess,
      err: s.showError,
    })),
  )

  const onConfirm = (id: string, newStatus: string) => {
    setPayload({ id: id, status: newStatus })
    setMessage(
      newStatus === "Đang hoạt động"
        ? "Bạn chắc chắn muốn khóa tài khoản?"
        : "Bạn chắc chắn muốn mở khóa tài khoản?",
    )
    setAlert(true)
  }

  const onUpdateStatus = async () => {
    try {
      setLoading(true)
      const status = payload.status == "Đang hoạt động" ? "Y" : "N"
      const result = await CMSApi.updateUserStatus({
        id: payload.id,
        trang_thai: status,
      })
      if (!result.success) {
        err(result.message)
        return
      }
      refetch()
      success(result.message)
    } finally {
      setLoading(false)
      setAlert(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-19rem)] w-full flex-col border">
      {/* Scroll body */}
      <div className="flex-1 overflow-auto">
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[1200px] text-sm text-gray-700">
            {/* ================= THEAD ================= */}
            <thead className="sticky top-0 z-30 text-nowrap border-b bg-gray-50 text-gray-600">
              <tr>
                {/* ID – sticky LEFT */}
                <th className="sticky left-0 z-40 bg-gray-50 px-3 py-3 text-left font-semibold shadow-[4px_0_8px_rgba(0,0,0,0.05)]">
                  ID
                </th>

                <th className="px-3 py-3 text-left font-semibold">
                  Số hợp đồng
                </th>
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

                {/* Trạng thái – sticky RIGHT (chừa chỗ cho Tác vụ) */}
                <th className="sticky right-[65px] z-40 bg-gray-50 px-3 py-3 text-left font-semibold shadow-[-4px_0_8px_rgba(0,0,0,0.05)]">
                  Trạng thái
                </th>

                {/* Tác vụ – sticky RIGHT */}
                <th className="sticky right-0 w-[65px]! z-50 bg-gray-50 px-3 py-3 text-left font-semibold shadow-[-4px_0_8px_rgba(0,0,0,0.08)]">
                  Tác vụ
                </th>
              </tr>
            </thead>

            {/* ================= TBODY ================= */}
            <tbody>
              {isLoading && <SkeletonRowContract />}

              {!isLoading && users.length === 0 && (
                <tr>
                  <td colSpan={9}>
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
                    {/* ID – sticky LEFT */}
                    <td className="sticky left-0 z-30 bg-inherit px-3 py-2 font-semibold text-[#F79009] shadow-[4px_0_8px_rgba(0,0,0,0.05)]">
                      {u.id}
                    </td>

                    <td className="px-3 py-2 font-semibold">
                      {u.so_hd || "-"}
                    </td>

                    <td className="px-3 py-2 font-medium">{u.ma_kh || "-"}</td>

                    <td className="px-3 py-2 font-medium">
                      {u.ten_nguoi_duoc_bao_hiem || "-"}
                    </td>

                    <td className="px-3 py-2">{u.email || "-"}</td>
                    <td className="px-3 py-2">{u.so_dien_thoai || "-"}</td>
                    <td className="px-3 py-2">{u.cccd || "-"}</td>

                    {/* Trạng thái – sticky RIGHT */}
                    <td className="sticky right-[65px] z-30 bg-inherit px-3 py-2 shadow-[-4px_0_8px_rgba(0,0,0,0.05)]">
                      <StatusBadgeUsers status={u.tthai || "-"} />
                    </td>

                    {/* Tác vụ – sticky RIGHT */}
                    <td className="sticky right-0 z-40 bg-inherit px-3 py-2 shadow-[-4px_0_8px_rgba(0,0,0,0.08)] w-[65px]! ">
                      <DropdownTacVu
                        status={u.tthai}
                        onClick={() => onConfirm(u.id, u.tthai)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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

      <AlertCommon
        onClose={() => setAlert(false)}
        open={alert}
        message={messsage}
        onConfirm={onUpdateStatus}
      />
    </div>
  )
}

export default memo(UsersListScreen)
