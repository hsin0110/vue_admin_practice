
// 用戶管理模塊的接口

import request from "@/utils/request"
import type {UserResponseData, User} from "./type"

enum API { 
  // 獲取全部已有帳戶資訊
  ALLUSER_URL = 'admin/acl/user/',
  // 添加新用戶
  ADDUSER_URL = 'admin/acl/user/save',
  // 更新用戶
  UPDATEUSER_URL = 'admin/acl/user/update'
}

export const reqUserInfo = (page: number, limit: number) => request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`)

// 添加/更新用戶
export const reqAddOrUpdateUser = (data: User) => { 
  // 有帶 id 表示更新
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else { 
    return request.post<any, any>(API.ADDUSER_URL, data)
  }

}