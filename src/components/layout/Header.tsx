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

const Header = ({ onMenuClick = () => {}, breadcrumbs = [] }: any) => {
  const [openUser, setOpenUser] = useState(false)
  const [openNoti, setOpenNoti] = useState(false)
  const [openHelp, setOpenHelp] = useState(false)
  const [openChangePass, setOpenChangePass] = useState(false)
  const [alertLogout, setAlertLogout] = useState(false)

  return (
    <>
      <header className="h-14 bg-white border-b flex items-center justify-between px-4 md:px-6">
        {/* Left side - Logo + Breadcrumbs */}
        <div className="flex items-center gap-4 flex-1">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo as any}
              alt="Logo"
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* Breadcrumbs */}
          <div className="hidden md:flex items-center text-sm text-gray-500 gap-2">
            {breadcrumbs.map((crumb: any, idx: number) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>›</span>}
                <span
                  className={crumb.active ? "text-orange-500 font-medium" : ""}
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
            <Menu className="w-6 h-6" />
          </Button>

          {/* Apps Grid */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <div className="w-8 h-8  rounded flex items-center justify-center">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-3 h-3 bg-orange-500"></div>
                <div className="w-3 h-3 bg-orange-500"></div>
                <div className="w-3 h-3 bg-orange-500"></div>
                <div className="w-3 h-3 bg-orange-500"></div>
              </div>
            </div>
          </Button>

          <Divider orientation="vertical" />

          {/* Question */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setOpenHelp(true)}
          >
            <CircleQuestionMark className="w-6 h-6 text-gray-600" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setOpenNoti(true)}
          >
            <Bell className="w-6 h-6 text-gray-600" />
          </Button>

          {/* User Avatar */}
          <Button variant="ghost" size="icon">
            <Avatar style={{ width: 36, height: 36 }}>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="avatar"
                onClick={() => setOpenUser(true)}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </header>

      <UserInfoDialog
        open={openUser}
        onOpenChange={setOpenUser}
        onChangePassword={() => setOpenChangePass(true)}
        onLogout={() => setAlertLogout(true)}
      />
      <NotificationDialog open={openNoti} onOpenChange={setOpenNoti} />
      <HelpDialog open={openHelp} onOpenChange={setOpenHelp} />
      <ChangePasswordDialog
        open={openChangePass}
        onClose={() => setOpenChangePass(false)}
      />
      <AlertCommon
        open={alertLogout}
        onClose={() => setAlertLogout(false)}
        status="warning"
        message="Bạn chắc chắn muốn đăng xuất tài khoản?"
        onConfirm={() => console.log("Logout")}
      />
    </>
  )
}

export default Header
