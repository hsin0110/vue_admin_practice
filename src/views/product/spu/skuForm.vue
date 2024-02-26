<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <el-button
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
              @click="updateAttr(row)"
              title="添加SKU"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateAttr(row)"
              title="修改SKU"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="View"
              @click="updateAttr(row)"
              title="查看SKU列表"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="updateAttr(row)"
              title="刪除SKU列表"
            ></el-button>

            <el-popconfirem
              :title="`你確定刪除${row.attrName}?`"
              width="200px"
              @confirm="deleteAttr(row.id)"
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
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqHasSpu } from '@/api/product/spu'
import type { HasSpuResponseData, Records } from '@/api/product/spu/type'
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
