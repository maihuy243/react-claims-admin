import { create } from "zustand"
import { toast } from "sonner"

interface UIState {
  loading: boolean
  setLoading: (val: boolean) => void
  showSuccess: (msg: string) => void
  showError: (msg: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  showSuccess: (msg) =>
    toast.success(msg, {
      style: {
        background: "linear-gradient(90deg, #8DEB8D, #3CCF4E)",
        color: "#fff",
        border: "none",
      },
    }),

  showError: (msg) =>
    toast.error(msg, {
      style: {
        background: "linear-gradient(90deg, #FF6B6B, #D54848)",
        color: "#fff",
        border: "none",
      },
    }),
}))
