// 
import router from '@/router'
import setting from './setting'
import nprogress from 'nprogress'
// 進度條樣式
import 'nprogress/nprogress.css'

import useUserStore from './store/modules/user'
import pinia from './store'
let userStore = useUserStore(pinia)
console.log('userStore__', userStore)

nprogress.configure({showSpinner: false})

// 訪問某個路由之前會觸發
router.beforeEach(async (to: any, from: any, next: any) => { 
  // to：將要訪問的路由
  // form：從哪個路由來
  // next：路由的放行函數
  nprogress.start()

  // 透過 token 判斷用戶是否登入
  let token = userStore.token
  // 獲取用戶名字
  let userName = userStore.userName
  if (token) {
    // 登入成功後，不行再回到登入頁，並指向首頁
    if (to.path === '/login') { 
      next({path:'/'})
    } else {
      // 訪問其他路由(除了登入頁)
      // 有用戶資訊
      if (userName) {
        next()
      } else { 
        // 沒有用戶資訊，於此發送獲取用戶資訊請求後再放行
        try {
          await userStore.userInfo()
          next()
        } catch (error) { 
          // token 過期，獲取不到用戶資訊
          // 用戶手動更改 token
          // → 登出，清除用戶資訊
          userStore.userLogout()
          next({ path: '/login', query: {redirect: to.path} })
        }
        

      }
      next()
    }
  } else { 
    if (to.path === '/login') {
      next()
    } else { 
      next({ path: '/login', query: {redirect: to.path} })
    }
  }
})

// 訪問某個路由之後會觸發
router.afterEach((to: any, from: any) => { 
  document.title = `${setting.title} - ${to.meta.title}`
  nprogress.done()
})