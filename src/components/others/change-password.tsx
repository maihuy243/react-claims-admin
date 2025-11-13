import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export function ChangePasswordDialog({ open, onClose }: any) {
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl p-0 overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Đổi mật khẩu
          </DialogTitle>
        </DialogHeader>

        {/* BODY */}
        <div className="px-6 py-6 space-y-5">
          <div>
            <label className="text-[14px] text-gray-700 font-medium">
              Mật khẩu hiện tại <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <Input
                type={showOld ? "text" : "password"}
                placeholder="Nhập mật khẩu hiện tại"
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowOld(!showOld)}
              >
                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-[14px] text-gray-700 font-medium">
              Mật khẩu mới <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <Input
                type={showNew ? "text" : "password"}
                placeholder="Nhập mật khẩu mới"
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter className="border-t px-6 py-4 flex justify-end gap-3">
          <Button variant="ghost" className="text-orange-600" onClick={onClose}>
            Hủy
          </Button>

          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
