import { z } from "zod"
export const createUserSchema = z.object({
  so_hop_dong: z.string().min(1, "Bắt buộc nhập số hợp đồng"),
  ten_kh: z.string().min(1, "Bắt buộc nhập tên khách hàng"),
  cccd: z.string().min(1, "Bắt buộc nhập CCCD"),
  sdt: z.string().min(1, "Bắt buộc nhập số điện thoại"),
  email: z.string().min(1, "Bắt buộc nhập email").email("Email không hợp lệ"),
  ten_dang_nhap: z.string().min(1, "Bắt buộc nhập tên đăng nhập"),
  b_mat_khau: z.string().min(1, "Bắt buộc nhập mật khẩu"),
})
