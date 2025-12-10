import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Logo from "@assets/logo-login.svg?react"
import { useAuth } from "@/context/auth"
import { useUIStore } from "@/store/state"
import { LoginSchema } from "@/schema/login" // ← thêm dòng này
import { delay } from "@/utils"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [remember, setRemember] = useState(true)
  const [username, setUsername] = useState("")
  const [madvi, setMadvi] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<any>({})
  const setLoading = useUIStore((s) => s.setLoading)
  const showError = useUIStore((s) => s.showError)

  const handleLogin = async () => {
    const result = LoginSchema.safeParse({
      user_name: username,
      password,
      madvi,
    })

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((e) => {
        if (e.path[0]) fieldErrors[e.path[0]] = e.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setLoading(true)
    await delay(500)

    try {
      await login(username, password, madvi, remember)
      // redirect dashboard
      navigate("/")
      await delay(500)
    } catch (err: any) {
      showError(err.message)
    }

    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white md:flex-row">
      <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-10 md:w-1/2 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-center text-2xl font-bold text-gray-800 md:text-3xl">
            Đăng nhập
          </h1>
          <p className="mb-8 mt-1 text-center text-sm text-gray-500">
            Hệ thống quản lý tập trung của hệ sinh thái BSH
          </p>

          {/* Username */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Mã đơn vị
            </label>
            <Input
              placeholder="Nhập mã đơn vị"
              value={madvi}
              onChange={(e) => {
                setMadvi(e.target.value)
                setErrors((prev: any) => ({ ...prev, madvi: "" })) // ← CLEAR lỗi realtime
              }}
              className={errors.madvi ? "border-red-500" : ""}
              onKeyDown={handleKeyDown}
            />

            {errors.madvi && (
              <p className="mt-1 text-xs text-red-500">{errors.madvi}</p>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tên đăng nhập
            </label>
            <Input
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setErrors((prev: any) => ({ ...prev, user_name: "" })) // ← CLEAR lỗi realtime
              }}
              className={errors.user_name ? "border-red-500" : ""}
              onKeyDown={handleKeyDown}
            />

            {errors.user_name && (
              <p className="mt-1 text-xs text-red-500">{errors.user_name}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <Input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setErrors((prev: any) => ({ ...prev, password: "" })) // ← CLEAR lỗi realtime
              }}
              className={errors.password ? "border-red-500" : ""}
              onKeyDown={handleKeyDown}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Remember */}
          <div className="mb-6 flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={remember}
              onCheckedChange={(c: boolean) => setRemember(!!c)}
              className="border-orange-500 data-[state=checked]:bg-orange-500"
            />
            <label htmlFor="remember" className="text-sm text-gray-700">
              Ghi nhớ mật khẩu lần sau
            </label>
          </div>

          {/* Login Button */}
          <Button
            className="h-11 w-full rounded-lg bg-orange-500 text-base text-white hover:bg-orange-600"
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>

          <p className="mt-12 text-center text-xs text-gray-500">
            Liên hệ hỗ trợ Hotline: 18006085
          </p>
        </div>
      </div>

      <div className="hidden w-1/2 items-center justify-center md:flex">
        <div className="w-full overflow-hidden rounded-xl shadow-sm">
          <Logo className="w-full" />
        </div>
      </div>
    </div>
  )
}
