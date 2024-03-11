// 用戶帳號訊息 ts 類型
export interface ResponseData { 
  code: number,
  message: string,
  ok:boolean
}

// 單一用戶訊息 ts 類型
export interface User {
  id?: number,
  createTime?:string,
  updateTime?:string,
  userName?:string,
  password?:string,
  name?:string,
  phone?:null,
  roleName?:string,
}

// 數組包含全部用戶訊息
export type Records = User[]

// 獲取全部用戶訊息接口返回的數據 ts 類型
export interface UserResponseData extends ResponseData { 
  data: {
    records: Records,
    total: number,
    size: number,
    current: number,
    pages: number
  }
}