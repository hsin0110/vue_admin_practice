// 引入項目中全部的全局組件
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import Category from './Category/index.vue'

// 全局對象
const allGlobalComponent = {
  SvgIcon,
  Pagination,
  Category
}
console.log('allGlobalComponent__', allGlobalComponent)

// 引入 element-plus 全部 icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 對外暴露插件對象
export default {
  // 務必為 install 方法
  install(app) {
    console.log('123')
    console.log('app__', app)
    // 註冊為全域組件
    Object.keys(allGlobalComponent).forEach((key) => {
      console.log('key__', key)
      app.component(key, allGlobalComponent[key])
    })

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) { 
      app.component(key, component)
    }
  },
}
