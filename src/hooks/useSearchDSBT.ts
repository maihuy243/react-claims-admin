import { CMSApi } from "@/api"
import { GC_TIME_HOOKS, STALE_TIME_HOOKS } from "@/context/react-query"
import { SearchDSBTRequest, SearchDSBTResponse } from "@/model"
import { useQuery, keepPreviousData } from "@tanstack/react-query"

export function useSearchDSBT(params: SearchDSBTRequest) {
  return useQuery<SearchDSBTResponse>({
    queryKey: ["searchDSBT", params],
    queryFn: () => CMSApi.searchDSBT(params),
    placeholderData: keepPreviousData,
    staleTime: GC_TIME_HOOKS,
    gcTime: STALE_TIME_HOOKS,
    refetchOnWindowFocus: false,
    enabled: true,
    refetchOnMount: true,
    })
}
