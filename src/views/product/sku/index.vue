<template>
  <el-card>
    <el-table border style="margin: 10px 0" :data="skuArr">
      <el-table-column
        label="序號"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column
        label="名稱"
        show-overflow-tooltip
        width="150px"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="150px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="默認圖片">
        <template #="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="重量(g)"
        width="150px"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="價格(元)"
        width="150px"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" width="250px">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            @click="updateSale(row)"
            :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            @click="updateSku"
            icon="Edit"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            @click="findSku(row)"
            icon="infoFilled"
          ></el-button>
          <el-popconfirm
            :title="`你確定要刪除${row.skuName}嗎?`"
            width="200px"
            @confirm="removeSku(row.id)"
          >
            <template #reference>
              <el-button
                type="primary"
                size="small"
                @click=""
                icon="Delete"
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="handler"
      @current-change="getHasSku"
    />
    <!-- 展示商品詳情 -->

    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品詳情</h4>
      </template>
      <template #default>
        <el-row style="margin: 5px 0">
          <el-col :span="6">名稱</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 5px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 5px 0">
          <el-col :span="6">價格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 5px 0">
          <el-col :span="6">平台屬性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="(item, index) in skuInfo.skuAttrValueList"
              :key="item.id"
              style="margin: 5px"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 5px 0">
          <el-col :span="6">銷售屬性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
              style="margin: 5px"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 5px 0">
          <el-col :span="6">商品圖片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  alt=""
                  style="width: 100%; height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  reqSkuList,
  reqSaleSku,
  reqCancelSale,
  reqSkuInfo,
  reqRemoveSku,
} from '@/api/product/sku'
import type {
  SkuResponseData,
  SkuData,
  SkuInfoData,
} from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'

let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
let drawer = ref<boolean>(false)
let skuInfo = ref<any>({})
const getHasSku = async (pager = 1) => {
  pageNo.value = pager
  let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if (result.code === 200) {
    total.value = result.data.total
    skuArr.value = result.data.records
  }
}

const handler = (pageSize: number) => {
  // pagination 下拉菜單發生變化
  getHasSku()
}

// 商品上架與下架
const updateSale = async (row: SkuData) => {
  // 當前商品為上架狀態，更新為下架
  if (row.isSale === 1) {
    await reqCancelSale(row.id as number)
    ElMessage({
      type: 'success',
      message: '下架成功',
    })
    getHasSku(pageNo.value)
  } else {
    await reqSaleSku(row.id as number)
    ElMessage({
      type: 'success',
      message: '上架成功',
    })
    getHasSku(pageNo.value)
  }
}

const updateSku = () => {
  ElMessage({
    type: 'success',
    message: '程序員努力更新中..',
  })
}

const findSku = async (row: SkuData) => {
  drawer.value = true

  // 獲取已有商品詳情
  let result: SkuInfoData = await reqSkuInfo(row.id as number)
  if (result.code === 200) {
    skuInfo.value = result.data
  }
}

const removeSku = async (id: number) => {
  let result = await reqRemoveSku(id)
  if (result === 200) {
    ElMessage({
      type: 'success',
      message: '刪除成功',
    })
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '刪除失敗',
    })
  }
}

onMounted(() => {
  getHasSku()
})
</script>
<style lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
