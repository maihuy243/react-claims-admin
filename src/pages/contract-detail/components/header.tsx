import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import TopIcon from "@assets/top.svg?react"

type Props = {
  badge?: string
}

const HeaderDetail = ({ badge }: Props) => {
  console.log(badge)

  return (
    <div className="">
      {/* PAGE TITLE */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-semibold">Thông tin bồi thường</div>
          {badge && <StatusBadge status={badge} className="ml-3 py-2" />}
        </div>
        <Button className="mt-2 bg-[#F79009] text-white">
          <TopIcon height={20} className="mr-2" />
          Giải quyết hồ sơ
        </Button>
      </div>
    </div>
  )
}

export default HeaderDetail
