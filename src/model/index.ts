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
  so_hop_dong?: string // tồn tại khi cập nhật hồ sơ
  so_id?:string // tồn tại khi cập nhật hồ sơ bồi thường
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

  so_dien_thoai?: string
  email?: string
}
