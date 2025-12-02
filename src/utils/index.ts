import dayjs from "dayjs"

export const dateFormat = (date?: string) => {
  if (!date) return
  return dayjs(date).format("DD/MM/YYYY")
}

export const delay = (ms: number) => new Promise((re) => setTimeout(re, ms))
