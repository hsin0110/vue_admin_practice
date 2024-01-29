<template>
  <div>
    <h1>一級路由登入-登入成功</h1>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()

// 目前首頁掛載完後，發送請求獲取用戶資訊
onMounted(() => {
  console.log('onMounted')
  userStore.userInfo()
})
</script>
<style scoped lang="scss"></style>
