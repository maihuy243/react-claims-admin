import { useState, useCallback, useMemo, useEffect } from "react"
import Wrapper from "@/components/wrapper"
import ContractsTable from "./components/contracts-table"
import FilterContracts from "./components/filter"
import { PROCESSING_OFFICER } from "constant"
import { useSearchDSBT } from "@/hooks/useSearchDSBT"
import { useUpdateCB } from "@/hooks/useUpdateCB"
import { useUIStore } from "@/store/state"
import { HoSoBoiThuong } from "@/model"
import SearchDebounce from "./components/search-debounce"
import { useLocation } from "react-router-dom"

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))
export const STATUS_ALL = "all"


export type TFilterLocalDSBT = {
  status: string
  event: string
  priority: string
}
const CompensationList = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const search = params.get("search") || ""

  const [filters, setFilters] = useState({})
  const [query, setQuery] = useState<any>({})
  const [filtersLocal, setFiltersLocal] = useState<TFilterLocalDSBT>({
    event: STATUS_ALL,
    status: STATUS_ALL,
    priority: "1"
  })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<string>("20")

  const updateCBMutation = useUpdateCB()
  const setLoading = useUIStore((s) => s.setLoading)

  // Filter change → reset page về 1
  const handleFilterChange = useCallback((params: any) => {
    setFilters(params)
    setPage(1)
  }, [])
  
  // Query params stable
  const queryParams = useMemo(() => {
    return {
      page,
      page_size: +pageSize,
      ...query,
      ...filters,
      uu_tien: +filtersLocal.priority,
      ...(search && !query?.ten_nguoi_tao && { ten_can_bo: search }),
      // Filter
      ...(filtersLocal.status !== STATUS_ALL && {
        trang_thai: filtersLocal.status,
      }),
      ...(filtersLocal.event !== STATUS_ALL && { su_kien: filtersLocal.event }),
    }
  }, [filters, page, filtersLocal, pageSize, query, search])

  // API call
  const { data, isLoading, isFetching, refetch } = useSearchDSBT(queryParams)

  const rows = data?.data || []
  const total = data?.total_records || 0

  const onChangeQuery = useCallback((value: any) => {
    setQuery(value)
  }, [])

  const handlePageChange = useCallback((nextPage: number) => {
    setPage(nextPage)
  }, [])

  const onUpdateOfficer = useCallback(async (id: string, officer: string) => {
    const officerResult = PROCESSING_OFFICER.find((o) => o.value === officer)
    if (!officerResult) return
    try {
      setLoading(true)
      await updateCBMutation.mutateAsync({
        so_id: id,
        ma_can_bo: officerResult.value,
        ten_can_bo: officerResult.label,
        is_contract: false,
      })
      await delay(1000)
      await refetch()
    } finally {
      setLoading(false)
    }
  }, [])

  const dataViewer = useMemo(() => {
    let finalRows: HoSoBoiThuong[] = rows

    // Filter local
    if (filtersLocal.event !== STATUS_ALL) {
      finalRows = finalRows.filter((s) => s.su_kien == filtersLocal.event)
    }

    if (filtersLocal.status !== STATUS_ALL) {
      finalRows = finalRows.filter((s) => s.trang_thai == filtersLocal.status)
    }

    return finalRows
  }, [filtersLocal.event, filtersLocal.status, rows])

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <h1 className="mb-3 text-xl font-bold text-gray-900 md:mb-3 md:text-2xl">
            Danh sách bồi thường
          </h1>

          <SearchDebounce onChange={onChangeQuery} />

          <FilterContracts
            onFilterChange={handleFilterChange}
            isLoading={isLoading || isFetching}
            setFiltersLocal={setFiltersLocal}
            filtersLocal={filtersLocal}
          />

          <Wrapper>
            <ContractsTable
              // data={dataViewer} //Filter local
              data={rows}
              total={total}
              page={page}
              totalPage={data?.total_pages || 0}
              loading={isLoading || isFetching}
              onPageChange={handlePageChange}
              onUpdateOfficer={onUpdateOfficer}
              setPageSize={setPageSize}
              pageSize={pageSize}
            />
          </Wrapper>
        </main>
      </div>
    </div>
  )
}

export default CompensationList
