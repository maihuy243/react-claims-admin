import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { CMSApi } from "@/api"
import { useAuth } from "@/context/auth"
import { changePasswordSchema } from "@/schema/change-password"
import { useNavigate } from "react-router-dom"
import { useUIStore } from "@/store/state"
import { useShallow } from "zustand/shallow"

export function ChangePasswordDialog({ open, onClose }: any) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [oldPass, setOldPass] = useState("")
  const [showOld, setShowOld] = useState(false)
  const [newPass, setNewPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)

  const { loading, setLoading, success, error } = useUIStore(
    useShallow((s) => ({
      loading: s.loading,
      setLoading: s.setLoading,
      error: s.showError,
      success: s.showSuccess,
    })),
  )

  const handleSubmit = async () => {
    const result = changePasswordSchema.safeParse({
      oldPass,
      newPass,
      confirmPass,
    })

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        const field = err.path[0]
        fieldErrors[field as string] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    try {
      setLoading(true)
      setErrors({})
      setServerError(null)

      const result = await CMSApi.changePassword({
        user_name: user?.user_name || "",
        old_password: oldPass,
        new_password: newPass,
        confirm_password: confirmPass,
        ma_dvi: user?.ma_dvi || "",
      })

      if (!result.success) {
        error(result.message)
        return
      }

      success(result.message)
      logout()
      navigate("/login", { replace: true })
    } catch (e: any) {
      setServerError(e?.message || "Đổi mật khẩu thất bại")
    } finally {
      setLoading(false)
    }
  }

  const resetState = () => {
    setNewPass("")
    setConfirmPass("")
    setShowNew(false)
    setShowConfirm(false)
    setErrors({})
    setServerError(null)
  }

  useEffect(() => {
    resetState()
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md overflow-hidden rounded-xl p-0">
        {/* HEADER */}
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Đổi mật khẩu
          </DialogTitle>
        </DialogHeader>

        {/* BODY */}

        <div className="space-y-5 px-6 py-6">
          {/* OLD PASSWORD */}
          <div>
            <label className="text-[14px] font-medium text-gray-700">
              Mật khẩu cũ <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <Input
                type={showOld ? "text" : "password"}
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowOld(!showOld)}
              >
                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.oldPass && (
              <p className="text-sm text-red-500">{errors.oldPass}</p>
            )}
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="text-[14px] font-medium text-gray-700">
              Mật khẩu mới <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <Input
                type={showNew ? "text" : "password"}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPass && (
              <p className="text-sm text-red-500">{errors.newPass}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-[14px] font-medium text-gray-700">
              Xác nhận mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <Input
                type={showConfirm ? "text" : "password"}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPass && (
              <p className="text-sm text-red-500">{errors.confirmPass}</p>
            )}
          </div>

          {/* SERVER ERROR */}
          {serverError && (
            <div className="text-sm font-medium text-red-500">
              {serverError}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <DialogFooter className="flex justify-end gap-3 border-t px-6 py-4">
          <Button variant="ghost" className="text-orange-600" onClick={onClose}>
            Hủy
          </Button>

          <Button
            className="bg-orange-500 px-6 text-white hover:bg-orange-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
