import Header from "./Header"
import Sidebar from "./Sidebar"
import Breadcrumb from "../breadcrumb"
import { Outlet } from "react-router-dom"

export default function MainLayout({
  isCollapsed,
  setIsCollapsed,
  isMobile,
}: any) {
  return (
    <>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="flex flex-1 pt-16 overflow-hidden md:px-4 px-2">
        {/* Sidebar */}
        <aside
          className={`transition-all duration-300 mt-2 
          ${isMobile ? "w-0" : isCollapsed ? "w-16" : "w-64"}`}
        >
          <div className="h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-xl overflow-hidden">
            <Sidebar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              isMobile={isMobile}
            />
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 w-[70%] py-3 h-[calc(100vh-5rem)] md:ps-4 ps-0">
          <Breadcrumb />
          <Outlet /> {/* ⭐ Route con render ở đây */}
        </main>
      </div>
    </>
  )
}
