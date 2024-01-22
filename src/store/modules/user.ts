import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type.ts'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token.ts'

import { constantRoute } from '@/router/routes'

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用戶唯一識別 token
      // token: '', // 用戶唯一識別 token
      menuRoutes: constantRoute
    }
  },

  actions: {
    async userLogin(data: loginForm) {
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
      
     }

  },
  getters: {}
})

export default useUserStore