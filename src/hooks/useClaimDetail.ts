import { CMSApi } from "@/api"
import { DetailBTResponse } from "@/model"
import { useUIStore } from "@/store/state"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"

interface UseDetailBTOptions {
  isCached?: boolean
}

export function useDetailBT(id: string, options?: UseDetailBTOptions) {
  const isCached = options?.isCached ?? false
  const setLoading = useUIStore((s) => s.setLoading)
  const showSuccess = useUIStore((s) => s.showSuccess)
  const showError = useUIStore((s) => s.showError)
  const [data, setData] = useState<DetailBTResponse>()

  // Prevent toast spam
  const firstSuccess = useRef(false)

  // ===================== CASE 1: Cached =====================
  const query = useQuery({
    queryKey: ["detail-bt", id],
    queryFn: async () => {
      const res = await CMSApi.detailBT({ id })
      return res ?? null
    },
    enabled: isCached && !!id,
  })

  // sync loading from query → zustand
  useEffect(() => {
    if (!isCached) return

    setLoading(query.isLoading)

    // success
    if (query.isSuccess && query.data && !firstSuccess.current) {
      firstSuccess.current = true
      showSuccess("Tải hồ sơ thành công!")
    }

    // error
    if (query.isError) {
      showError("Không thể tải hồ sơ")
    }
  }, [query.isLoading, query.isSuccess, query.isError])

  // ===================== CASE 2: Non-cached (manual fetch) =====================

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await CMSApi.detailBT({ id })
      setData(res)
      showSuccess(res?.message || "Tải hồ sơ thành công!")
      return res
    } catch (err) {
      showError(JSON.stringify(err) || "Không thể tải hồ sơ")
    } finally {
      setLoading(false)
      firstSuccess.current = false
    }
  }

  useEffect(() => {
    if (isCached || !id) return

    if (firstSuccess.current) return

    firstSuccess.current = true

    fetchData()
  }, [id, isCached])

  return {
    data: isCached ? query.data : data,
    reflect: fetchData,
  }
}
