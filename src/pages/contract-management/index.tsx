import { useState, useCallback, useMemo, useEffect } from "react"
import Wrapper from "@/components/wrapper"
import ContractsTable from "./components/contracts-table"
import FilterContracts from "./components/filter"
import { useSearchHD } from "@/hooks/useSearchHD"
import { useUpdateCB } from "@/hooks/useUpdateCB"
import { PROCESSING_OFFICER } from "constant"
import { useUIStore } from "@/store/state"
import { HDItem } from "@/model"

export type TFilterLocal = {
  status: string
  officier: string
}

export const STATUS_ALL = "all"

const ContractListScreen = () => {
  const [filters, setFilters] = useState({})
  const [filtersLocal, setFiltersLocal] = useState<TFilterLocal>({
    officier: STATUS_ALL,
    status: STATUS_ALL,
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
      ...filters,
    }
  }, [filters, page])

  // API call
  const { data, isLoading, isFetching, refetch } = useSearchHD(queryParams)

  const rows = data?.data || []
  const total = data?.total_records || 0

  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (data?.page_size && nextPage > data?.page_size) return
      setPage(nextPage)
    },
    [data?.page_size],
  )

  const onUpdateOfficer = useCallback(async (id: string, officer: string) => {
    const officerResult = PROCESSING_OFFICER.find((o) => o.value === officer)
    if (!officerResult) return
    setLoading(true)
    try {
      await updateCBMutation.mutateAsync({
        so_hop_dong: id,
        ma_can_bo: officerResult.value,
        ten_can_bo: officerResult.label,
        is_contract: true,
      })
      await refetch()
    } finally {
      setLoading(false)
    }
  }, [])

  const dataViewer = useMemo(() => {
    let finalRows: HDItem[] = rows
    if (filtersLocal.officier !== STATUS_ALL) {
      finalRows = finalRows.filter(
        (s) => s.can_bo_xu_ly == filtersLocal.officier,
      )
    }

    if (filtersLocal.status !== STATUS_ALL) {
      finalRows = finalRows.filter((s) => s.trang_thai == filtersLocal.status)
    }

    return finalRows
  }, [filtersLocal.officier, filtersLocal.status, rows])

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <h1 className="mb-3 text-xl font-bold text-gray-900 md:mb-3 md:text-2xl">
            Danh sách hợp đồng
          </h1>

          <FilterContracts
            onFilterChange={handleFilterChange}
            setFiltersLocal={setFiltersLocal}
            isLoading={isLoading || isFetching}
            filtersLocal={filtersLocal}
          />

          <Wrapper>
            <ContractsTable
              data={dataViewer}
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

export default ContractListScreen
