import z from "zod"

export const changePasswordSchema = z
  .object({
    newPass: z.string().min(6, "Mật khẩu mới phải ít nhất 6 ký tự"),
    confirmPass: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.newPass === data.confirmPass, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPass"],
  })
