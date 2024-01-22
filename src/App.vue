<template>
  <div class="box" v-if="false">
    <h1>測試svg</h1>
    <!-- svg: 圖標外層容器節點；內部需要與 use 標籤結合使用 -->
    <svg-icon name="vue" color="#FF7575" width="60px" height="60px"></svg-icon>
    <h1>測試使用全域組件</h1>
    <Pagination></Pagination>
  </div>

  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->

  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <div class="element-plus-box" v-if="false">
    <h2>測試使用 element-plus</h2>
    <el-button type="primary" size="default">我是按鈕</el-button>
    <el-button type="primary" size="default" :icon="Plus">
      有 icon 的按鈕
    </el-button>
  </div>
  <div class="axios-box" v-if="false">
    <h2>測試使用 axios 二次封裝</h2>
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import SvgIcon from "./components/SvgIcon/index.vue";
import { Plus } from '@element-plus/icons-vue'
// import request from '@/utils/request'
import { onMounted } from 'vue'
import { reqLogin } from './api/user'

// const str = 'meow meow meow'

onMounted(() => {
  // request({
  //   url: '/user/login',
  //   method: 'post',
  //   data: {
  //     userName: 'admin',
  //     password: '111111',
  //   },
  // }).then((res) => {
  //   console.log('res__', res)
  // })
  // reqLogin({ userName: 'admin', password: '111111' })
})
</script>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.box {
  width: 300px;
  // height: 300px;
  background: #333;
  h1 {
    color: $base-color;
  }
}
</style>
