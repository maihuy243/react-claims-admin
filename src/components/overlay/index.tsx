import { useUIStore } from "@/store/state"
import Spinner from "./spinner"

export default function LoadingOverlay() {
  const loading = useUIStore((s) => s.loading)

  if (!loading) return null

  return (
    <div
      className="
      fixed inset-0 
      bg-black/20 
      backdrop-blur-sm 
      z-[99999]
      flex items-center justify-center
    "
    >
      <Spinner />
    </div>
  )
}
