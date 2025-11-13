import React from "react"
import { useLocation, Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { MENU } from "@/configs/menu"

interface BreadcrumbItem {
  label: string
  to?: string
}

const Breadcrumb: React.FC = () => {
  const location = useLocation()
  const currentPath = location.pathname

  //  Hàm tìm breadcrumb trail từ MENU (đệ quy)
  const findTrail = (
    menu: any[],
    path: string,
    trail: BreadcrumbItem[] = [],
  ): BreadcrumbItem[] | null => {
    for (const item of menu) {
      const newTrail = [...trail, { label: item.label, to: item.to }]

      // Match tuyệt đối
      if (item.to === path) return newTrail

      // Match “cha” nếu path bắt đầu bằng item.to (ví dụ: /contracts/detail)
      if (item.to && path.startsWith(item.to) && item.to !== "/") {
        return newTrail
      }

      // Nếu có children thì đệ quy
      if (item.children) {
        const found = findTrail(item.children, path, newTrail)
        if (found) return found
      }
    }
    return null
  }

  const trail = findTrail(MENU, currentPath, [
    { label: "Trang chủ", to: "/" },
  ]) || [{ label: "Trang chủ", to: "/" }]

  return (
    <nav
      aria-label="breadcrumb"
      className="text-sm text-gray-500 flex items-center flex-wrap mb-1"
    >
      {trail.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <span className="mx-2 text-gray-400 select-none">›</span>}
          {idx === trail.length - 1 ? (
            <span className="text-orange-500 font-medium">{item.label}</span>
          ) : (
            <Link
              to={item.to || "#"}
              className={cn(
                "hover:text-gray-700 transition-colors",
                !item.to && "cursor-default",
              )}
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumb
