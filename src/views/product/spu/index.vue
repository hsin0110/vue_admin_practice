<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <div v-show="scene === 0">
        <el-button
          @click="addSpu"
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
        >
          添加SPU
        </el-button>
        <el-table border style="margin: 10px 0" :data="records">
          <el-table-column
            label="序號"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="SPU名稱"
            width="120px"
            prop="spuName"
          ></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          >
            <template #="{ row, $index }">
              <el-tag
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
                style="margin: 5px"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="SPU操作" width="120px">
            <!-- row: 已有的屬性對象 -->
            <template #="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                @click="addSku(row)"
                title="添加SKU"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateSpu(row)"
                title="修改SPU"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="View"
                @click="findSku(row)"
                title="查看SKU列表"
              ></el-button>
              <!-- <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="updateAttr(row)"
                title="刪除SKU列表"
              ></el-button> -->

              <el-popconfirem
                :title="`你確定刪除${row.spuName}嗎?`"
                width="200px"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirem>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @size-change="changeSize"
          @current-change="getHasSpu"
        />
      </div>
      <!-- 添加/修改SPU子組件 -->
      <SpuForm ref="spuForm" v-show="scene === 1" @changeScene="changeScene" />
      <!-- 添加SKU子組件 -->
      <SkuForm ref="skuForm" v-show="scene === 2" @changeScene="changeScene" />
      <el-dialog title="SKU列表" v-model="show">
        <el-table border :data="skuArr">
          <el-table-column label="sku名字" prop="skuName"></el-table-column>
          <el-table-column label="sku價格" prop="price"></el-table-column>
          <el-table-column label="sku重量" prop="weight"></el-table-column>
          <el-table-column label="sku圖片">
            <template #="{ row, $index }">
              <img
                :src="row.skuDefaultImg"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu'
import type {
  HasSpuResponseData,
  Records,
  SpuData,
  SkuInfoData,
  SkuData,
} from '@/api/product/spu/type'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
let scene = ref<number>(0) // 0: 顯示已有 SPU  1: 添加/修改已有 SPU  2: 添加 SKU
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)

let records = ref<Records>([])
let total = ref<number>(0)

let spuForm = ref<any>()
let skuForm = ref<any>()

let skuArr = ref<SkuData[]>([])
let show = ref<boolean>(false)

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

const addSpu = () => {
  scene.value = 1
  spuForm.value.initAddSpu(categoryStore.c3Id)
}

const changeScene = (obj: any) => {
  scene.value = obj.flag
  if (obj.params === 'update') {
    // 更新留在當前頁
    getHasSpu(pageNo.value)
  } else {
    // 新增留在第一頁
    getHasSpu()
  }
}

const updateSpu = (row: SpuData) => {
  scene.value = 1
  // 調用子組件方法獲取完整已有的 SPU 數據
  spuForm.value.initHasSpuData(row)
}

// 添加 SKU
const addSku = (row: SpuData) => {
  scene.value = 2
  skuForm.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
// 查看 SKU
const findSku = async (row: SpuData) => {
  let result: SkuInfoData = await reqSkuList(row.id as number)
  if (result.code === 200) {
    skuArr.value = result.data
    show.value = true
  }
}

// 刪除已有的 SPU
const deleteSpu = async (row: SpuData) => {
  let result: any = await reqRemoveSpu(row.id as number)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '刪除成功',
    })
    // 獲取剩餘的 SPU 數據
    getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '刪除失敗',
    })
  }
}
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>
<style lang="scss"></style>
