import Wrapper from "@/components/wrapper"
import ContractsTable from "./components/users-table"
import FilterContracts from "./components/filter"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import AddNewAccountModal from "./components/add-user"

const UsersScreen = () => {
  const [open, setOpen] = useState<boolean>(false)

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return (
    <>
      <div className="flex flex-1">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content Area */}
          <main className="flex-1 overflow-auto">
            <div className="flex items-center justify-between mb-3 md:mb-3 ">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 ">
                Danh sách người dùng
              </h1>
              <Button
                className="bg-[#f58d05] text-white"
                size="sm"
                onClick={openModal}
              >
                <Plus size={18} className="mr-2" /> Thêm mới
              </Button>
            </div>

            {/* Filters */}
            <FilterContracts />

            {/* Table */}
            <Wrapper>
              <ContractsTable />
            </Wrapper>
          </main>
        </div>
      </div>
      <AddNewAccountModal onClose={closeModal} open={open} />
    </>
  )
}

export default UsersScreen
