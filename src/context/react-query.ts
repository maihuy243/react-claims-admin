import { QueryClient } from "@tanstack/react-query"

const GC_TIME_ROOT = 1000 * 60 * 10
const STALE_TIME_ROOT = 1000 * 30

// Hooks
export const GC_TIME_HOOKS = 1000 * 60 * 10
export const STALE_TIME_HOOKS = 1000 * 60 * 10

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
