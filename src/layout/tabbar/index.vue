<template>
  <div class="tabbar">
    <div class="tabbar__left">
      <Breadcrumb />
    </div>
    <div class="tabbar__right">
      <Setting />
    </div>
  </div>
</template>
<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'

defineOptions({
  name: 'Tabbar',
})
</script>
<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  &__left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  &__right {
    display: flex;
    align-items: center;
  }
}
</style>
