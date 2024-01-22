// 透過 vue-router 實現模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'

// 創建路由
const router = createRouter({
  // 路由模式 hash
  history: createWebHashHistory(),
  routes: constantRoute,
  // 滾動行為
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
  
})

export default router