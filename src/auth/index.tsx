import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Logo from "@assets/logo-login.svg?react"

export default function LoginPage() {
  const [remember, setRemember] = useState(true)

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* LEFT SIDE – FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-20 py-10">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          {/* <div className="flex justify-center mb-6">
            <Logo className="w-40 h-auto" />
          </div> */}

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
            Đăng nhập
          </h1>
          <p className="text-sm text-gray-500 text-center mt-1 mb-8">
            Hệ thống quản lý tập trung của hệ sinh thái BSH
          </p>

          {/* Username */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Tên đăng nhập
            </label>
            <Input placeholder="Nhập tên đăng nhập" />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Mật khẩu
            </label>
            <Input type="password" placeholder="Nhập mật khẩu" />
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2 mb-6">
            <Checkbox
              id="remember"
              checked={remember}
              onCheckedChange={(c) => setRemember(!!c)}
              className="border-orange-500 data-[state=checked]:bg-orange-500"
            />
            <label htmlFor="remember" className="text-sm text-gray-700">
              Ghi nhớ mật khẩu lần sau
            </label>
          </div>

          {/* Login Button */}
          <Button className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white text-base rounded-lg">
            Đăng nhập
          </Button>

          {/* Hotline */}
          <p className="text-center text-xs text-gray-500 mt-12">
            Liên hệ hỗ trợ Hotline: 18006085
          </p>
        </div>
      </div>

      {/* RIGHT SIDE – IMAGE / BANNER */}
      <div className="hidden md:flex w-1/2 items-center justify-center ">
        <div className="w-full rounded-xl overflow-hidden shadow-sm  ">
          <Logo className="w-full" />
        </div>
      </div>
    </div>
  )
}
