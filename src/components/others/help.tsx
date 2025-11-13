import { DialogRight } from "../dialog-right"

export function HelpDialog({ open, onOpenChange }: any) {
  return (
    <DialogRight open={open} onOpenChange={onOpenChange}>
      <div className="p-5 space-y-4">
        <h2 className="text-lg font-semibold">Trợ giúp</h2>

        <p className="text-sm text-gray-600">
          Nếu bạn cần hỗ trợ, vui lòng liên hệ:
        </p>

        <ul className="text-sm text-gray-700 space-y-1">
          <li>📞 Hotline: 1900 9999</li>
          <li>✉️ Email: support@bsh.com</li>
        </ul>
      </div>
    </DialogRight>
  )
}
