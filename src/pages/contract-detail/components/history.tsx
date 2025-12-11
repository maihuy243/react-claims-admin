import { CMSApi } from "@/api"
import { EmptyState } from "@/components/empty"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LSBTItem } from "@/model"
import { useUIStore } from "@/store/state"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

export default function HistoryTable() {
  const [data, setData] = useState<LSBTItem[]>([])
  const { id } = useParams()
  const loading = useRef<boolean>(false)
  const setLoading = useUIStore((s) => s.setLoading)
  const err = useUIStore((s) => s.showError)

  const handleFetchData = async () => {
    try {
      if (!id || loading.current) return
      loading.current = true
      setLoading(true)
      const res = await CMSApi.getLsbt({ idClaim: id })
      setData(res.data ?? [])
    } catch (error) {
      err(String(error))
    } finally {
      loading.current = false
      setLoading(false)
    }
  }

  useEffect(() => {
    handleFetchData()
  }, [id])

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
            {!data.length && (
              <TableRow>
                <TableCell colSpan={4}>
                  <EmptyState label="Chưa có lịch sử bồi thường" />
                </TableCell>
              </TableRow>
            )}
            {!!data.length &&
              data.map((item, idx) => (
                <TableRow
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>{item.hanh_dong}</TableCell>
                  <TableCell>{item.du_lieu}</TableCell>
                  <TableCell>{item.thoi_gian}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
