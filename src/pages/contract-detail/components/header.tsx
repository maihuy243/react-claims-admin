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
  status?: string
  data?: DetailBTResponse
}

const HeaderDetail = ({ status, data }: Props) => {
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
        ma_dvi: user?.ma_dvi
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
    <div className="w-full">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* LEFT */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="text-xl font-semibold md:text-2xl">
            Thông tin bồi thường
          </div>

          {status && (
            <StatusBadge status={status} className="w-fit py-2 md:ml-3" />
          )}
        </div>
        {!!status && status?.toLowerCase().trim() == "đã tiếp nhận" && (
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
