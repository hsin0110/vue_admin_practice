// 本地數據存取

// 存 token
export const SET_TOKEN = (token: string) => { 
  localStorage.setItem("TOKEN", token)
}

// 取 token
export const GET_TOKEN = () => { 
  return localStorage.getItem("TOKEN")
}

// 刪除 token
export const REMOVE_TOKEN = () => { 
  localStorage.removeItem('TOKEN')
}