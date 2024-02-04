// 統一管理用戶相關 API
import request from "@/utils/request"
import type { loginFormData, loginResponseData, userResponseData } from './type'

enum API { 
  LOGIN_URL = "user/login",
  USERINFO_URL = "user/info",
  LOGOUT_URL = "/admin/acl/index/logout"
}

export const reqLogin = (data: loginFormData) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
export const reqUserInfo = () => request.get<any, userResponseData>(API.USERINFO_URL)
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)

// enum API {
//   LOGIN_URL = "/admin/acl/index/login",
//   USERINFO_URL="/admin/acl/index/info"
//    LOGOUT_URL = "/admin/acl/index/logout"
// }

// export const reqLogin = (data: any) => request.post<any, any>(API.LOGIN_URL, data)
// export const reqUserInfo = () => request.get<any, any>(API.USERINFO_URL)
// export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
