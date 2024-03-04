<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名稱">
      <el-input placeholder="SKU名稱" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="價格(元)">
      <el-input
        placeholder="價格(元)"
        type="number"
        v-model="skuParams.price"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input
        placeholder="重量(克)"
        type="number"
        v-model="skuParams.weight"
      ></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        placeholder="SKU描述"
        type="textarea"
        v-model="skuParams.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台屬性">
      <el-form :inline="true">
        <el-form-item
          :label="item.attrName"
          v-for="(item, index) in attrArr"
          :key="item.id"
        >
          <el-select v-model="item.attrIdAndValueId">
            <el-option
              :value="`${item.id}:${attrValue.id}`"
              v-for="(attrValue, index) in item.attrValueList"
              :key="attrValue.id"
              :label="attrValue.valueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="銷售屬性">
      <el-form :inline="true">
        <el-form-item
          :label="item.saleAttrName"
          v-for="(item, index) in saleArr"
          :key="item.id"
        >
          <el-select v-model="item.saleIdAndValueId">
            <el-option
              :value="`${item.id}:${saleAttrValue.id}`"
              :label="saleAttrValue.saleAttrValueName"
              v-for="(saleAttrValue, index) in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="圖片名稱">
      <el-table border :data="imgArr" ref="table">
        <el-table-column
          type="selection"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="圖片">
          <template #="{ row, $index }">
            <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名稱" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" @click="handler(row)">
              設置默認
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import {
  watch,
  ref,
  reactive,
  nextTick,
  onBeforeUnmount,
  defineEmits,
  defineExpose,
} from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqHasSpu } from '@/api/product/spu'
import type {
  HasSpuResponseData,
  Records,
  SkuData,
} from '@/api/product/spu/type'

import {
  reqAttr,
  reqAddOrUpdateAttr,
  reqRemoveAttr,
  reqAddSku,
} from '@/api/product/attr'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
import { ElMessage } from 'element-plus'
let $emit = defineEmits('changeScene')

const cancel = () => {
  $emit('changeScene', { flag: 0, params: '' })
}
// 平台屬性
let attrArr = ref<any>([])
// 銷售屬性
let saleArr = ref<any>([])
// 照片牆數據
let imgArr = ref<any>([])
// 獲取 table 組件實例
let table = ref<any>()
// 收集 SKU 參數
let skuParams = reactive<SkuData>({
  category3Id: '', // 三級分類ID
  spuId: '', // 已有的 SPU ID
  tmId: '', // SPU品牌ID
  skuName: '', // sku 名字
  price: '', // sku 價格
  weight: '', // sku 重量
  skuDesc: '', // sku的描述
  skuAttrValueList: [
    // 平台屬性的收集
    // {
    //   attrId: '', // 平台屬性的 ID
    //   valueId: '', // 屬性值的ID
    // },
  ],
  skuSaleAttrValueList: [
    // 銷售屬性
    // {
    //   saleAttrId: '', // 屬性的 ID
    //   saleAttrValueId: '', // 屬性值的ID
    // },
  ],
  skuDefaultImg: '', // sku 圖片地址
})
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: any,
) => {
  // 獲取添加 SKU 需要的數據
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id
  skuParams.tmId = spu.tmId
  // 獲取平台屬性
  let result: any = await reqAttr(c1Id, c2Id, spu.category3Id)
  if (result.code === 200) {
  }
  attrArr.value = result.date
  // 獲取銷售屬性
  let result1: any = await reqSpuHasSaleAttr(spu.id)
  if (result1.code === 200) {
  }
  saleArr.value = result1.date
  // 獲取照片牆數據
  let result2: any = await reqSpuImageList(spu.id)
  if (result2.code === 200) {
  }
  imgArr.value = result2.date
}

// 設置默認圖片
const handler = (row: any) => {
  // 點擊時，全部的圖片複選框不勾選
  imgArr.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false)
  })
  // 選中的圖片才勾選
  table.value.toggleRowSelection(row, true)

  skuParams.skuDefaultImg = row.imgUrl
}

const save = async () => {
  // 整理平台屬性
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({ attrId, valueId })
    }
    return prev
  }, [])

  // 整理銷售屬性
  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
        prev.push({ saleAttrId, saleAttrValueId })
      }
      return prev
    },
    [],
  )

  let result: any = await reqAddSku(skuParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加 SKU 成功',
    })
    $emit('changeScene', { flag: 0, params: '' })
  } else {
    ElMessage({
      type: 'error',
      message: '添加 SKU 失敗',
    })
  }
}
defineExpose({ initSkuData })

// ---
let categoryStore = useCategoryStore()
let scene = ref<number>(0)
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)

let records = ref<Records>([])
let total = ref<number>(0)

watch(
  () => categoryStore.c3Id,
  () => {
    // 清空上一次查詢結果
    records.value = []
    // c3Id 有值才發送請求
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)

const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (result.code === 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}

const changeSize = () => {
  getHasSpu()
}
</script>
<style lang="scss"></style>
