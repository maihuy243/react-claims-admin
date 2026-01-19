export interface AuthContextType {
  user: ILoginResponse | null
  token: string | null
  login: (
    user_name: string,
    password: string,
    madvi: string,
    remember: boolean,
  ) => Promise<any>
  logout: () => void
}

export interface ILoginRequest {
  user_name: string
  password: string
  ma_dvi: string
}

export interface ILoginResponse {
  success: boolean
  message: string
  error_code: string

  id: string | null
  user_name: string | null
  ten_cb: string | null
  ma_cb: string | null
  token: string | null
  ma_dvi: string | null
}

export interface ChangePasswordRequest {
  user_name: string
  new_password: string
  confirm_password: string
  ma_dvi: string
  old_password: string
}

export interface ChangePasswordResponse {
  success: boolean
  message: string
  error_code: string
  id: string | null
  user_name: string | null
}

// ===============================
// REQUEST MODELS
// ===============================
export interface SearchHDRequest {
  id?: string
  so_hop_dong?: string
  chu_hop_dong?: string
  ngay_hieu_luc?: string
  ngay_het_han?: string
  ten_can_bo?: string
  trang_thai?: string
  ma_dvi?: string
  page?: number
  page_size?: number
}

export interface UpdateCBRequest {
  ten_can_bo: string
  ma_can_bo: string
  so_hop_dong?: string // tồn tại khi cập nhật hđ
  so_id?: string // tồn tại khi cập nhật hồ sơ bồi thường
  is_contract: boolean // true = cập nhật hđ, false = cập nhật hồ sơ bồi thường
}

// ===============================
// RESPONSE MODELS
// ===============================
export interface HDItem {
  id: string
  ma_dvi: string
  so_hop_dong: string
  chu_hop_dong: string
  ngay_hieu_luc: string
  ngay_het_han: string
  can_bo_xu_ly: string
  trang_thai: string
}

export interface SearchHDResponse {
  success: boolean
  message: string
  error_code: string
  data: HDItem[]
  total_records: number
  page: number
  page_size: number
  total_pages: number
}

export interface UpdateCBResponse {
  success: boolean
  message: string
  error_code: string
  ten_can_bo: string | null
  ma_can_bo: string | null
  so_hop_dong: string
}

export interface ClaimTableItem {
  id: number
  code: string
  name: string
  document: string
  contract: string
  event: string
  type: string
  processor?: string
  status: string
}

export interface Officer {
  value: string
  label: string
}

export interface HoSoBoiThuong {
  id: string
  ma_khach_hang: string
  ho_va_ten: string
  so_giay_to: string
  so_hop_dong: string
  su_kien: string
  hinh_thuc: string
  ten_can_bo: string
  trang_thai: string
  ngay_tao: string
  cccd_nguoi_tao: string
  ma_dvi:string
  ten_nguoi_tao: string
}

export interface SearchDSBTResponse {
  success: boolean
  message: string
  error_code?: string
  data: HoSoBoiThuong[]
  total_records: number
  page: number
  page_size: number
  total_pages: number
}

export interface SearchDSBTRequest {
  id?: string
  ma_khach_hang?: string
  ho_va_ten?: string
  so_giay_to?: string
  so_hop_dong?: string
  su_kien?: string
  hinh_thuc?: string
  ten_can_bo?: string
  trang_thai?: string
  page?: number // default 1
  page_size?: number // default 10, max 100
}
export interface DetailBTRequest {
  id: string
}

export interface AnhBoiThuong {
  id: string
  loai_giay_to: string
  hinh_anh: string
  ghi_chu: string
  active?: boolean
}

export interface DetailBT {
  id: string
  so_hd: string
  nguoi_duoc_bh: string
  chu_hop_dong: string
  loai_giay_to: string
  ngay_sinh: string
  sdt: string
  email: string
  su_kien: string
  hinh_thuc: string
  ngay_kham: string
  ngay_tai_nan: string
  ngay_vao_vien: string
  ngay_ra_vien: string
  co_so_y_te: string
  chan_doan: string
  so_tien_yeu_cau_boi_thuong: string
  so_tien_boi_thuong: string
  phuong_thuc: string
  ngan_hang: string
  so_tai_khoan: string
  ten_tai_khoan: string
  danh_sach_anh: AnhBoiThuong[]
  trang_thai: string
}

export interface DetailBTResponse {
  success: boolean
  message: string
  error_code: string
  nguoi_duoc_bao_hiem: string
  so_hop_dong: string
  chu_hop_dong: string
  cccd: string
  ngay_sinh: string
  su_kien_bao_hiem: string
  hinh_thuc_dieu_tri: string
  ngay_kham: string
  ngay_xay_ra_tai_nan: string
  ngay_vao_vien: string
  ngay_ra_vien: string
  co_so_y_te: string
  chan_doan: string
  so_tien_yeu_cau_boi_thuong: string
  so_tien_boi_thuong: string
  phuong_thuc: string
  ngan_hang: string
  so_tai_khoan: string
  ten_tai_khoan: string
  trang_thai: string
  danh_sach_anh: AnhBoiThuong[]
  email: string
  sdt: string
  avartar: string
  so_hs: string
  ngay_nh: string
  so_id_core: string
}

export interface NhapHSBTRequest {
  ma_cb: string
  so_id_claim: string
  ten_ndbh: string
  ngay_xr: string // dd-MMM-yyyy
  so_hd: string
  su_kien_bao_hiem: string
  hinh_thuc_dieu_tri: string
  chan_doan: string
  tien_ycbt: number
}

export interface NhapHSBTResponse {
  success: boolean
  message: string
  error_code: string
  so_id: string | null
  so_hs: string | null
}

export interface DSUserRequest {
  id?: string // ID người dùng
  so_hop_dong?: string // Số hợp đồng
  chu_hop_dong?: string // Tên chủ hợp đồng
  page?: number // default: 1
  page_size?: number // default: 20
  trang_thai?:string
}

export interface UserItem {
  id: string // ID người dùng
  ma_kh: string // Mã khách hàng
  ten_nguoi_duoc_bao_hiem: string // Tên người được bảo hiểm
  email: string // Email
  so_dien_thoai: string // Số điện thoại
  cccd: string // Số căn cước công dân
  tthai: string // Trạng thái
  so_hop_dong?: string
  so_hd?:string
}

export interface DSUserResponse {
  success: boolean
  message: string
  error_code: string // 000, 001, 002, 003
  data: UserItem[]
  total_records: number
  page: number
  page_size: number
  total_pages: number
}

export interface UpdateUserStatusRequest {
  id: string // ID người dùng
  trang_thai: string // ACTIVE, INACTIVE, LOCK, ...
}

export interface UpdateUserStatusResponse {
  success: boolean
  message: string
  error_code: string
  id: string // ID người dùng đã cập nhật
  trang_thai: string // Trạng thái mới
}

export interface CreateUserRequest {
  so_hop_dong: string // Số hợp đồng
  ten_kh: string // Tên khách hàng
  cccd: string // Số căn cước công dân
  sdt: string // Số điện thoại
  email: string // Email
  ten_dang_nhap: string // Tên đăng nhập
  b_mat_khau: string // Mật khẩu
}

export interface CreateUserResponse {
  success: boolean
  message: string
  error_code: string
  id: string
  so_hop_dong: string
  ten_khach_hang: string
  ten_dang_nhap: string
  email: string
}

export interface DSCanBoRequest {
  ma_cb?: string
  ten_cb?: string
  trang_thai?: string // COMPLETED, INSERT, ...
  page?: number // default: 1
  page_size?: number // default: 20
}

export interface CanBoItem {
  ma_cb: string // Mã cán bộ
  ten_cb: string // Tên cán bộ
  tong_hs: number // Tổng số hồ sơ
  da_ht: number // Đã hoàn thành
  dang_xl: number // Đang xử lý
  chua_xl: number // Chưa xử lý
  id?: string
  sdt?: string
}

export interface DSCanBoResponse {
  success: boolean
  message: string
  error_code: string
  data: CanBoItem[]
  total_records: number
  page: number
  page_size: number
  total_pages: number
}

export interface LSBTRequest {
  idClaim: string
}

export interface LSBTItem {
  hanh_dong: string
  du_lieu: string
  thoi_gian: string
}

export interface LSBTResponse {
  data: LSBTItem[]
}

export type MailType = "BT" | "BS"

export interface ChungTuBoSung {
  stt: number
  ten_chung_tu: string
  noi_dung_bo_sung: string
}

export interface SendClaimMailRequest {
  mail_type: MailType
  to_email: string
  ten_ndbh: string
  so_id: string
  so_ho_so?: string
  so_hop_dong?: string
  ten_chu_hop_dong?: string
  ngay_nhan_ho_so?: string
  ngay_kham?: string
  chan_doan?: string
  so_tien_yeu_cau?: number | string
  danh_sach_chung_tu?: ChungTuBoSung[]
  ma_dvi?: string
  so_id_core?:string
  danh_sach_anh?: AnhBoiThuong[]
}

export interface SendClaimMailResponse {
  success: boolean
  message: string
  error_code?: string
}

export interface ImportUserSuccess {
  row_number: number
  id: string
  ten_dang_nhap: string
  so_hop_dong: string
  ten_khach_hang: string
  email: string
}

export interface ImportUserError {
  row_number?: number
  message: string
}

export interface PreviewImportUserResponse {
  success: boolean
  message: string
  error_code: string
  total_users: number
  success_count: number
  failed_count: number
  success_users: ImportUserSuccess[]
  errors: ImportUserError[]
}

const REQUIRED_FIELDS = [
  "so_hop_dong",
  "ten_kh",
  "cccd",
  "sdt",
  "email",
  "ten_dang_nhap",
  "b_mat_khau",
] as const
export type RequiredField = (typeof REQUIRED_FIELDS)[number]

export type ImportPreviewState = {
  name: string
  size: number
  total_record: number
  valid: number
  invalid: number
  rows: PreviewRow[]
}

export type PreviewRow = {
  row_number: number
  so_hop_dong?: string
  ten_kh?: string
  cccd?: string
  sdt?: string
  email?: string
  ten_dang_nhap?: string
  b_mat_khau?: string
  require_change?: number

  // FE only
  is_valid: boolean
  missing_fields: RequiredField[]
}

export type ImportUserRow = {
  row_number: number
  so_hop_dong?: string
  ten_khach_hang?: string
  cccd?: string
  sdt?: string
  email?: string
  ten_dang_nhap?: string
}
