import {
  SearchHDRequest,
  SearchHDResponse,
  UpdateCBRequest,
  UpdateCBResponse,
} from "@/model"
import { postAsync } from "@/utils/axios"

export const CMSApi = {
  searchHD(payload: SearchHDRequest) {
    return postAsync<SearchHDResponse>("/api/cms/search-hd", payload)
  },

  updateCB(payload: UpdateCBRequest) {
    return postAsync<UpdateCBResponse>("/api/cms/update-cb", payload)
  },
}
