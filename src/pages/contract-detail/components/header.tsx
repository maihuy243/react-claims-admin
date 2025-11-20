import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import TopIcon from "@assets/top.svg?react"

type Props = {
  badge?: string
}

const HeaderDetail = ({ badge }: Props) => {
  return (
    <div className="w-full">
      <div className="
        flex flex-col gap-3 
        md:flex-row md:items-center md:justify-between
      ">
        {/* LEFT */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="text-xl font-semibold md:text-2xl">
            Thông tin bồi thường
          </div>

          {badge && (
            <StatusBadge 
              status={badge} 
              className="w-fit md:ml-3 py-2"
            />
          )}
        </div>

        {/* RIGHT */}
        <Button className="bg-[#F79009] text-white w-full md:w-auto">
          <TopIcon height={20} className="mr-2" />
          Giải quyết hồ sơ
        </Button>
      </div>
    </div>
  )
}

export default HeaderDetail
