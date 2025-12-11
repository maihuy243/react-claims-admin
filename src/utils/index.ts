import dayjs from "dayjs"

export const dateFormat = (date?: string) => {
  if (!date) return
  return dayjs(date).format("DD/MM/YYYY")
}

export const delay = (ms: number) => new Promise((re) => setTimeout(re, ms))

export function generateRandomPassword(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"
  let pass = ""
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return pass
}
