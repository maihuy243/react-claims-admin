import { memo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadgeUsers } from "@/components/status-badge-users"

const UsersListScreen = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const users = [
    {
      id: 123,
      code: "MKH1123",
      insured: "BĐ Quỳnh Trang",
      phone: "0393303050",
      email: "T****@gmail.com",
      cccd: "035788885858",
      creator: "CB-BDQ 1",
      status: "Đang khóa",
    },
    {
      id: 123,
      code: "MKH1123",
      insured: "BĐ Quỳnh Trang",
      phone: "0393303050",
      email: "T****@gmail.com",
      cccd: "035788885858",
      creator: "CB-BDQ 1",
      status: "Đang hoạt động",
    },
    {
      id: 123,
      code: "MKH1123",
      insured: "BĐ Quỳnh Trang",
      phone: "0393303050",
      email: "T****@gmail.com",
      cccd: "035788885858",
      creator: "Khách hàng",
      status: "Đang khóa",
    },
    {
      id: 123,
      code: "MKH1123",
      insured: "BĐ Quỳnh Trang",
      phone: "0393303050",
      email: "T****@gmail.com",
      cccd: "035788885858",
      creator: "Khách hàng",
      status: "Đang hoạt động",
    },
  ]

  // human: lặp lại list cho đủ số lượng y như hình
  const rows = Array(12).fill(users).flat().slice(0, 26)

  return (
    <div className="border flex flex-col h-[calc(100vh-19rem)] w-full">
      {/* Scroll body */}
      <div className="flex-1 overflow-auto">
        <table className="w-full min-w-[1000px] text-sm text-gray-700">
          <thead className="sticky top-0 bg-gray-50 border-b text-gray-600 z-10 text-nowrap">
            <tr>
              <th className="px-3 py-3 text-left font-semibold">ID</th>
              <th className="px-3 py-3 text-left font-semibold">
                Mã khách hàng
              </th>
              <th className="px-3 py-3 text-left font-semibold">
                Người được BH
              </th>
              <th className="px-3 py-3 text-left font-semibold">
                Số điện thoại
              </th>
              <th className="px-3 py-3 text-left font-semibold">Email</th>
              <th className="px-3 py-3 text-left font-semibold">CCCD/HC</th>
              <th className="px-3 py-3 text-left font-semibold">
                Người khởi tạo
              </th>
              <th className="px-3 py-3 text-left font-semibold">Trạng thái</th>
              <th className="px-3 py-3 text-left font-semibold">Tác vụ</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((u, i) => (
              <tr
                key={i}
                className="border-b text-nowrap odd:bg-white even:bg-gray-100 hover:bg-gray-200"
              >
                <td className="px-3 py-2 text-orange-600 font-semibold">
                  {u.id}
                </td>

                <td className="px-3 py-2 font-medium">{u.code}</td>

                <td className="px-3 py-2 text-blue-700 font-medium">
                  {u.insured}
                </td>

                <td className="px-3 py-2">{u.phone}</td>

                <td className="px-3 py-2">{u.email}</td>

                <td className="px-3 py-2">{u.cccd}</td>

                <td className="px-3 py-2">{u.creator}</td>

                <td className="px-3 py-2">
                  <StatusBadgeUsers status={u.status} />
                </td>

                <td className="px-3 py-2">
                  <button className="text-blue-600 hover:underline text-sm">
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t p-3 flex items-center justify-between text-sm text-gray-500 bg-white sticky bottom-0">
        <span>Tổng {rows.length} dòng</span>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div>{currentPage}</div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(UsersListScreen)
