import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Field } from "@/components/field"
import { FormEventHandler, useEffect, useState } from "react"
import { CMSApi } from "@/api"
import { useUIStore } from "@/store/state"
import { useShallow } from "zustand/shallow"
import { createUserSchema } from "@/schema/create-user"
import { queryClient } from "@/context/react-query"
import { generateRandomPassword } from "@/utils"

export default function AddNewAccountModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [soHopDong, setSoHopDong] = useState("")
  const [tenKH, setTenKH] = useState("")
  const [cccd, setCccd] = useState("")
  const [sdt, setSdt] = useState("")
  const [requireChange, setRequireChange] = useState<boolean>(false)
  const [autoPass, setAutoPass] = useState<boolean>(false)
  const [email, setEmail] = useState("")
  const [tenDangNhap, setTenDangNhap] = useState("")
  const [matKhau, setMatKhau] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { err, success, setLoading, loading } = useUIStore(
    useShallow((s) => ({
      err: s.showError,
      success: s.showSuccess,
      setLoading: s.setLoading,
      loading: s.loading,
    })),
  )

  const resetState = () => {
    setSoHopDong("")
    setTenKH("")
    setCccd("")
    setSdt("")
    setEmail("")
    setTenDangNhap("")
    setMatKhau("")
    setErrors({})
    setRequireChange(false)
    setAutoPass(false)
  }

  const handleSubmit = async () => {
    const payload = {
      so_hop_dong: soHopDong,
      ten_kh: tenKH,
      cccd,
      sdt,
      email,
      ten_dang_nhap: tenDangNhap,
      b_mat_khau: matKhau,
      require_change: Number(requireChange),
    }

    // VALIDATE
    const result = createUserSchema.safeParse(payload)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        const field = err.path[0]
        fieldErrors[field as string] = err.message
      })

      setErrors(fieldErrors)
      return
    }

    try {
      setErrors({})
      setLoading(true)

      const res = await CMSApi.createUser(payload)
      if (!res.success) {
        err(res.message)
        return
      }

      success(res.message)
      resetState()

      // Reflect
      queryClient.invalidateQueries({
        queryKey: ["users"],
      })
      onClose()
    } finally {
      setLoading(false)
    }
  }

  const handleRandomPassword = () => {
    const newPass = generateRandomPassword()
    setMatKhau(newPass)
  }

  const onToggleRandomPass = (e: boolean) => {
    setAutoPass(e)
    if (e) {
      handleRandomPassword()
      return
    }
    setMatKhau("")
  }

  useEffect(() => {
    resetState()
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex !max-h-[90vh] w-[95%] max-w-3xl flex-col overflow-hidden rounded-xl p-0">
        {/* HEADER */}
        <div className="border-b bg-white px-5 py-4 md:px-6">
          <DialogTitle className="text-lg font-semibold text-gray-800 md:text-xl">
            Thêm mới tài khoản
          </DialogTitle>
        </div>

        {/* BODY — scroll vùng này */}
        <div className="flex-1 space-y-8 overflow-y-auto bg-white px-5 py-6 md:px-6">
          {/* ==== Thông tin khách hàng ==== */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Thông tin khách hàng</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Field label="Nhập số hợp đồng" required>
                <Input
                  placeholder="Nhập mã"
                  value={soHopDong}
                  onChange={(e) => setSoHopDong(e.target.value)}
                  className={
                    errors.so_hop_dong
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.so_hop_dong && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.so_hop_dong}
                  </p>
                )}
              </Field>

              <Field label="Tên khách hàng theo hợp đồng">
                <Input
                  placeholder="Tên khách hàng"
                  value={tenKH}
                  onChange={(e) => setTenKH(e.target.value)}
                />
                {errors.ten_kh && (
                  <p className="mt-1 text-xs text-red-500">{errors.ten_kh}</p>
                )}
              </Field>

              <Field label="Số định danh theo hợp đồng">
                <Input
                  placeholder="CCCD"
                  value={cccd}
                  onChange={(e) => setCccd(e.target.value)}
                />
                {errors.cccd && (
                  <p className="mt-1 text-xs text-red-500">{errors.cccd}</p>
                )}
              </Field>
            </div>
          </div>

          {/* ==== Thông tin đăng nhập ==== */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Thông tin đăng nhập</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <Field label="Số điện thoại" required>
                <Input
                  placeholder="Nhập số điện thoại"
                  value={sdt}
                  onChange={(e) => setSdt(e.target.value)}
                  className={
                    errors.sdt
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.sdt && (
                  <p className="mt-1 text-xs text-red-500">{errors.sdt}</p>
                )}
              </Field>

              <Field label="Email" required>
                <Input
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </Field>

              <Field label="Tên đăng nhập" required>
                <Input
                  placeholder="Tên đăng nhập"
                  value={tenDangNhap}
                  onChange={(e) => setTenDangNhap(e.target.value)}
                  className={
                    errors.ten_dang_nhap
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.ten_dang_nhap && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.ten_dang_nhap}
                  </p>
                )}
              </Field>

              <Field label="Mật khẩu" required>
                <Input
                  placeholder="Nhập mật khẩu"
                  value={matKhau}
                  onChange={(e) => setMatKhau(e.target.value)}
                  className={
                    errors.b_mat_khau
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.b_mat_khau && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.b_mat_khau}
                  </p>
                )}
              </Field>
            </div>
          </div>
          <div className="space-y-6">
            <ToggleRow
              label="Tạo mật khẩu tự động"
              value={autoPass}
              onChange={onToggleRandomPass}
            />
            <ToggleRow
              label="Yêu cầu khách hàng đổi mật khẩu ngay khi đăng nhập"
              value={requireChange}
              onChange={setRequireChange}
            />
          </div>
        </div>

        {/* FOOTER — cố định */}
        <DialogFooter className="flex !flex-row !flex-nowrap items-center justify-end gap-2 border-t bg-white px-5 py-4 md:px-6">
          <Button
            variant="ghost"
            className="font-medium text-orange-600"
            onClick={onClose}
            disabled={loading}
          >
            Hủy
          </Button>

          <Button
            className="bg-[#F89422] px-6 text-white hover:bg-[#e8841e]"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ToggleRow({
  label,
  onChange,
  value,
}: {
  label: string
  onChange?: (e: boolean) => void | undefined
  value?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[15px] font-medium text-gray-800">{label}</span>
      <Switch
        checked={value}
        className="data-[state=checked]:bg-orange-500"
        onCheckedChange={onChange}
      />
    </div>
  )
}
