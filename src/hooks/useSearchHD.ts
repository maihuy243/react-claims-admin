import { CMSApi } from "@/api"
import { SearchHDRequest, SearchHDResponse } from "@/model"
import { useQuery, keepPreviousData } from "@tanstack/react-query"

export function useSearchHD(params: SearchHDRequest) {
  return useQuery<SearchHDResponse>({
    queryKey: ["searchHD", params],
    queryFn: () => CMSApi.searchHD(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: true,
  })
}
