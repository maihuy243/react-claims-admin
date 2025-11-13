import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Wrapper from "@/components/wrapper"

export default function FilterContracts() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <Wrapper
      className="
        flex flex-col 
        md:flex-row md:items-center md:justify-between 
        gap-3 md:gap-4 
        transition-all mb-4 md:py-4
      "
    >
      {/* Search section */}
      <div
        className="
          w-full 
          md:w-1/2 
          flex items-center bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden
        "
      >
        <Select defaultValue="all">
          <SelectTrigger className="w-36 border-0 border-r border-gray-200 rounded-none focus:ring-0 text-sm text-gray-600">
            <SelectValue placeholder="Tìm kiếm theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="contract">Số hợp đồng</SelectItem>
            <SelectItem value="owner">Chủ hợp đồng</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Input
            placeholder="Nhập thông tin"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-sm text-gray-700 pl-3 pr-10"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 h-full hover:bg-transparent"
          >
            <Search className="w-4 h-4 text-gray-500" />
          </Button>
        </div>
      </div>

      {/* Filter section */}
      <div
        className="
          w-full 
          md:w-auto 
          flex items-center gap-3 
        "
      >
        <Select defaultValue="all">
          <SelectTrigger className="min-w-[160px] text-sm border-gray-200">
            <SelectValue placeholder="Sự kiện: Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Sự kiện: Tất cả</SelectItem>
            <SelectItem value="health">Sức khỏe</SelectItem>
            <SelectItem value="accident">Tai nạn</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="min-w-[160px] text-sm border-gray-200">
            <SelectValue placeholder="Trạng thái: Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Trạng thái: Tất cả</SelectItem>
            <SelectItem value="pending">Chờ duyệt</SelectItem>
            <SelectItem value="approved">Đã duyệt</SelectItem>
            <SelectItem value="rejected">Từ chối</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Wrapper>
  )
}
