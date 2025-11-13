import Wrapper from "@/components/wrapper";
import ContractsTable from "./components/contracts-table";
import FilterContracts from "./components/filter";

const ContractListScreen = () => {
  return (
    <div className="flex flex-1">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-3">
            Danh sách hợp đồng
          </h1>

          {/* Filters */}
          <FilterContracts />

          {/* Table */}
          <Wrapper>
            <ContractsTable />
          </Wrapper>
        </main>
      </div>
    </div>
  );
};

export default ContractListScreen;
