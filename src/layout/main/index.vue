<template>
  <!-- 路由組件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染 layout 一級路由組件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>
<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
defineOptions({
  name: 'Main',
})
let layoutSettingStore = useLayoutSettingStore()
let flag = ref(true)
watch(
  () => layoutSettingStore.refresh,
  () => {
    console.log(123)
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
