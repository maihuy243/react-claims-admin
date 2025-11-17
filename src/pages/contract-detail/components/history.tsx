import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function HistoryTable() {
  const data = [
    { action: "Cập nhật TT", value: "Đang trình", time: "09:00 11/02/2025" },
    {
      action: "Cập nhật cán bộ",
      value: "Nguyễn văn B",
      time: "09:00 11/02/2025",
    },
    { action: "Cập nhật TT", value: "Đang trình", time: "09:00 11/02/2025" },
    {
      action: "Cập nhật cán bộ",
      value: "Nguyễn văn B",
      time: "09:00 11/02/2025",
    },
    { action: "Cập nhật TT", value: "Đang trình", time: "09:00 11/02/2025" },
    {
      action: "Cập nhật cán bộ",
      value: "Nguyễn văn B",
      time: "09:00 11/02/2025",
    },
    { action: "Cập nhật TT", value: "Đang trình", time: "09:00 11/02/2025" },
    {
      action: "Cập nhật cán bộ",
      value: "Nguyễn văn B",
      time: "09:00 11/02/2025",
    },
    { action: "Cập nhật TT", value: "Đang trình", time: "09:00 11/02/2025" },
  ]

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Lịch sử</h2>

      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[60px]">STT</TableHead>
              <TableHead>Hành động</TableHead>
              <TableHead>Dữ liệu</TableHead>
              <TableHead>Thời gian</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, idx) => (
              <TableRow
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{item.action}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{item.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
