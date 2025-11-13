import { Button } from "@/components/ui/button"
import { DialogRight } from "../dialog-right"

export function UserInfoDialog({
  open,
  onOpenChange,
  onChangePassword,
  onLogout,
}: any) {
  return (
    <DialogRight open={open} onOpenChange={onOpenChange}>
      <div className="p-6 text-center space-y-4">
        <h2 className="text-lg font-semibold text-blue-900">
          Thông tin cá nhân
        </h2>
        <p className="text-sm text-gray-600">
          Bùi Đặng Quỳnh Trang - MCB: 0847788383
        </p>

        <img
          src="https://github.com/shadcn.png"
          className="w-20 h-20 rounded-full mx-auto object-cover"
        />

        <div className="border-t pt-4 space-y-3">
          <Button
            className="w-full bg-orange-500 text-white"
            onClick={onChangePassword}
          >
            Đổi mật khẩu
          </Button>
          <Button variant="outline" className="w-full" onClick={onLogout}>
            Đăng xuất
          </Button>
        </div>
      </div>
    </DialogRight>
  )
}
