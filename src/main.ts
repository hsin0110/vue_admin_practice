import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'

const app = createApp(App)

// svg 插件需要配置代碼
import GlobalComponent from '@/components'
console.log('GlobalComponent__', GlobalComponent)
// 安裝自定義插件
app.use(GlobalComponent)
// import SvgIcon from "./components/SvgIcon/index.vue";
// app.component('SvgIcon', SvgIcon)

// 引用 element-plus 插件與樣式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 
import en from 'element-plus/dist/locale/en.mjs'
app.use(ElementPlus, {
  locale: en // element-plus 國際化配置
})

// console.log('import.meta.env__', import.meta.env)

// 引入全局樣式
import '@/styles/index.scss'

import router from './router'
app.use(router)
import pinia from './store'
app.use(pinia)

import './permission'
app.mount('#app')
