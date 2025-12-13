import { useRef, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Upload, FileText, RotateCcw } from "lucide-react"
import { CMSApi } from "@/api"
import { useUIStore } from "@/store/state"
import { useShallow } from "zustand/shallow"
import * as XLSX from "xlsx"
import { ImportPreviewState } from "@/model"
import { buildImportPreview } from "@/utils/xlsx"
import { delay } from "@/utils"

type ImportUserDialogProps = {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

const INIT_IMPORT_PREVIEW_STATE: ImportPreviewState = {
  name: "",
  size: 0,
  total_record: 0,
  valid: 0,
  invalid: 0,
  rows: [],
}

export default function ImportUserDialog({
  open,
  onClose,
  onSuccess,
}: ImportUserDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState<FormData | null>(null)
  const [previewRows, setPreviewRows] = useState<ImportPreviewState>(
    INIT_IMPORT_PREVIEW_STATE,
  )

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { err, success, loading, setLoading } = useUIStore(
    useShallow((s) => ({
      err: s.showError,
      success: s.showSuccess,
      loading: s.loading,
      setLoading: s.setLoading,
    })),
  )

  const handleSelectFile = async (file: File) => {
    clearImportState()
    setLoading(true)
    setFile(file)

    const fd = new FormData()
    fd.append("file", file)
    setFormData(fd)

    const previewData = await buildImportPreview(file)
    await delay(500)
    setLoading(false)
    setPreviewRows(previewData)
  }

  const handleSubmit = async () => {
    if (!file) return

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("file", file)
      const res = await CMSApi.importUser(formData)
      if (!res.success) {
        err(res.message)
        return
      }

      success(res.message)
      onSuccess?.()
      handleClose()
    } catch (e: any) {
      err(e.message)
    } finally {
      setLoading(false)
    }
  }

  const clearImportState = () => {
    setFile(null)
    setFormData(null)
    setPreviewRows(INIT_IMPORT_PREVIEW_STATE)
  }

  const handleClose = () => {
    clearImportState()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl rounded-xl p-0">
        {/* HEADER */}
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Upload danh sách người dùng
          </DialogTitle>
        </DialogHeader>

        {/* BODY */}
        <div className="space-y-6 px-6 py-6">
          {/* STEP 1: Upload */}
          {!file && (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-orange-300 bg-orange-50 py-14">
              <Upload className="h-10 w-10 text-[#F79009]" />
              <div className="text-sm text-gray-700">
                <span className="font-medium text-[#F79009]">Chọn file</span>
              </div>
              <div className="text-xs text-gray-500">Hỗ trợ .xlsx</div>
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept=".xlsx"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleSelectFile(file)
                  }
                }}
              />
            </label>
          )}

          {/* STEP 2: Preview */}
          {file && previewRows && (
            <>
              {/* FILE INFO */}
              <div className="flex items-center justify-between rounded-md border px-4 py-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[#F79009]" />
                  <div>
                    <div className="text-sm font-medium">{file.name}</div>
                    <div className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept=".xlsx,.csv"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) handleSelectFile(f)
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.value = ""
                        fileInputRef.current.click()
                      }
                    }}
                  >
                    Upload lại
                  </Button>
                </label>
              </div>

              {/* SUMMARY */}
              <div className="flex gap-3">
                <Badge>Tổng số bản ghi: {previewRows.total_record}</Badge>
                <Badge className="bg-green-100 text-green-700">
                  Hợp lệ: {previewRows.valid}
                </Badge>
                <Badge className="bg-red-100 text-red-700">
                  Không hợp lệ: {previewRows.invalid}
                </Badge>
              </div>

              {/* TABLE */}
              <div className="max-h-[360px] overflow-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Row</TableHead>
                      <TableHead>Số HĐ</TableHead>
                      <TableHead>Khách hàng</TableHead>
                      <TableHead>CCCD</TableHead>
                      <TableHead>SĐT</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>User</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewRows.rows.map((r) => (
                      <TableRow
                        key={r.row_number}
                        className={!r.is_valid ? "bg-red-50" : ""}
                      >
                        <TableCell>{r.row_number}</TableCell>
                        <TableCell>{r.so_hop_dong}</TableCell>
                        <TableCell>{r.ten_dang_nhap}</TableCell>
                        <TableCell>{r.cccd}</TableCell>
                        <TableCell>{r.sdt}</TableCell>
                        <TableCell>{r.email}</TableCell>
                        <TableCell>{r.ten_dang_nhap}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        <DialogFooter className="border-t px-6 py-4">
          <Button variant="ghost" onClick={handleClose} disabled={loading}>
            Hủy
          </Button>
          <Button
            className="bg-[#F79009] text-white hover:bg-[#e8841e]"
            onClick={handleSubmit}
            disabled={!file || loading}
          >
            {loading ? "Đang import..." : "Import"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
