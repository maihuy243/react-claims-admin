import { z } from "zod"

export const LoginSchema = z.object({
  user_name: z.string().min(1, "Tên đăng nhập không được để trống"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
  madvi: z.string().min(1, "Mã đơn vị không được để trống"),
})

export type LoginForm = z.infer<typeof LoginSchema>
