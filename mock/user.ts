// createUserList 此函數執行匯回傳一個陣列，包含兩個用戶訊息
function createUserList() {
  return [
    {
      userId: 1,
      userName: 'admin',
      password: '123456',
      desc: '平台管理員',
      roles: ['平台管理員'],
      buttons: ['curser.detail'],
      routes: ['home'],
      token: 'Admin Token'
    },
    {
      userId: 2,
      userName: 'system',
      password: '111111',
      desc: '系統管理員',
      roles: ['系統管理員'],
      buttons: ['curser.detail', 'curser.user'],
      routes: ['home'],
      token: 'System Token'
    }
  ]
 }

 // 此陣列韓兩個接口
 // 登入
 // 獲取用戶訊息
export default [
  // 登入
  {
    url: '/user/login', // 請求地址
    method: 'post', // 請求方式
    response: ({ body }) => { 
      const { userName, password } = body
      const checkUser = createUserList().find((item) => item.userName === userName && item.password === password)

      // 找不到該用戶回傳失敗訊息
      if (!checkUser) { 
        return {
          code: 201,
          data: {
            message: '帳號或密碼不正確'
          }
        }
      }
      // 找到該用戶回傳成功訊息
      const { token } = checkUser
      return {
        code: 200,
        data: {
          token
        }
      }
    }
  }, 

  // 獲取用戶訊息
  {
    url: '/api/user/info',
    method: 'get',
    response: (request) => { 
      const token = request.headers.token;
      const checkUser = createUserList().find((item) => item.token === token)
      
      // 查不到該用戶回傳失敗消息
      if (!checkUser) { 
        return {
          code: 200,
          data: {
            message: '獲取用戶訊息失敗'
          }
        }
      }

      // 查到該用戶回傳該用戶訊息
      return {
        code: 200,
        data: {
          checkUser
        }
      }
    }
  }
]