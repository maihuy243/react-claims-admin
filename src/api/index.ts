import {
  DetailBTRequest,
  DetailBTResponse,
  ILoginRequest,
  ILoginResponse,
  NhapHSBTRequest,
  NhapHSBTResponse,
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

  nhapHSBT(payload: NhapHSBTRequest) {
    return postAsync<NhapHSBTResponse>("/api/cms/nhap-hsbt", payload)
  },

  //  ====================== AUTH ========================
  login(payload: ILoginRequest) {
    return postAsync<ILoginResponse>("/api/cms-auth/login", payload)
  },
}
