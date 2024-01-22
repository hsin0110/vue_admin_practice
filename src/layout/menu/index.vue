<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 沒有子路由 -->
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-if="item.meta.isShow" @click="goRoute">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 僅有一個子路由 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="item.children[0].meta.isShow"
        :index="item.children[0].path"
      >
        <template #title>
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有多個子路由 -->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
// defineProps({
//   menuList: {
//     type: Array,
//     default: () => [],
//   },
// })
defineProps(['menuList'])
defineOptions({
  name: 'Menu',
})

const goRoute = (vc: any) => {
  console.log('vc__', vc.index)
}
// console.log('menuList__', menuList)
</script>
<!-- <script setup lang="ts">
export default {
  name: 'Menu',
}
</script> -->

<style scoped lang="scss"></style>
