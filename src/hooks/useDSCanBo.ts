import { CMSApi } from "@/api"
import { GC_TIME_HOOKS, STALE_TIME_HOOKS } from "@/context/react-query"
import { DSCanBoRequest, DSCanBoResponse } from "@/model"
import { useQuery, keepPreviousData } from "@tanstack/react-query"

export function useDsCanBo(params: DSCanBoRequest) {
  return useQuery<DSCanBoResponse>({
    queryKey: ["dscanbo", params],
    queryFn: () => CMSApi.getDSCanBo(params),
    placeholderData: keepPreviousData,
    staleTime: GC_TIME_HOOKS,
    gcTime: STALE_TIME_HOOKS,
    refetchOnWindowFocus: false,
    enabled: true,
  })
}
