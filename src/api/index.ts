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
  ChangePasswordRequest,
  ChangePasswordResponse,
  DSUserRequest,
  DSUserResponse,
  UpdateUserStatusRequest,
  UpdateUserStatusResponse,
  CreateUserRequest,
  CreateUserResponse,
  DSCanBoRequest,
  DSCanBoResponse,
  LSBTRequest,
  LSBTResponse,
} from "@/model"

import { getAsync, postAsync } from "@/utils/axios"

export const CMSApi = {
  // ====================== HỢP ĐỒNG - BỒI THƯỜNG ======================
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

  // ====================== AUTH ======================
  login(payload: ILoginRequest) {
    return postAsync<ILoginResponse>("/api/cms-auth/login", payload)
  },

  changePassword(payload: ChangePasswordRequest) {
    return postAsync<ChangePasswordResponse>(
      "/api/cms-auth/change-password",
      payload,
    )
  },

  // ====================== USER ======================

  getDSUser(payload: DSUserRequest) {
    return postAsync<DSUserResponse>("/api/cms/ds-user", payload)
  },

  updateUserStatus(payload: UpdateUserStatusRequest) {
    return postAsync<UpdateUserStatusResponse>("/api/cms/tthai-user", payload)
  },

  createUser(payload: CreateUserRequest) {
    return postAsync<CreateUserResponse>("/api/cms/tao-user", payload)
  },

  getDSCanBo(payload: DSCanBoRequest) {
    return postAsync<DSCanBoResponse>("/api/cms/ds-canbo", payload)
  },

  getLsbt(payload: LSBTRequest) {
    return getAsync<LSBTResponse>("/api/cms/ls-bt", payload)
  },
}
