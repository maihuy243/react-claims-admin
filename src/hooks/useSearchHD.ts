import { CMSApi } from "@/api"
import { GC_TIME_HOOKS, STALE_TIME_HOOKS } from "@/context/react-query"
import { SearchHDRequest, SearchHDResponse } from "@/model"
import { useQuery, keepPreviousData } from "@tanstack/react-query"

export function useSearchHD(params: SearchHDRequest) {
  return useQuery<SearchHDResponse>({
    queryKey: ["searchHD", params],
    queryFn: () => CMSApi.searchHD(params),
    placeholderData: keepPreviousData,
    staleTime: GC_TIME_HOOKS,
    gcTime: STALE_TIME_HOOKS,
    refetchOnWindowFocus: false,
    enabled: true,
    refetchOnMount: true,
  })
}
