import Wrapper from "@/components/wrapper"
import UsersTable from "./components/users-table"
import FilterContracts from "./components/filter"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useMemo, useState } from "react"
import AddNewAccountModal from "./components/add-user"
import { useDsCanBo } from "@/hooks/useDSCanBo"

export type TSearchFilter = {
  status: string
  type: string
  querySearch: string
}

const DSCanBoScreen = () => {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<TSearchFilter>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize] = useState<number>(20)

  const { data, isLoading, isFetching, refetch } = useDsCanBo({
    ...(filters?.type && { [filters.type]: filters.querySearch }),
    page: currentPage,
    page_size: pageSize,
  })

  const users = data?.data || []
  const total = data?.total_records || 0
  const total_pages = data?.total_pages || 0

  const usersFilter = useMemo(() => {
    return users
    // return users.filter((s) => {
    //   if (filters?.status == "all") return s
    //   return s.tthai == filters?.status
    // })
  }, [filters?.status, users])

  return (
    <>
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-auto">
            <div className="mb-3 flex items-center justify-between md:mb-3">
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                Danh sách cán bộ
              </h1>
              <Button
                className="bg-[#f58d05] text-white"
                size="sm"
                onClick={() => setOpen(true)}
              >
                <Plus size={18} className="mr-2" /> Thêm mới
              </Button>
            </div>

            <FilterContracts
              setFilters={setFilters}
              loading={isFetching || isLoading}
            />

            <Wrapper>
              <UsersTable
                refetch={refetch}
                total_record={total}
                users={usersFilter}
                total_pages={total_pages}
                isLoading={isFetching || isLoading}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </Wrapper>
          </main>
        </div>
      </div>

      <AddNewAccountModal onClose={() => setOpen(false)} open={open} />
    </>
  )
}

export default DSCanBoScreen
