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
  reflect: () => Promise<DetailBTResponse | undefined>
}

const HeaderDetail = ({ status, data, reflect }: Props) => {
  const setLoading = useUIStore((s) => s.setLoading)
  const show = useUIStore((s) => s.showSuccess)
  const showError = useUIStore((s) => s.showError)
  const { user } = useAuth()
  const { id } = useParams()

  const handleNhapHSBT = async () => {
    if (!data || !id || !user) return
    try {
      setLoading(true)
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
        ma_dvi: user?.ma_dvi,
      }

      const res = await CMSApi.nhapHSBT(payload)
      await delay(500)

      if (res.success) {
        show(res.message)
        await CMSApi.sendmail({
          mail_type: "BT",
          so_id: id,
          so_ho_so: data.so_hs,
          so_hop_dong: data.so_hop_dong,
          ten_chu_hop_dong: data.chu_hop_dong,
          ngay_nhan_ho_so: data.ngay_nh,
          ten_ndbh: data.nguoi_duoc_bao_hiem,
          to_email: data.email,
          chan_doan: data.chan_doan,
          danh_sach_chung_tu: data.danh_sach_anh.map((s, i) => ({
            noi_dung_bo_sung: s.ghi_chu,
            stt: i,
            ten_chung_tu: s.loai_giay_to,
          })),
          ngay_kham: data.ngay_kham,
          so_tien_yeu_cau: data.so_tien_yeu_cau_boi_thuong,
        })

        await reflect()
      } else {
        showError(res.message)
      }
    } catch (err: any) {
      showError(err.message || "Không thể nhập hồ sơ")
    } finally{
      setLoading(false)
    }
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
