import { useEffect, useRef, useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useLocation } from "react-router-dom"

import Wrapper from "../../../components/wrapper"
import SearchField from "@/components/input-label"
import DateSearchField from "@/components/date-picker"

type SearchValue = {
  id?: string
  ngay_tao?: string
  ma_dvi?: string
  cccd_nguoi_tao?: string
  ten_nguoi_tao?: string
  ho_va_ten?: string
  so_giay_to?: string
  so_hop_dong?: string
}

type Props = {
  onChange?: (value: SearchValue) => void
}

const DEBOUNCE_TIME = 1500

const SearchDebounce = ({ onChange }: Props) => {
  const [id, setId] = useState("")
  const [ngayTao, setNgayTao] = useState<Date | undefined>()
  const [maDvi, setMaDvi] = useState("")
  const [cccdNguoiTao, setCccdNguoiTao] = useState("")
  const [tenNguoiTao, setTenNguoiTao] = useState("")
  const [hoVaTen, setHoVaTen] = useState("")
  const [soGiayTo, setSoGiayTo] = useState("")
  const [soHopDong, setSoHopDong] = useState("")
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const search = params.get("search") || ""
  const firstLoad = useRef(true)

  // 🔥 debounce emit
  useEffect(() => {
    if (!onChange) return

    const timer = setTimeout(() => {
      if (firstLoad.current) {
        firstLoad.current = false
        return
      }

      const payload: SearchValue = {
        id,
        ngay_tao: ngayTao ? format(ngayTao, "yyyy-MM-dd") : undefined,
        ma_dvi: maDvi,
        cccd_nguoi_tao: cccdNguoiTao,
        ten_nguoi_tao: tenNguoiTao,
        ho_va_ten: hoVaTen,
        so_giay_to: soGiayTo,
        so_hop_dong: soHopDong,
      }

      const filteredPayload = Object.fromEntries(
        Object.entries(payload).filter(
          ([, value]) => value && value.toString().trim() !== "",
        ),
      )

      onChange(filteredPayload)
    }, DEBOUNCE_TIME)

    return () => clearTimeout(timer)
  }, [
    id,
    ngayTao,
    maDvi,
    cccdNguoiTao,
    tenNguoiTao,
    hoVaTen,
    soGiayTo,
    soHopDong,
    onChange,
  ])

  useEffect(() => {
    if (!search) return

    setTenNguoiTao(search)
    firstLoad.current = true
  }, [search])

  return (
    <Wrapper className="mb-4">
      <div className="grid grid-cols-1 gap-4 py-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SearchField label="ID" value={id} onChange={setId} />
        <DateSearchField
          label="Ngày tạo"
          value={ngayTao}
          onChange={setNgayTao}
        />
        <SearchField label="Mã đơn vị" value={maDvi} onChange={setMaDvi} />
        <SearchField
          label="CCCD người tạo"
          value={cccdNguoiTao}
          onChange={setCccdNguoiTao}
        />
        <SearchField
          label="Tên người tạo"
          value={tenNguoiTao}
          onChange={setTenNguoiTao}
        />
        <SearchField
          label="Người được bảo hiểm"
          value={hoVaTen}
          onChange={setHoVaTen}
        />
        <SearchField
          label="Số giấy tờ"
          value={soGiayTo}
          onChange={setSoGiayTo}
        />
        <SearchField
          label="Số hợp đồng"
          value={soHopDong}
          onChange={setSoHopDong}
        />
      </div>
    </Wrapper>
  )
}

export default SearchDebounce
