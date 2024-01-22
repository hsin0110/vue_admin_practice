<template>
  <div class="layout-container">
    <!-- sidebar -->
    <div class="layout-container__slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <!-- <p v-for="item in 100" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p> -->
        <el-menu background-color="#403f3c" text-color="#efecea">
          <Menu :menuList="userStore.menuRoutes"></Menu>
          <!-- <el-menu-item index="1">首頁</el-menu-item>
          <el-menu-item index="1">數據</el-menu-item>
          <el-sub-menu index="3">
            <template #title>3</template>
            <el-menu-item index="3-1">3-1</el-menu-item>
            <el-menu-item index="3-1">3-2</el-menu-item>
          </el-sub-menu> -->
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 麵包屑 -->
    <div class="layout-container__tabbar">tabbar</div>
    <!-- 主內容 -->
    <div class="layout-container__main">main</div>
  </div>
</template>
<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '@/store/modules/user'

let userStore = useUserStore()
console.log('userStore__', userStore)
const menuRoutes = userStore.menuRoutes
console.log('menuRoutes__', menuRoutes)
</script>
<style scoped lang="scss">
.layout-container {
  position: relative;
  width: 100%;
  height: 100vh;
  // background-color: lemonchiffon;

  &__slider {
    width: $base-slider-width;
    height: 100vh;
    background-color: $base-slider-background;
  }

  &__tabbar {
    position: fixed;
    top: 0;
    left: $base-slider-width;
    width: calc(100% - $base-slider-width);
    height: $base-tabBar-height;
    background-color: $base-tabBar-background;
  }

  &__main {
    position: absolute;
    top: $base-tabBar-height;
    left: $base-slider-width;
    width: calc(100% - $base-slider-width);
    height: calc(100vh - $base-tabBar-height);
    padding: 20px;
    background-color: #efecea;
    overflow: auto;
  }
}

.scrollbar {
  width: 100%;
  height: calc(100vh - $base-logo-height);

  .el-menu {
    border-right: none;
  }
}
</style>
