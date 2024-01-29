<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefresh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <!-- ../../../public/logo-meow.jpg -->
  <img
    :src="userStore.avatar"
    alt=""
    style="width: 24px; height: 24px; margin: 0px 10px"
  />
  <!-- 下拉選單 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.userName }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import useLayoutSettingStore from '@/store/modules/setting'
import { useRouter, useRoute } from 'vue-router'
let layoutSettingStore = useLayoutSettingStore()
defineOptions({
  name: 'Setting',
})

// 獲取用戶資訊相關
import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore()

const updateRefresh = () => {
  console.log('updateRefresh')
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

// 全螢幕模式
const fullScreen = () => {
  console.log('fullScreen')
  let full = document.fullscreenElement
  if (!full) {
    // requestFullscreen 實現全螢幕
    document.documentElement.requestFullscreen()
  } else {
    // 退出全螢幕
    document.exitFullscreen()
  }
}

let $router = useRouter()
let $route = useRoute()

// logout
const logout = () => {
  // 發送登出請求
  // 清除用戶相關資料
  // 跳轉登入頁面
  userStore.userLogout()
  $router.push({
    path: '/login',
    query: {
      redirect: $route.path,
    },
  })
}
</script>
<style scoped lang="scss"></style>
