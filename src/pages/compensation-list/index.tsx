import { useState, useCallback, useMemo } from "react"
import Wrapper from "@/components/wrapper"
import ContractsTable from "./components/contracts-table"
import FilterContracts from "./components/filter"
import { PROCESSING_OFFICER } from "constant"
import { useSearchDSBT } from "@/hooks/useSearchDSBT"
import { useUpdateCB } from "@/hooks/useUpdateCB"
import { useUIStore } from "@/store/state"

const CompensationList = () => {
  const [filters, setFilters] = useState({})
  const [page, setPage] = useState(1)
  const pageSize = 20
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
      page_size: pageSize,
      ...filters,
    }
  }, [filters, page])

  // API call
  const { data, isLoading, isFetching, refetch } = useSearchDSBT(queryParams)

  const rows = data?.data || []
  const total = data?.total_records || 0

  const handlePageChange = useCallback((nextPage: number) => {
    setPage(nextPage)
  }, [])

  const onUpdateOfficer = useCallback(async (id: string, officer: string) => {
    const officerResult = PROCESSING_OFFICER.find((o) => o.value === officer)
    if (!officerResult) return
    try {
      setLoading(true)
      updateCBMutation.mutateAsync({
        so_hop_dong: id,
        ma_can_bo: officerResult.value,
        ten_can_bo: officerResult.label,
      })
      await refetch()
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <h1 className="mb-3 text-xl font-bold text-gray-900 md:mb-3 md:text-2xl">
            Danh sách bồi thường
          </h1>

          <FilterContracts
            onFilterChange={handleFilterChange}
            isLoading={isLoading || isFetching}
          />

          <Wrapper>
            <ContractsTable
              data={rows}
              total={total}
              page={page}
              totalPage={data?.total_pages || 0}
              loading={isLoading || isFetching}
              onPageChange={handlePageChange}
              onUpdateOfficer={onUpdateOfficer}
            />
          </Wrapper>
        </main>
      </div>
    </div>
  )
}

export default CompensationList
