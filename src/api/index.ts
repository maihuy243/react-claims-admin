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

  // ✅ API 2: ĐỔI MẬT KHẨU
  changePassword(payload: ChangePasswordRequest) {
    return postAsync<ChangePasswordResponse>(
      "/api/cms-auth/change-password",
      payload,
    )
  },

  // ====================== USER ======================

  // ✅ API 10: LẤY DANH SÁCH NGƯỜI DÙNG
  getDSUser(payload: DSUserRequest) {
    return postAsync<DSUserResponse>("/api/cms/ds-user", payload)
  },

  // ✅ API 11: CẬP NHẬT TRẠNG THÁI NGƯỜI DÙNG
  updateUserStatus(payload: UpdateUserStatusRequest) {
    return postAsync<UpdateUserStatusResponse>("/api/cms/tthai-user", payload)
  },

  // ✅ API 12: TẠO NGƯỜI DÙNG
  createUser(payload: CreateUserRequest) {
    return postAsync<CreateUserResponse>("/api/cms/tao-user", payload)
  },

  // ✅ API 13: LẤY DANH SÁCH CÁN BỘ
  getDSCanBo(payload: DSCanBoRequest) {
    return postAsync<DSCanBoResponse>("/api/cms/ds-canbo", payload)
  },
}
