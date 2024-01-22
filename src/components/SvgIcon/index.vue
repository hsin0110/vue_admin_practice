<template>
  <!-- svg: 圖標外層容器節點；內部需要與 use 標籤結合使用 -->
  <svg :style="{ width, height }">
    <!-- xlink:href執行要用哪一個icon, 屬性值務必為 #icon-圖標名 -->
    <!-- 我需要把原 svg 裡的 fill 屬性移除掉，下方的設定才會生效 -->

    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>
<script setup lang="ts">
defineProps({
  // xlink:href 屬性前綴
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 提供使用圖標的名字
  name: String,
  // 接受父組件傳遞的顏色
  color: {
    type: String,
    default: '#FFBB77',
  },
  // 接受父組件傳遞的圖標寬度
  width: {
    type: String,
    default: '20px',
  },
  // 接受父組件傳遞的圖標高度
  height: {
    type: String,
    default: '20px',
  },
})
</script>
<style scoped></style>
