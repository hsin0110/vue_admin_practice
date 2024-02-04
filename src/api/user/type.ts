// 定義用戶相關數據的 ts 類型
// 用戶登入參數的 ts 類型

export interface loginFormData { 
  userName: string,
  password: string
}

// 定義所有 API 回傳數據都擁有的 ts 類型
export interface ResponseData { 
  code: number,
  message: string,
  ok: boolean
}

// 登入回傳數據類型
export interface loginResponseData extends ResponseData { 
  data: string
}

// interface dataType { 
//   token?: string,
//   message?: string
// }

// 定義回傳用戶訊息相關數據類型

interface userInfo {
  userId: number,
  userName: string,
  password: string,
  desc: string,
  roles: string[],
  buttons: string[],
  routes: string[],
  token: string,
  avatar: string
}
interface user { 
  checkUser: userInfo
}

export interface userResponseData extends ResponseData{ 
  data: {
    routes: string[],
    buttons: string[],
    roles: string[],
    userName: string,
    avatar: string
  }
}