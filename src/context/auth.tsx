import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  user: any
  token: string | null
  login: (token: string, user?: any) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  )
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem("user")
    return saved ? JSON.parse(saved) : null
  })

  const login = (t: string, u: any) => {
    setToken(t)
    setUser(u)
    localStorage.setItem("token", t)
    localStorage.setItem("user", JSON.stringify(u))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)!
