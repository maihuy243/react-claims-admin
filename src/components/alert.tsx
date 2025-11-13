import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react"
import WarningIcon from "@assets/warning.svg?react"

const ICONS: any = {
  success: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-orange-500",
    bg: "bg-orange-100",
  },
  error: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
  },
  info: {
    icon: Info,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
}

export default function AlertCommon({
  open,
  onClose,
  title = "Thông báo",
  message,
  status = "warning",
  confirmText = "Đồng ý",
  cancelText = "Hủy",
  onConfirm,
}: any) {
  const Icon = ICONS[status].icon

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl p-0 overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* BODY */}
        <div className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${ICONS[status].bg}`}
            >
              {/* <Icon className={`w-10 h-10 ${ICONS[status].color}`} /> */}
              <WarningIcon />
            </div>
          </div>

          <p className="text-gray-700 text-[15px]">{message}</p>
        </div>

        {/* FOOTER */}
        <DialogFooter className="border-t px-6 py-4 flex justify-end gap-3">
          <Button variant="ghost" className="text-orange-600" onClick={onClose}>
            {cancelText}
          </Button>

          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white px-6"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
