<template>
  <Category :scene="scene" />
  <el-card style="margin: 10px 0">
    <div v-show="scene === 0">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="categoryStore.c3Id ? false : true"
        @click="addAttr"
      >
        添加屬性
      </el-button>
      <el-table border style="margin: 10px 0" :data="attrArr">
        <el-table-column
          label="序號"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="屬性名稱"
          width="120px"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="屬性值名稱">
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
        <el-table-column label="操作" width="120px">
          <!-- row: 已有的屬性對象 -->
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateAttr(row)"
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
    </div>
    <div v-show="scene === 1">
      <el-form :inline="true">
        <el-form-item label="屬性名稱">
          <el-input
            placeholder="請輸入屬性名稱"
            v-model="attrParams.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="attrParams.attrName ? false : true"
        @click="addAttrValue"
      >
        添加屬性值
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-table border style="margin: 10px 0" :data="attrParams.attrValueList">
        <el-table-column
          label="序號"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="屬性值名稱" width="120px" prop="attrName">
          <!-- row：為當前屬性值對象 -->
          <template #="{ row, $index }">
            <el-input
              :ref="(vc: any) => (inputArr[$index] = vc)"
              v-if="row.flag"
              @blur="tooLook(row, $index)"
              placeholder="請輸入屬性值名稱"
              v-model="row.valueName"
              size="small"
            ></el-input>
            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="屬性值操作">
          <template #="{ row, index }">
            <!-- <el-tag
              v-for="(item, index) in row.attrValueList"
              :key="item.id"
              style="margin: 5px"
            >
              {{ item.valueName }}
            </el-tag> -->
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="attrParams.attrValueList.splice(index, 1)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <!-- row: 已有的屬性對象 -->
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateAttr"
            ></el-button>
            <el-button type="primary" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        size="default"
        @click="save"
        :disabled="attrParams.attrValueList.length > 0 ? false : true"
      >
        保存
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()

let attrArr = ref<Attr[]>([])
let scene = ref<number>(0)

watch(
  () => categoryStore.c3Id,
  () => {
    // 清空上一次查詢結果
    attrArr.value = []
    // c3Id 有值才發送請求
    if (!categoryStore.c3Id) return
    getAttr()
  },
)

const getAttr = async () => {
  // 獲取各級分類的 id
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code === 200) {
    attrArr.value = result.data
  }
}

const addAttr = () => {
  Object.assign(attrParams, {
    attrName: '', // 新增的屬性的名字
    attrValueList: [
      // 新增的屬性值數組
    ],
    categoryId: categoryStore.c3Id, // 三級分類 id
    categoryLevel: 3, // 代表的是三級分類
  })
  scene.value = 1
}
const updateAttr = (row: Attr) => {
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  scene.value = 1
}

const cancel = () => {
  scene.value = 0
}

// 收集新增的屬性的數據
const attrParams = reactive<Attr>({
  attrName: '', // 新增的屬性的名字
  attrValueList: [
    // 新增的屬性值數組
  ],
  categoryId: '', // 三級分類 id
  categoryLevel: 3, // 代表的是三級分類
})

const addAttrValue = () => {
  // click 添加屬性值按鈕
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, // 控制編輯/查看模式的切換
  })
  // 獲取最後 el-input 聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

const save = async () => {
  let result: any = await reqAddOrUpdateAttr(attrParams)
  if (result.code === 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失敗' : '添加失敗',
    })
  }
}

const tooLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() === '') {
    // 刪除調用對應屬性值為空的元素
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '屬性值不能為空',
    })
    return
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    // 將重複的屬性值移除
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '屬性值不能重複',
    })
    return
  }

  row.flag = false
}
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

let inputArr = ref<any>([])

const deleteAttr = async (attrId: number) => {
  let result = await reqRemoveAttr(attrId)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '刪除成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '刪除失敗',
    })
  }
}

// 路由組件銷毀時，把 categoryStore 相關數據清空
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>
<style lang="scss"></style>
