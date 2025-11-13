import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import TopIcon from "@assets/top.svg?react"
import { TabsHeader } from "./tabs"
import { useState } from "react"

const HeaderDetail = () => {
  const [activeTab, setActiveTab] = useState("info")

  return (
    <div className="">
      {/* PAGE TITLE */}
      <div className="flex items-center justify-between">
        <div className="flex items-center ">
          <div className="text-2xl font-semibold">Thông tin bồi thường</div>
          <StatusBadge status="Đã thanh toán" className="py-2 ml-3" />
        </div>
        <Button className="mt-2 bg-[#F79009] text-white">
          <TopIcon height={20} className="mr-2" />
          Giải quyết hồ sơ
        </Button>
      </div>

      <TabsHeader active={activeTab} onChange={setActiveTab} />

      <Button className="mt-1 bg-[#fc9a9c] text-white">
        Xem hồ sơ yêu cầu bồi thường
      </Button>
    </div>
  )
}

export default HeaderDetail
