import axios from "axios"

// ===============================
// 🔧 CREATE INSTANCE
// ===============================
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.example.com",
  timeout: 15000,
})

// ===============================
// 🔧 TOKEN HELPERS
// ===============================
const getToken = () => localStorage.getItem("token")

// ===============================
// 🔥 REQUEST INTERCEPTOR
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
// 🔥 RESPONSE INTERCEPTOR
// ===============================
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// ===============================
// 🚀 PUBLIC METHODS
// ===============================
export async function getAsync<T = any>(url: string, params?: any): Promise<T> {
  try {
    return await api.get(url, { params })
  } catch (err: any) {
    throw err
  }
}

export async function postAsync<T = any>(url: string, data?: any): Promise<T> {
  try {
    return await api.post(url, data)
  } catch (err: any) {
    throw err
  }
}

export default api
