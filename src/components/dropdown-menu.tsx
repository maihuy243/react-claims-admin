import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Info, Key, Lock, LockOpen, RotateCcw } from "lucide-react"

type Props = {
  status: string
  onClick: () => void
}

export function DropdownTacVu({ status, onClick }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="outline-none focus:border-none">
          ...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 rounded-md border bg-white p-1 shadow-md"
        align="start"
      >
        {/* <DropdownMenuItem
          className="flex items-center gap-3 rounded px-3 py-2 text-sm"
          onClick={onClick}
        >
          <Info className="h-4 w-4 text-gray-500" />
          <span>Thông tin khách hàng</span>
        </DropdownMenuItem> */}

        {status === "Đang hoạt động" && (
          <DropdownMenuItem
            className="flex items-center gap-3 rounded px-3 py-2 text-sm"
            onClick={onClick}
          >
            <Lock className="h-4 w-4 text-gray-500" />
            <span>Khóa tài khoản</span>
          </DropdownMenuItem>
        )}

        {status === "Đang khóa" && (
          <DropdownMenuItem
            className="flex items-center gap-3 rounded px-3 py-2 text-sm"
            onClick={onClick}
          >
            <LockOpen className="h-4 w-4 text-gray-500" />
            <span>Mở khóa tài khoản</span>
          </DropdownMenuItem>
        )}

        {/* <DropdownMenuItem className="flex items-center gap-3 rounded px-3 py-2 text-sm">
          <Key className="h-4 w-4 -rotate-90 scale-x-[-1] text-gray-500" />
          <span>Reset mật khẩu</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 rounded px-3 py-2 text-sm">
          <RotateCcw className="h-4 w-4 text-gray-500" />
          <span>Đặt lại mã PIN</span>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
