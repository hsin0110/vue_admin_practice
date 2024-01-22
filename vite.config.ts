// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// // 引用 svg 需要的插件
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import path from 'path'
// // import viteMockServe from 'vite-plugin-mock'

// // https://vitejs.dev/config/
// export default defineConfig({
// // export default ({ command }) => {

//   plugins: [
//     vue(),
//     createSvgIconsPlugin({
//       // Specify the icon folder to be cached.
//       iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
//       // Specify symbolId format
//       symbolId: 'icon-[dir]-[name]',
//     }),   
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve("./src") // 相對路徑別名配置，使用 @ 代替 src
//     }
//   },
//   // scss 全域變量配置
//   css: {
//     preprocessorOptions: {
//       scss: {
//         javascriptEnabled: true,
//         additionalData: '@import "./src/styles/variable.scss";'
//       }
//     }
//   }
// })

import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相對路徑別名配置，使用 @ 代替 src
      }
    },
    // scss 全域變量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    }
  }
}

