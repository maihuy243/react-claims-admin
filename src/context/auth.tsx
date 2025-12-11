import { CMSApi } from "@/api"
import { AuthContextType, ILoginResponse } from "@/model"
import { createContext, useContext, useState, useEffect } from "react"
import { TokenStore } from "./token"

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  )

  const [user, setUser] = useState<ILoginResponse | null>(() => {
    const saved = localStorage.getItem("user")
    return saved ? JSON.parse(saved) : null
  })

  // Load token từ localStorage => memory
  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) TokenStore.set(savedToken)
  }, [])

  const login = async (
    user_name: string,
    password: string,
    madvi: string,
    remember: boolean,
  ) => {
    const data = await CMSApi.login({ user_name, password, ma_dvi: madvi })

    if (!data.success || !data.token) {
      throw new Error(data.message || "Đăng nhập thất bại")
    }

    setToken(data.token)
    setUser(data)

    // Lưu token vào memory (quan trọng nhất)
    TokenStore.set(data.token)

    // Nếu user tick remember → lưu thêm vào localStorage
    if (remember) {
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data))
    }

    return data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    TokenStore.clear()
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)!
