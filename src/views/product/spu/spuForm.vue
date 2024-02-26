<template>
  <el-form :inline="true" label-width="100px">
    <el-form-item label="SPU名稱">
      <el-input
        placeholder="請輸入SPU名稱"
        v-model="SpuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="SpuParams.tmId">
        <el-option
          v-for="(item, index) in allTrademark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="請輸入SPU描述"
        v-model="SpuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handlerUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU銷售屬性">
      <!-- 展示銷售屬性的下拉選單 -->
      <el-select
        v-model="saleAttrIdAndValueName"
        :placeholder="
          unSelectSaleAttr.length
            ? `還未選擇${unSelectSaleAttr.length}個`
            : '無'
        "
      >
        <el-option
          v-for="(item, index) in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        type="primary"
        size="default"
        icon="Plus"
        :disabled="saleAttrIdAndValueName ? false : true"
        @click="addSaleAttr"
      >
        添加屬性值
      </el-button>
      <el-table border style="margin: 10px 0" :data="saleAttr">
        <el-table-column
          label="序號"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="銷售屬性名字"
          width="120px"
          props="saleAttrName"
        ></el-table-column>
        <el-table-column label="銷售屬性值" width="100px">
          <template #="{ row, $index }">
            <el-tag
              @close="row.spuSaleAttrValueList.splice(index, 1)"
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="row.id"
              closable
              style="margin: 0 5px"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.flag"
              v-model="row.saleAttrValue"
              placeholder="請輸入屬性值"
              size="small"
              style="width: 100px"
              @blur="toLook(row)"
            ></el-input>
            <el-button
              v-else
              type="primary"
              size="small"
              icon="Plus"
              @click="toEdit(row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
        <el-form-item>
          <el-button
            style="margin-left: 10px"
            type="primary"
            size="default"
            @click="save"
            :disabled="saleAttr.length > 0 ? false : true"
          >
            保存
          </el-button>
          <el-button
            style="margin-left: 10px"
            type="primary"
            size="default"
            @click="cancel"
          >
            取消
          </el-button>
        </el-form-item>
      </el-table>
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
  onMounted,
  computed,
} from 'vue'
import type {
  SpuData,
  AllTrademark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  Trademark,
  SpuImg,
  SaleAttr,
  HasSaleAttr,
  SaleAttrValue,
} from '@/api/product/spu/type'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
import { ElMessage } from 'element-plus'

let $emit = defineEmits('[changeScene]')
const cancel = () => {
  $emit('changeScene', { flag: 0, params: 'update' })
}

onMounted(() => {})

let dialogVisible = ref<boolean>(false)
let dialogImageUrl = ref<string>('')

// 存已有的 SPU 以下數據
let allTrademark = ref<Trademark[]>([])
// 商品圖片
let imgList = ref<SpuImg[]>([])
// 已有的 SPU 銷售屬性
let saleAttr = ref<SaleAttr[]>([])
// 全部銷售屬性
let allSaleAttr = ref<HasSaleAttr[]>([])

// 存已有的 SPU 對象
// {
//   category3Id: "", // 三級類別 id
//     spuName: "", // SPU 名字
//     description: "", // SPU 描述
//     tmId: "", // 品牌 id
//     spuImageList: [],
//     spuSaleAttrList:[]

// }
let SpuParams = ref<SpuData>({
  category3Id: '', // 三級類別 id
  spuName: '', // SPU 名字
  description: '', // SPU 描述
  tmId: '', // 品牌 id
  spuImageList: [],
  spuSaleAttrList: [],
})

const initHasSpuData = async (spu: SpuData) => {
  SpuParams.value = spu
  // spu 即為父組件傳遞過來的已有的 SPU 對象[不完整]
  // 獲取全部品牌的數據
  let result: AllTrademark[] = await reqAllTradeMark()
  // 獲取某一品牌其下全部售賣商品的圖片
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number)
  // 獲取已有的 SPU 銷售屬性的數據
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  // 獲取整個項目全部 SPU 的銷售屬性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr()

  // 存全部品牌的數據
  allTrademark.value = result.data
  // SPU 對應商品的圖片
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  // 存已有的 SPU 銷售屬性
  saleAttr.value = result2.data
  // 存全部的銷售屬性
  allSaleAttr.value = result3.data
}

// 照片牆點預覽時觸發
const handlePictureCardPreview = (file: any) => {
  dialogVisible.value = true
  dialogImageUrl.value = file.url
}
// 照片牆點刪除時觸發
const handleRemove = () => {}
// 上傳成功前約束文件大小與類型
const handlerUpload = (file: any) => {
  if (
    file.type === 'image/png' ||
    file.type === 'image/jpeg' ||
    file.type === 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上傳文件大小須 < 3',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上傳文件須為png|jpeg|gif',
    })
    return false
  }
}

// 計算當前 SPU 還未擁有的銷售屬性
let unSelectSaleAttr = computed(() => {
  // 全部銷售屬性: 顏色、版本、尺碼
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name !== item1.saleAttrName
    })
  })
  return unSelectArr
})

// 將來收集還未選擇的銷售屬性的 ID 與屬性值的名字
let saleAttrIdAndValueName = ref<string>('')

// 添加銷售屬性
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  saleAttr.value.push(newSaleAttr)
  // 清空收集的數據
  saleAttrIdAndValueName.value = ''
}

const toEdit = (row: SaleAttr) => {
  row.flag = true
  row.saleAttrValue = ''
}
const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row

  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }
  if ((saleAttrValue as string).trim() === '') {
    ElMessage({
      type: 'error',
      message: '屬性值不能為空',
    })
    return
  }
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName === saleAttrValue
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '屬性值重複',
    })
    return
  }
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.flag = false
}

const save = async () => {
  // 1. 照片牆數據
  SpuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.data) || item.url,
    }
  })

  // 2. 銷售屬性的數據
  SpuParams.value.spuSaleAttrList = saleAttr.value
  let result = await reqAddOrUpdateSpu(SpuParams.value)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '更新成功' : '添加成功',
    })
    $emit('changeScene', {
      flag: 0,
      params: SpuParams.value.id ? 'update' : 'add',
    })
  } else {
    ElMessage({
      type: 'error',
      message: SpuParams.value.id ? '更新失敗' : '添加失敗',
    })
  }
}
// 添加一個新的 SPU 初始化請求方法
const initAddSpu = async (c3Id: number | string) => {
  Object.assign(SpuParams.value, {
    category3Id: '', // 三級類別 id
    spuName: '', // SPU 名字
    description: '', // SPU 描述
    tmId: '', // 品牌 id
    spuImageList: [],
    spuSaleAttrList: [],
  })
  // 清空照片
  imgList.value = []
  // 清空銷售數據
  saleAttr.value = []
  saleAttrIdAndValueName.value = ''
  SpuParams.value.category3Id = c3Id
  let result: AllTrademark = await reqAllTradeMark()
  let result1: HasSaleAttrResponseData = await reqAllSaleAttr()
  allTrademark.value = result.data
  allSaleAttr.value = result1.data
}

defineExpose({ initHasSpuData, initAddSpu })
</script>
<style lang="scss"></style>
