import { QueryClient } from "@tanstack/react-query"

const GC_TIME_ROOT = 1000 * 60 * 10
const STALE_TIME_ROOT = 1000 * 30

// Auto refetch sau 10p
// export const GC_TIME_HOOKS = 1000 * 60 * 10
export const GC_TIME_HOOKS = 0 // Off cache

// Remove sau 10p nếu không có request get cache
export const STALE_TIME_HOOKS = 1000 * 60 * 1

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      gcTime: GC_TIME_ROOT,
      staleTime: STALE_TIME_ROOT,
    },
  },
})
