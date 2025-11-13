
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button>New Action</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border p-4 shadow-sm">
          <div className="text-sm text-muted-foreground">Open Claims</div>
          <div className="mt-2 text-3xl font-semibold">23</div>
        </div>
        <div className="rounded-2xl border p-4 shadow-sm">
          <div className="text-sm text-muted-foreground">Overdue</div>
          <div className="mt-2 text-3xl font-semibold">5</div>
        </div>
        <div className="rounded-2xl border p-4 shadow-sm">
          <div className="text-sm text-muted-foreground">Resolved this week</div>
          <div className="mt-2 text-3xl font-semibold">12</div>
        </div>
      </div>
      <div className="rounded-2xl border p-4">
        <div className="mb-2 text-sm text-muted-foreground">Status Legend</div>
        <div className="flex gap-2">
          <Badge className="bg-secondary">Khởi tạo</Badge>
          <Badge className="bg-secondary">Đã tiếp nhận</Badge>
          <Badge className="bg-secondary">Đang giải quyết</Badge>
          <Badge className="bg-secondary">Đang trình</Badge>
          <Badge className="bg-secondary">Đã duyệt</Badge>
          <Badge className="bg-secondary">Từ chối</Badge>
        </div>
      </div>
    </div>
  )
}
