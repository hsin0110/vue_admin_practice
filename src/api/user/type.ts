// 登入 API 需要的參數 ts 類型
export interface loginForm { 
  userName: string,
  password: string
}

interface dataType { 
  token?: string,
  message?: string
}

// 登入回傳數據類型
export interface loginResponseData { 
  code: number,
  data: dataType
}

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

export interface userResponseData { 
  code: number,
  data: user
}