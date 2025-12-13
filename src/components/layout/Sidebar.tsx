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
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggle = (key: string, disabled?: boolean) => {
    if (disabled) return

    setOpenKeys(
      (prev) =>
        prev.includes(key)
          ? prev.filter((k) => k !== key) // đóng
          : [...prev, key], // mở thêm
    )
  }

  return (
    <>
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={clsx(
          "fixed left-0 top-0 z-50 flex h-screen flex-col overflow-hidden rounded-r-3xl bg-white px-4 py-6 shadow-xl transition-all duration-300 md:static",
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
            "mb-4 flex cursor-pointer items-center justify-between text-[15px] font-semibold",
            isCollapsed ? "justify-center px-1" : "px-3",
          )}
          onClick={() => {
            if (isMobile) setIsMobileOpen(!isMobileOpen)
            else setIsCollapsed(!isCollapsed)
          }}
        >
          <div className="flex items-center">
            <Collaps className="mr-2 h-5 w-5 text-[#F79009]" />
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

            const isOpen = openKeys.includes(m.label) && !isDisabled

            return (
              <div key={index}>
                <button
                  disabled={isDisabled}
                  onClick={() => {
                    if (isDisabled) return // ⛔ Block click
                    m.children ? toggle(m.label) : m.to && navigate(m.to)
                  }}
                  className={clsx(
                    "group relative flex w-full items-center overflow-hidden rounded-xl text-sm font-bold transition-all duration-200",

                    // 🔥 DISABLED STYLE
                    isDisabled
                      ? "cursor-not-allowed text-[#8590A2]"
                      : isParentActive
                        ? "text-[#ff8800]"
                        : "text-[#8590A2] hover:text-black",

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
                          "mx-auto h-5 w-5 shrink-0 transition-transform duration-200",
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
                    <span className="pointer-events-none absolute left-[60px] whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {m.label}
                    </span>
                  )}
                </button>

                {/* SUBMENU */}
                {!isCollapsed && m.children && isOpen && (
                  <div className="mt-1 flex flex-col gap-1">
                    {m.children
                      .filter((s) => !s.isHidden)
                      .map((child, sub) => {
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
          className="fixed left-4 top-[72px] z-50 rounded-full border border-gray-200 bg-white p-2 shadow-lg hover:bg-gray-50"
        >
          <Menu className="h-5 w-5 text-gray-700" />
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
        "flex w-full items-center rounded-xl py-3 text-left text-sm font-bold transition-all",

        disabled
          ? "cursor-not-allowed bg-transparent text-gray-400"
          : active
            ? "bg-gradient-to-r from-[#FFC300] to-[#DFD747] text-white shadow-lg"
            : "text-[#8590A2] hover:bg-gray-50",
      )}
    >
      <div className="w-5"></div>
      <span className="pl-5">{label}</span>
    </button>
  )
}
