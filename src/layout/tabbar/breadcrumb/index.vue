<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="isFold ? 'fold' : 'Expand'"></component>
  </el-icon>
  <!-- 麵包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 動態展示路由名稱 -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon style="vertical-align: top">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'
defineOptions({
  name: 'Breadcrumb',
})
let $route = useRoute()
let layoutSettingStore = useLayoutSettingStore()
let isFold = ref(false) // 控制 sidebar 收合/展開
const changeIcon = () => {
  layoutSettingStore.isFold = !layoutSettingStore.isFold
}
</script>
<style scoped lang="scss"></style>
