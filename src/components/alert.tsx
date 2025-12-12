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

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  message: string
  status?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
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
}: Props) {
  const Icon = ICONS[status].icon

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md overflow-hidden rounded-xl p-0">
        {/* HEADER */}
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* BODY */}
        <div className="space-y-4 p-6 text-center">
          <div className="flex justify-center">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full ${ICONS[status].bg}`}
            >
              {/* <Icon className={`w-10 h-10 ${ICONS[status].color}`} /> */}
              <WarningIcon />
            </div>
          </div>

          <p className="text-[15px] text-gray-700">{message}</p>
        </div>

        {/* FOOTER */}
        <DialogFooter className="flex justify-end gap-3 border-t px-6 py-4">
          <Button variant="ghost" className="text-orange-600" onClick={onClose}>
            {cancelText}
          </Button>

          <Button
            className="bg-orange-500 px-6 text-white hover:bg-orange-600"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
