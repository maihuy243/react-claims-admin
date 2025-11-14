import axios, { AxiosInstance } from "axios"

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://aut.bshc.com.vn",
  timeout: 15000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json", //this line solved cors
  },
})

// ===============================
// 🔐 Token Helper
// ===============================
const getToken = () => localStorage.getItem("token")

// ===============================
// 🚀 REQUEST INTERCEPTOR
// ===============================
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ===============================
// 🚨 RESPONSE INTERCEPTOR
// ===============================
//
// Chuẩn hoá lỗi theo API design:
// error_code:
//  - 000: OK
//  - 001: Request không hợp lệ
//  - 002: DB error
//  - 003: System error
//
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status

    // Auto logout nếu token hết hạn
    console.log("----")

    if (status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }

    // Normalize error theo format của API design
    const errorData = error.response?.data || {}

    const normalizedError = {
      success: false,
      message: errorData.message || "Lỗi hệ thống, vui lòng thử lại",
      error_code: errorData.error_code || "003",
      status,
      data: errorData.data ?? null,
      raw: errorData,
    }

    return Promise.reject(normalizedError)
  },
)

// ===============================
// 🌟 BASE GET + POST FUNCTION
// ===============================
export async function getAsync<T = any>(url: string, params?: any): Promise<T> {
  try {
    const res = await api.get(url, { params })
    return res as T
  } catch (error) {
    throw error
  }
}

export async function postAsync<T = any>(url: string, body?: any): Promise<T> {
  try {
    const res = await api.post(url, body)
    return res as T
  } catch (error) {
    throw error
  }
}

export default api
