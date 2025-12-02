let memoryToken: string | null = null

export const TokenStore = {
  set(token: string | null) {
    memoryToken = token
  },
  get() {
    return memoryToken || localStorage.getItem("token") || null
  },
  clear() {
    memoryToken = null
    localStorage.removeItem("token")
  },
}
