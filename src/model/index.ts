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
  so_hop_dong: string
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
