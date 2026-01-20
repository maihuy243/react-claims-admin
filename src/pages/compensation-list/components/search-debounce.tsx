import SearchField from "@/components/input-label"
import Wrapper from "../../../components/wrapper"
import { useEffect, useRef, useState } from "react"
import { useDidUpdateEffect } from "@/hooks/custom/useDidUpdate"
import { useLocation } from "react-router-dom"

type SearchValue = {
  idHd: string
  soHd: string
  chuHd: string
  madvi: string
  tencb: string
}

type Props = {
  onChange?: (value: SearchValue) => void
}

const DEBOUNCE_TIME = 1500

const SearchDebounce = ({ onChange }: Props) => {
  const [idHd, setIdHd] = useState("")
  const [cccdNguoiTao, setCccdNguoiTao] = useState("")
  const [chuHd, setChuHd] = useState("")
  const [madvi, setMadvi] = useState("")
  const [tencb, setTencb] = useState("")
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const search = params.get("search") || ""
  const firstLoad = useRef(false)

  // 🔥 debounce emit
  useEffect(() => {
    if (!onChange) return

    const timer = setTimeout(() => {
      const payload = {
        id: idHd,
        cccd_nguoi_tao: cccdNguoiTao,
        ho_va_ten: chuHd,
        ma_dvi: madvi,
        ten_can_bo: tencb,
      }

      // ❗ chỉ giữ field có value
      const filteredPayload = Object.fromEntries(
        Object.entries(payload).filter(([, value]) => value?.trim() !== ""),
      )

      if(firstLoad.current) {
        firstLoad.current = false
        return
      }
      
      onChange(filteredPayload as any)
    }, DEBOUNCE_TIME)

    return () => clearTimeout(timer)
  }, [idHd, cccdNguoiTao, chuHd, madvi, tencb, onChange])

  useEffect(() => {
    firstLoad.current = true
    setTencb(search)
    return () => {
      firstLoad.current = false
    }
  },[search])

  return (
    <Wrapper className="mb-4">
      <div className="grid grid-cols-1 gap-4 py-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <SearchField
          label="ID HĐ"
          placeholder="Tìm kiếm"
          value={idHd}
          onChange={setIdHd}
        />

        <SearchField
          label="CCCD Người tạo"
          placeholder="Tìm kiếm"
          value={cccdNguoiTao}
          onChange={setCccdNguoiTao}
        />

        <SearchField
          label="Chủ HĐ"
          placeholder="Tìm kiếm"
          value={chuHd}
          onChange={setChuHd}
        />

        <SearchField
          label="Mã ĐV"
          placeholder="Tìm kiếm"
          value={madvi}
          onChange={setMadvi}
        />

        <SearchField
          label="Tên CB"
          placeholder="Tìm kiếm"
          value={tencb}
          onChange={setTencb}
        />
      </div>
    </Wrapper>
  )
}

export default SearchDebounce
