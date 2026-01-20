import SearchField from "@/components/input-label"
import Wrapper from "../../../components/wrapper"
import { useEffect, useState } from "react"
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
  const [soHd, setSoHd] = useState("")
  const [chuHd, setChuHd] = useState("")
  const [madvi, setMadvi] = useState("")
  const [tencb, setTencb] = useState("")
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const search = params.get("search") || ""

  // 🔥 debounce emit
  useEffect(() => {
    if (!onChange) return

    const timer = setTimeout(() => {
      const payload = {
        id: idHd,
        so_hop_dong: soHd,
        ho_va_ten: chuHd,
        ma_dvi: madvi,
        ten_can_bo: tencb,
      }

      // ❗ chỉ giữ field có value
      const filteredPayload = Object.fromEntries(
        Object.entries(payload).filter(([, value]) => value?.trim() !== ""),
      )

      onChange(filteredPayload as any)
    }, DEBOUNCE_TIME)

    return () => clearTimeout(timer)
  }, [idHd, soHd, chuHd, madvi, tencb, onChange])

  useDidUpdateEffect(
    () => {
      setTencb(search)
    },
    [search],
    !search,
  )

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
          label="Số HĐ"
          placeholder="Tìm kiếm"
          value={soHd}
          onChange={setSoHd}
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
