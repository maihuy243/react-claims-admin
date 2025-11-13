import { ChevronDown, Menu } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import clsx from "clsx"
import { MENU } from "@/configs/menu"
import Collaps from "@assets/menu/collapsemenu.svg?react"

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isMobile,
}: {
  isCollapsed: boolean
  setIsCollapsed: (val: boolean) => void
  isMobile: boolean
}) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggle = (key: string, disabled?: boolean) => {
    if (disabled) return // ⛔ Block khi disable
    setOpenKey((prev) => (prev === key ? null : key))
  }

  return (
    <>
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={clsx(
          "fixed md:static top-0 left-0 h-screen bg-white shadow-xl rounded-r-3xl py-6 px-4 transition-all duration-300 flex flex-col z-50 overflow-hidden",
          isCollapsed ? "w-[4rem]" : "w-[16rem]",
          isMobile
            ? isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0",
        )}
      >
        <div
          className={clsx(
            "text-[15px] font-semibold mb-4 flex items-center justify-between cursor-pointer",
            isCollapsed ? "justify-center px-1" : "px-3",
          )}
          onClick={() => {
            if (isMobile) setIsMobileOpen(!isMobileOpen)
            else setIsCollapsed(!isCollapsed)
          }}
        >
          <div className="flex items-center">
            <Collaps className="w-5 h-5 mr-2 text-[#F79009]" />
            {!isCollapsed && <div className="text-[#F79009]">Menu</div>}
          </div>
        </div>

        {/* MENU LIST */}
        <nav
          className={clsx(
            "flex flex-col gap-1 overflow-y-auto",
            isCollapsed && "items-center",
          )}
        >
          {MENU.map((m, index) => {
            const isDisabled = m.disabled
            const isParentActive =
              m.to === pathname || m.children?.some((c) => c.to === pathname)

            const isOpen = openKey === m.label && !isDisabled

            return (
              <div key={index}>
                <button
                  disabled={isDisabled}
                  onClick={() => {
                    if (isDisabled) return // ⛔ Block click
                    m.children ? toggle(m.label) : m.to && navigate(m.to)
                  }}
                  className={clsx(
                    "group relative w-full flex items-center text-sm font-medium rounded-xl transition-all duration-200 overflow-hidden",

                    // 🔥 DISABLED STYLE
                    isDisabled
                      ? "text-gray-400 cursor-not-allowed"
                      : isParentActive
                      ? "text-[#ff8800]"
                      : "text-gray-600 hover:text-black",

                    isCollapsed
                      ? "justify-center py-3"
                      : "justify-between px-3 py-2",
                  )}
                >
                  {/* ICON + LABEL */}
                  <div
                    className={clsx(
                      "flex items-center transition-all",
                      isCollapsed ? "justify-center" : "gap-2",
                    )}
                  >
                    {m.icon && (
                      <m.icon
                        className={clsx(
                          "w-5 h-5 shrink-0 mx-auto transition-transform duration-200",
                          isDisabled
                            ? "text-gray-400"
                            : isParentActive
                            ? "text-[#ff8800]"
                            : "",
                        )}
                      />
                    )}
                    {!isCollapsed && <span>{m.label}</span>}
                  </div>

                  {/* ARROW */}
                  {m.children && !isCollapsed && !isDisabled && (
                    <ChevronDown
                      size={16}
                      className={clsx(
                        "transition-transform duration-200",
                        isOpen ? "rotate-0" : "-rotate-90",
                      )}
                    />
                  )}

                  {/* TOOLTIP when collapsed (disable = hide tooltip) */}
                  {isCollapsed && !isDisabled && (
                    <span className="absolute left-[60px] bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      {m.label}
                    </span>
                  )}
                </button>

                {/* SUBMENU */}
                {!isCollapsed && m.children && isOpen && (
                  <div className="mt-1 flex flex-col gap-1">
                    {m.children.map((child, sub) => {
                      const isActive = pathname === child.to

                      return (
                        <SidebarItem
                          key={sub}
                          label={child.label}
                          to={child.to}
                          disabled={child.disabled}
                          active={isActive}
                          onClick={() => isMobile && setIsMobileOpen(false)}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </aside>

      {/* FLOATING BUTTON MOBILE */}
      {isMobile && !isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-[72px] left-4 z-50 bg-white rounded-full shadow-lg p-2 border border-gray-200 hover:bg-gray-50"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
      )}
    </>
  )
}

function SidebarItem({
  label,
  to,
  active,
  disabled,
  onClick,
}: {
  label: string
  to: string
  active: boolean
  disabled?: boolean
  onClick?: () => void
}) {
  const navigate = useNavigate()

  return (
    <button
      disabled={disabled}
      onClick={() => {
        if (disabled) return
        navigate(to)
        onClick?.()
      }}
      className={clsx(
        "flex items-center w-full px-3 py-3 text-sm rounded-xl transition-all text-left",

        disabled
          ? "text-gray-400 cursor-not-allowed bg-transparent"
          : active
          ? "bg-gradient-to-r from-[#FFC300] to-[#DFD747] text-white shadow-lg"
          : "text-gray-600 hover:bg-gray-50",
      )}
    >
      <span className="pl-5">{label}</span>
    </button>
  )
}
