import React, { useState } from "react"
import { Button } from "../ui/button"
import { Bell, CircleQuestionMark, Menu } from "lucide-react"
import logo from "../../../assets/logo/logo.svg"
import Divider from "../divider"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { UserInfoDialog } from "../others/user-info"
import { NotificationDialog } from "../others/notification"
import { HelpDialog } from "../others/help"
import AlertCommon from "../alert"
import { ChangePasswordDialog } from "../others/change-password"
import { useAuth } from "@/context/auth"
import { useUIStore } from "@/store/state"
import { delay } from "@/utils"
import { useNavigate } from "react-router-dom"
import bgHeader from "@assets/bg_header.png"
import NotiIcon from "@assets/noti.png"
import QuestionIcon from "@assets/question.png"

type ModalOpen = "user" | "help" | "noti" | undefined

const Header = ({ onMenuClick = () => {}, breadcrumbs = [] }: any) => {
  const [openModal, setOpenModal] = useState<ModalOpen>()
  const [openChangePass, setOpenChangePass] = useState(false)
  const [alertLogout, setAlertLogout] = useState(false)
  const setLoading = useUIStore((s) => s.setLoading)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const onLogout = async () => {
    setLoading(true)
    logout()
    await delay(1000)
    navigate("/login")
    setLoading(false)
  }

  return (
    <>
      <header
        className="flex h-14 items-center justify-between overflow-hidden border-b bg-white px-4 md:px-6"
        style={{
          backgroundImage: `url(${bgHeader})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Left side - Logo + Breadcrumbs */}
        <div className="flex flex-1 items-center gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo as any}
              alt="Logo"
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* Breadcrumbs */}
          <div className="hidden items-center gap-2 text-sm text-gray-500 md:flex">
            {breadcrumbs.map((crumb: any, idx: number) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>›</span>}
                <span
                  className={crumb.active ? "font-medium text-orange-500" : ""}
                >
                  {crumb.label}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Apps Grid */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="h-3 w-3 bg-orange-500"></div>
                <div className="h-3 w-3 bg-orange-500"></div>
                <div className="h-3 w-3 bg-orange-500"></div>
                <div className="h-3 w-3 bg-orange-500"></div>
              </div>
            </div>
          </Button>

          <Divider orientation="vertical" />

          {/* Question */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setOpenModal("help")}
          >
            <img className="h-6 w-6" src={QuestionIcon} alt="question" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setOpenModal("noti")}
          >
            <img className="h-6 w-6" src={NotiIcon} alt="question" />
          </Button>

          {/* User Avatar */}
          <Button variant="ghost" size="icon">
            <Avatar style={{ width: 36, height: 36 }}>
              <AvatarImage
                src="https://cdn-icons-png.freepik.com/512/6858/6858504.png"
                alt="avatar"
                onClick={() => setOpenModal("user")}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </header>

      {openModal === "user" && (
        <UserInfoDialog
          open={openModal}
          onClose={() => setOpenModal(undefined)}
          onChangePassword={() => setOpenChangePass(true)}
          onLogout={() => setAlertLogout(true)}
        />
      )}
      {openModal === "noti" && (
        <NotificationDialog
          open={openModal}
          onClose={() => setOpenModal(undefined)}
        />
      )}
      {openModal === "help" && (
        <HelpDialog
          open={!!openModal}
          onClose={() => setOpenModal(undefined)}
        />
      )}

      <ChangePasswordDialog
        open={openChangePass}
        onClose={() => setOpenChangePass(false)}
      />
      <AlertCommon
        open={alertLogout}
        onClose={() => setAlertLogout(false)}
        status="warning"
        message="Bạn chắc chắn muốn đăng xuất tài khoản?"
        onConfirm={onLogout}
      />
    </>
  )
}

export default Header
