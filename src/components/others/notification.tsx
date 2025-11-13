import { DialogRight } from "../dialog-right"

export function NotificationDialog({ open, onOpenChange }: any) {
  return (
    <DialogRight open={open} onOpenChange={onOpenChange}>
      <div className="p-5 space-y-3">
        <h2 className="text-lg font-semibold">Thông báo</h2>

        <div className="space-y-2">
          <div className="p-3 bg-gray-50 rounded-lg border">
            🔔 Hệ thống vừa cập nhật tính năng mới.
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border">
            📄 Bạn có 2 yêu cầu bồi thường chưa xử lý.
          </div>
        </div>
      </div>
    </DialogRight>
  )
}
