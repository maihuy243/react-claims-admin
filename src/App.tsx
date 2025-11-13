import { Route, Routes, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"

import LoginPage from "./auth"
import NotFoundPage from "./auth/not-found"
import ProtectedRoute from "./routes/ProtectedRoute"

import Dashboard from "./pages/Dashboard"
import ClaimDetail from "./pages/contract-detail"
import ContractListScreen from "./pages/contract-management"
import UsersScreen from "./pages/users"
import MainLayout from "./components/layout/main"

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isMobile) setIsCollapsed(false)
  }, [isMobile])

  return (
    <div className="bg-[#eeeeee] h-screen flex flex-col overflow-hidden">
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* PROTECTED ROUTE (bao tất cả trang) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isMobile={isMobile}
              />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="contract-detail" element={<ClaimDetail />} />
          <Route path="contracts" element={<ContractListScreen />} />
          <Route path="users" element={<UsersScreen />} />
        </Route>

        {/* NOT FOUND */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
