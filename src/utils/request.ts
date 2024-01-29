// axios 二次封裝：使用請求與攔截器
// 測試 mock API
import axios from 'axios'
// axios({
//   url: '/api/user/login',
//   method: 'post',
//   data: {
//     userName: 'admin',
//     password: '111111'
//   }
// })

import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user.ts'

// step one：利用 axios 的create方法，創建 axios 實例(其他配置：url、timeout)
const request = axios.create(
  {
    // 基礎路徑
    baseURL: import.meta.VITE_APP_BASE_API,
    timeout: 5000, // 超時的設置
  }
)
// step two：實例添加請求與攔截器
request.interceptors.request.use((config) => { 
  // console.log('config__', config)
  // config.headers.token = '123'
  let userStore = useUserStore()
  console.log('userStore.token__', userStore.token)
  if (userStore.token) { 
    config.headers.token = userStore.token
  }
  // config 配置對象 ，headers 經常給 server 攜帶公共參數
  // 返回配置對象
  return config
})

// step three：響應攔截器
request.interceptors.response.use((response) => {
  console.log('response__', response)
  // 成功回調
  // 簡化數據
  return response.data
}, (error) => { 
  // 失敗回調
  // 定義一個變量：存錯誤訊息
  let message = ''
  const status = error.response.status
  switch (status) { 
    case 401:
      message = 'TOKEN 過期'
      break;
    case 403:
      message = '無權限訪問'
      break;
    case 404:
      message = '請求地址錯誤'
      break;
    case 500:
      message = '伺服器錯誤'
      break;
    default: 
      message = '網路出現問題'
      break;
  }
  // 提示錯誤訊息
  ElMessage({
    type: 'error',
    message
  })

  return Promise.reject(error)

})

export default request
