import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import Wrapper from "@/components/wrapper"

export default function ContractNotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex w-full flex-1">
      <Wrapper className="w-full">
        <div className="flex h-screen flex-col items-center gap-4 p-10">
          <AlertTriangle className="h-14 w-14 text-red-500" />

          <h2 className="text-2xl font-bold text-gray-800">
            Không tìm thấy hồ sơ
          </h2>

          <p className="max-w-xs text-center text-gray-600">
            Có vẻ như bạn đang truy cập vào trang chi tiết hồ sơ nhưng không có
            mã ID hợp lệ.
          </p>

          <div className="mt-4 flex gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Quay lại
            </Button>
            <Button onClick={() => navigate("/claims")}>
              Về danh sách hồ sơ
            </Button>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}
