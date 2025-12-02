import { CMSApi } from "@/api"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth"
import { DetailBTResponse } from "@/model"
import { useUIStore } from "@/store/state"
import { delay } from "@/utils"
import TopIcon from "@assets/top.svg?react"
import { useParams } from "react-router-dom"

type Props = {
  badge?: string
  data?: DetailBTResponse
}

const HeaderDetail = ({ badge, data }: Props) => {
  const setLoading = useUIStore((s) => s.setLoading)
  const show = useUIStore((s) => s.showSuccess)
  const showError = useUIStore((s) => s.showError)
  const { user } = useAuth()
  const { id } = useParams()

  const handleNhapHSBT = async () => {
    if (!data || !id || !user) return

    setLoading(true)

    try {
      const payload = {
        ma_cb: user?.ma_cb || "",
        so_id_claim: id,
        ten_ndbh: data.nguoi_duoc_bao_hiem,
        ngay_xr: data.ngay_kham,
        so_hd: data.so_hop_dong,
        su_kien_bao_hiem: data.su_kien_bao_hiem,
        hinh_thuc_dieu_tri: data.hinh_thuc_dieu_tri,
        chan_doan: data.chan_doan,
        tien_ycbt: Number(data.so_tien_yeu_cau_boi_thuong.replace(/\D/g, "")),
      }

      const res = await CMSApi.nhapHSBT(payload)
      await delay(500)

      if (res.success) {
        show(res.message)
      } else {
        showError(res.message)
      }
    } catch (err: any) {
      showError(err.message || "Không thể nhập hồ sơ")
    }

    setLoading(false)
  }

  return (
    <div className="">
      {/* PAGE TITLE */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-semibold">Thông tin bồi thường</div>
          {badge && <StatusBadge status={badge} className="ml-3 py-2" />}
        </div>
        {!!data && (
          <Button
            className="mt-2 bg-[#F79009] text-white"
            onClick={handleNhapHSBT}
          >
            <TopIcon height={20} className="mr-2" />
            Giải quyết hồ sơ
          </Button>
        )}
      </div>
    </div>
  )
}

export default HeaderDetail
