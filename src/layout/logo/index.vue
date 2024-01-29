<template>
  <div class="logo" v-if="setting.showLogo">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>
<script setup lang="ts">
import setting from '@/setting'
defineOptions({
  name: 'Logo',
})
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-logo-height;
  display: flex;
  align-items: center;
  padding: 20px;

  img {
    width: 48px;
    height: 48px;
  }

  p {
    font-size: $base-logo-title-fontSize;
    color: #efecea;
    margin-left: 10px;
  }
}
</style>
