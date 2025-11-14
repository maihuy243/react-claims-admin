import { useState, useCallback, useMemo } from "react"
import Wrapper from "@/components/wrapper"
import ContractsTable from "./components/contracts-table"
import FilterContracts from "./components/filter"
import { useSearchHD } from "@/hooks/useSearchHD"
import { useUpdateCB } from "@/hooks/useUpdateCB"
import { PROCESSING_OFFICER } from "constant"

const ContractListScreen = () => {
  const [filters, setFilters] = useState({})
  const [page, setPage] = useState(1)
  const pageSize = 20
  const updateCBMutation = useUpdateCB()

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
  const { data, isLoading, isFetching } = useSearchHD(queryParams)

  const rows = data?.data || []
  const total = data?.total_records || 0

  const handlePageChange = useCallback((nextPage: number) => {
    setPage(nextPage)
  }, [])

  const onUpdateOfficer = useCallback((id: string, officer: string) => {
    const officerResult = PROCESSING_OFFICER.find((o) => o.value === officer)
    if (!officerResult) return
    updateCBMutation.mutate({
      so_hop_dong: id,
      ma_can_bo: officerResult.value,
      ten_can_bo: officerResult.label,
    })
  }, [])

  return (
    <div className="flex flex-1">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-3">
            Danh sách hợp đồng
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
              pageSize={pageSize}
              loading={isLoading}
              onPageChange={handlePageChange}
              onUpdateOfficer={onUpdateOfficer}
            />
          </Wrapper>
        </main>
      </div>
    </div>
  )
}

export default ContractListScreen
