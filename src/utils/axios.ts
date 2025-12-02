import { TokenStore } from "@/context/token"
import axios, { AxiosInstance } from "axios"

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://aut.bshc.com.vn",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
})

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = TokenStore.get()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      TokenStore.clear()
      window.location.href = "/login"
    }

    const errorData = error.response?.data || {}

    return Promise.reject({
      success: false,
      message: errorData.message || "Lỗi hệ thống, vui lòng thử lại",
      error_code: errorData.error_code || "003",
      status,
      data: errorData.data ?? null,
      raw: errorData,
    })
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
