import { Button } from "@/components/ui/button"
import HeaderDetail from "./components/header"
import { useParams } from "react-router-dom"
import { useDetailBT } from "@/hooks/useClaimDetail"
import ContractNotFound from "./components/invalid-contract"
import { TabsHeader } from "./components/tabs"
import { useState } from "react"
import Info from "./components/info"
import TabContent from "./components/tab-content"
import Wrapper from "@/components/wrapper"
import HistoryTable from "./components/history"

export default function ClaimDetail() {
  const [activeTab, setActiveTab] = useState("info")

  const { id } = useParams()
  const { data } = useDetailBT(id!)

  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return <Info data={data} />
      case "account":
        return (
          <Wrapper className="flex h-full items-center justify-center">
            <div>Tài khoản ứng dụng</div>
          </Wrapper>
        )
      case "contact":
        return (
          <Wrapper className="flex h-full items-center justify-center">
            <div>Liên hệ</div>
          </Wrapper>
        )
      case "contract":
        return (
          <Wrapper className="flex h-full items-center justify-center">
            <div>Hợp đồng</div>
          </Wrapper>
        )
      case "history":
        return <HistoryTable />
      default:
        return null
    }
  }

  if (!id) return <ContractNotFound />

  return (
    <div className="relative flex h-auto flex-col border md:h-[calc(100vh-125px)]">
      <HeaderDetail badge={data?.trang_thai} data={data} />

      <TabsHeader active={activeTab} onChange={setActiveTab} />

      {/* ==== MAIN LAYOUT ==== */}
      <div className="hide-scrollbar flex-1 overflow-y-auto">
        <TabContent active={activeTab}>{renderContent()}</TabContent>
      </div>
    </div>
  )
}
