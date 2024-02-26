<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一級分類">
        <el-select
          v-model="categoryStore.c1Id"
          @change="handler"
          :disabled="scene === 0 ? false : true"
        >
          <el-option
            v-for="(c1, index) in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二級分類">
        <el-select
          v-model="categoryStore.c2Id"
          @change="handler1"
          :disabled="scene === 0 ? false : true"
        >
          <el-option
            v-for="(c2, index) in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三級分類">
        <el-select
          v-model="categoryStore.c3Id"
          :disabled="scene === 0 ? false : true"
        >
          <el-option
            v-for="(c3, index) in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
// 引入分類接口方法
import { reqC1 } from '@/api/product/attr'
import { ref, onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
let c1Arr = ref<any>([])
let c1Id = ref<number | string>('')
onMounted(() => {
  getC1()
})

const getC1 = async () => {
  // let result: any = await reqC1()
  // console.log('result__', result)
  // if (result.code === 200) {
  //   c1Arr.value = result.data
  // }
  categoryStore.getC1()
}

const handler = () => {
  // 須將二級 id 與 三級 id、三級數據清空
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
  // 獲取二級
  categoryStore.getC2()
}

const handler1 = () => {
  // 須將三級 id清空
  categoryStore.c3Id = ''
  // 獲取三級
  categoryStore.getC3()
}

defineProps(['scene'])
</script>
