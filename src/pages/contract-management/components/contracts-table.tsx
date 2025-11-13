import React, { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PROCESSING_OFFICER } from "constant"
import { StatusBadge } from "@/components/status-badge"

const ClaimsListScreen = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const claims = [
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Ốm",
      type: "Nội trú",
      processor: undefined,
      status: "Đã tiếp nhận",
    },
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Tai nạn",
      type: "Ngoại trú",
      processor: undefined,
      status: "Đang trình",
    },
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Bệnh",
      type: "Ngoại trú",
      processor: undefined,
      status: "Bổ sung CT",
    },
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Thai sản",
      type: "Nội trú",
      processor: undefined,
      status: "Đã tiếp nhận",
    },
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Răng",
      type: "Ngoại trú",
      processor: undefined,
      status: "Đang giải quyết",
    },
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Thai sản",
      type: "Nội trú",
      processor: undefined,
      status: "Đã thanh toán",
    },
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Thai sản",
      type: "Ngoại trú",
      processor: undefined,
      status: "Đã duyệt",
    },
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Thai sản",
      type: "Nội trú",
      processor: undefined,
      status: "Từ chối",
    },
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Thai sản",
      type: "Nội trú",
      processor: undefined,
      status: "Từ chối",
    },
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Thai sản",
      type: "Nội trú",
      processor: undefined,
      status: "Đã thanh toán",
    },
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Thai sản",
      type: "Nội trú",
      processor: undefined,
      status: "Đã thanh toán",
    },
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Thai sản",
      type: "Nội trú",
      processor: undefined,
      status: "Đã thanh toán",
    },
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Thai sản",
      type: "Nội trú",
      processor: undefined,
      status: "Đã thanh toán",
    },
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Thai sản",
      type: "Nội trú",
      processor: undefined,
      status: "Đã thanh toán",
    },
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Thai sản",
      type: "Nội trú",
      processor: undefined,
      status: "Đã thanh toán",
    },
    {
      id: 123,
      code: "MKH123",
      name: "BĐ Quỳnh Trang",
      document: "Số hợp đồng",
      contract: "15566565",
      event: "Thai sản",
      type: "Nội trú",
      processor: undefined,
      status: "Đã thanh toán",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã tiếp nhận":
        return "bg-blue-100 text-blue-700"
      case "Đang trình":
        return "bg-yellow-100 text-yellow-700"
      case "Bổ sung CT":
        return "bg-red-100 text-red-700"
      case "Đang giải quyết":
        return "bg-orange-100 text-orange-700"
      case "Đã duyệt":
        return "bg-green-100 text-green-700"
      case "Đã thanh toán":
        return "bg-emerald-100 text-emerald-700"
      case "Từ chối":
        return "bg-gray-200 text-gray-800"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="border flex flex-col h-[calc(100vh-19rem)] overscroll-x-auto w-full">
      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        <table className="w-full min-w-[900px] text-sm text-gray-700">
          <thead className="sticky top-0 bg-gray-50 border-b text-gray-600 z-10 text-nowrap">
            <tr>
              <th className="px-3 py-3 text-left font-semibold">ID</th>
              <th className="px-3 py-3 text-left font-semibold">Mã KH</th>
              <th className="px-3 py-3 text-left font-semibold">Họ và tên</th>
              <th className="px-3 py-3 text-left font-semibold">Số giấy tờ</th>
              <th className="px-3 py-3 text-left font-semibold">Số hợp đồng</th>
              <th className="px-3 py-3 text-left font-semibold">Sự kiện</th>
              <th className="px-3 py-3 text-left font-semibold">Hình thức</th>
              <th className="px-3 py-3 text-left font-semibold">CB xử lý</th>
              <th className="px-3 py-3 text-left font-semibold">Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {claims.map((c, i) => (
              <tr
                key={i}
                className="border-b  text-nowrap
               odd:bg-white
                even:bg-gray-100
                hover:bg-gray-200
              "
              >
                <td className="px-3 py-2 text-orange-500 font-semibold">
                  {c.id}
                </td>
                <td className="px-3 py-2">{c.code}</td>
                <td className="px-3 py-2 font-medium text-blue-700">
                  {c.name}
                </td>
                <td className="px-3 py-2">{c.document}</td>
                <td className="px-3 py-2">{c.contract}</td>
                <td className="px-3 py-2">{c.event}</td>
                <td className="px-3 py-2">{c.type}</td>

                {/* CB xử lý select */}
                <td className="px-3 py-2">
                  <Select defaultValue={c.processor}>
                    <SelectTrigger className="h-8 text-sm w-[130px]">
                      <SelectValue
                        placeholder="Chọn Cán Bộ"
                        className="text-black"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {PROCESSING_OFFICER.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>

                {/* Trạng thái Badge */}
                <td className="px-3 py-2">
                  <StatusBadge status={c.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination cố định */}
      <div className="border-t p-3 flex items-center justify-between text-sm text-gray-500 sticky bottom-0 bg-white">
        <span>Tổng {claims.length} dòng</span>
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

export default ClaimsListScreen
