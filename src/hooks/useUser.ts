import { CMSApi } from "@/api"
import { GC_TIME_HOOKS, STALE_TIME_HOOKS } from "@/context/react-query"
import { DSUserRequest, DSUserResponse } from "@/model"
import { useQuery, keepPreviousData } from "@tanstack/react-query"

export function useSearchUsers(params: DSUserRequest) {
  return useQuery<DSUserResponse>({
    queryKey: ["users", params],
    queryFn: () => CMSApi.getDSUser(params),
    placeholderData: keepPreviousData,
    staleTime: GC_TIME_HOOKS,
    gcTime: STALE_TIME_HOOKS,
    refetchOnWindowFocus: false,
    enabled: true,
  })
}
