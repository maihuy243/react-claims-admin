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

export default function AddNewAccountModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          max-w-3xl 
          w-[95%]
          p-0
          rounded-xl 
          overflow-hidden
          !max-h-[90vh]
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="px-5 md:px-6 py-4 border-b bg-white">
          <DialogTitle className="text-lg md:text-xl font-semibold text-gray-800">
            Thêm mới tài khoản
          </DialogTitle>
        </div>

        {/* BODY — scroll vùng này */}
        <div
          className="
            flex-1 
            overflow-y-auto 
            px-5 md:px-6 py-6 
            space-y-8 
            bg-white
          "
        >
          {/* ==== Thông tin khách hàng ==== */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-blue-900">
              Thông tin khách hàng
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Nhập số hợp đồng" required>
                <Input placeholder="Nhập mã" />
              </Field>

              <Field label="Tên khách hàng theo hợp đồng">
                <Input disabled value="NGUYEN VAN NAM" />
              </Field>

              <Field label="Số định danh theo hợp đồng">
                <Input disabled value="039303984" />
              </Field>
            </div>
          </div>

          {/* ==== Thông tin đăng nhập ==== */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-blue-900">
              Thông tin đăng nhập
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Field label="Số điện thoại" required>
                <Input placeholder="Nhập số điện thoại" />
              </Field>

              <Field label="Email" required>
                <Input placeholder="Nhập email" />
              </Field>

              <Field label="Tên đăng nhập" required>
                <Input placeholder="Nhập email" />
              </Field>

              <Field label="Mật khẩu" required>
                <Input placeholder="Nhập mật khẩu" />
              </Field>
            </div>
          </div>

          {/* ==== Toggles ==== */}
          <div className="space-y-6">
            <ToggleRow label="Tạo mật khẩu tự động" />
            <ToggleRow label="Yêu cầu khách hàng đổi mật khẩu ngay khi đăng nhập" />
          </div>
        </div>

        {/* FOOTER — cố định */}
        <DialogFooter
          className="
    bg-white 
    px-5 md:px-6 py-4 
    flex !flex-row !flex-nowrap items-center justify-end gap-2 
    border-t
  "
        >
          <Button
            variant="ghost"
            className="text-orange-600 font-medium"
            onClick={onClose}
          >
            Hủy
          </Button>

          <Button className="bg-[#F89422] hover:bg-[#e8841e] text-white px-6">
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ToggleRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[15px] font-medium text-gray-800">{label}</span>
      <Switch className="data-[state=checked]:bg-orange-500" />
    </div>
  )
}
