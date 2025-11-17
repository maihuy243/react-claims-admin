import {
  DetailBTRequest,
  DetailBTResponse,
  SearchDSBTRequest,
  SearchDSBTResponse,
  SearchHDRequest,
  SearchHDResponse,
  UpdateCBRequest,
  UpdateCBResponse,
} from "@/model"
import { getAsync, postAsync } from "@/utils/axios"

export const CMSApi = {
  searchHD(payload: SearchHDRequest) {
    return postAsync<SearchHDResponse>("/api/cms/search-hd", payload)
  },

  updateCB(payload: UpdateCBRequest) {
    return postAsync<UpdateCBResponse>("/api/cms/update-cb", payload)
  },

  searchDSBT(payload: SearchDSBTRequest) {
    return postAsync<SearchDSBTResponse>("/api/cms/search-dsbt", payload)
  },

  detailBT(payload: DetailBTRequest) {
    return getAsync<DetailBTResponse>("/api/cms/detail-bt", payload)
  },
}
