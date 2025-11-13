import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <h1 className="text-6xl font-bold text-orange-500">404</h1>
      <p className="text-gray-600 mt-3 text-center text-lg">
        Trang bạn tìm không tồn tại hoặc đã bị di chuyển.
      </p>

      <Button asChild className="mt-6 bg-orange-500 hover:bg-orange-600">
        <Link to="/">Về trang chủ</Link>
      </Button>
    </div>
  )
}
