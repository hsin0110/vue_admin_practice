import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// import { reqLogin, reqUserInfo } from '@/api/user'
// import type { loginForm, loginResponseData } from '@/api/user/type'
import type { loginFormData, loginResponseData, userResponseData } from '@/api/user/type'
import type { UserState } from './types/type.ts'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token.ts'

import { constantRoute } from '@/router/routes'

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用戶唯一識別 token
      // token: '', // 用戶唯一識別 token
      menuRoutes: constantRoute,
      userName: '',
      avatar:''
    }
  },

  actions: {
    async userLogin(data: loginFormData) {
      console.log('user data__', data)
      const result:loginResponseData = await reqLogin(data)
      console.log('result__', result)
      // 登入成功 => 200 => token
      // 登入失敗 => 201 => 登入失敗錯誤訊息
      if (result.code === 200) {
        this.token = (result.data.token as string)
        // 本地持久化存一份
        SET_TOKEN((result.data.token as string))
        return 'ok'
      } else { 
        return Promise.reject(new Error(result.data.message))
      }
      
    },
    // 獲取用戶資訊
    async userInfo() { 
      console.log('userInfo')
      let result :userResponseData = await reqUserInfo()
      console.log('result__', result)
      // 如果獲取用戶資訊成功，儲存
      if (result.code === 200) {
        this.userName = result.data.checkUser.userName
        this.avatar = result.data.checkUser.avatar
        return 'ok'
      } else { 
        return Promise.reject('獲取用戶訊息失敗')
      }
    },
    // logout
    async userLogout() { 
      let result = await reqLogout()
      this.token = ''
      this.userName = ''
      this.avatar = ''
      REMOVE_TOKEN()
    } 

  },
  getters: {}
})

export default useUserStore