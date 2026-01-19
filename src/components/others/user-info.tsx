import { Button } from "@/components/ui/button"
import { CustomFloatingPanel } from "../custom-floating-modal"
import { useAuth } from "@/context/auth"

export function UserInfoDialog({
  open,
  onClose,
  onChangePassword,
  onLogout,
}: any) {
  
  const { user } = useAuth()

  return (
    <CustomFloatingPanel open={open} onClose={onClose}>
      <div className="p-6 text-center space-y-4">
        <h2 className="text-lg font-semibold text-blue-900">
          Thông tin cá nhân
        </h2>
        <p className="text-sm text-gray-600">
          {user?.user_name} - MCB: {user?.ma_cb}
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
    </CustomFloatingPanel>
  )
}
