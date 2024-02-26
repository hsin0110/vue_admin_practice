<template>
  <div>
    <el-card class="box-card">
      <!-- card - 新增品牌按鈕 -->
      <el-button
        type="primary"
        size="default"
        icon="plus"
        @click="addTrademark"
      >
        添加品牌
      </el-button>
      <!-- 表格 -->
      <el-table style="margin: 10px 0" border :data="trademarkArr">
        <el-table-column
          label="序號"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="品牌名稱" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO" prop="logoUrl">
          <template #default="{ row, $index }">
            <img
              :src="row.logoUrl"
              alt="尚未有圖片"
              style="width: 100px; height: 100hx"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="edit"
              @click="updateTrademark(row)"
            ></el-button>
            <!-- <el-button type="primary" size="small" icon="delete"></el-button> -->
            <el-popconfirm
              :title="`你確定要刪除${row.tmName}嗎?`"
              width="250px"
              icon="Delete"
              @confirm="removeTrademark(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- pagination -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="sizeChange"
        @current-change="getHasTrademark"
      />
    </el-card>

    <!-- 新增/編輯品牌彈窗 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '編輯品牌' : '添加品牌'"
      width="500"
    >
      <el-form
        style="width: 50%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item
          label="品牌名稱"
          :label-width="formLabelWidth"
          prop="tmName"
        >
          <el-input
            autocomplete="off"
            placeholder="請輸入品牌名稱"
            v-model="trademarkParams.tmName"
          />
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          :label-width="formLabelWidth"
          prop="logoUrl"
        >
          <!--  action="/api/admin/product/fileUpload" -->
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">確定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
// 當前頁碼
let pageNo = ref<number>(1)
// 每頁顯示多少筆數據
let pageSize = ref<number>(3)
let total = ref<number>(4)
let trademarkArr = ref<Records>([])

const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    pageSize.value,
  )
  console.log('result__', result)
  if (result.code === 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  } else {
    trademarkArr.value = [
      {
        id: 1,
        tmName: 'meow1',
        logoUrl: 'https://fakeimg.pl/100x100/?text=MEOW1',
      },
      {
        id: 2,
        tmName: 'meow2',
        logoUrl: 'https://fakeimg.pl/100x100/?text=MEOW2',
      },
      {
        id: 3,
        tmName: 'meow3',
        logoUrl: 'https://fakeimg.pl/100x100/?text=MEOW3',
      },
      {
        id: 4,
        tmName: 'meow4',
        logoUrl: 'https://fakeimg.pl/100x100/?text=MEOW4',
      },
    ]
  }
}

let formRef = ref()

// const changePageNo = () => {
//   console.log('changePageNo')
//   getHasTrademark()
// }

const sizeChange = (pageSize) => {
  console.log('sizeChange')
  getHasTrademark()
}

let dialogFormVisible = ref<boolean>(false)

const addTrademark = () => {
  dialogFormVisible.value = true
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')
  nextTick(() => {
    formRef.value?.clearValidate('tmName')
    formRef.value?.clearValidate('logoUrl')
  })
}
const updateTrademark = (row: TradeMark) => {
  nextTick(() => {
    formRef.value?.clearValidate('tmName')
    formRef.value?.clearValidate('logoUrl')
  })
  Object.assign(trademarkParams, row)
  dialogFormVisible.value = true
}

const formLabelWidth = ref<string>('80px')

let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: 'https://fakeimg.pl/100x100/?text=upload',
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  trademarkParams.logoUrl = response.data
  trademarkParams.logoUrl = 'https://fakeimg.pl/100x100/?text=upload'
  formRef.value.clearValidate('logoUrl')
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上傳文件大小應小於 4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上傳格式錯誤',
    })
    return false
  }
}

const cancel = () => {
  dialogFormVisible.value = false
}
const confirm = async () => {
  // 發送請求前，表單驗證
  await formRef.value.validate()

  let result: any = reqAddOrUpdateTrademark(trademarkParams)
  if (result.code === 200) {
    // 新增品牌成功
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '新增品牌成功',
    })
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    // 新增品牌失敗
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失敗' : '新增品牌失敗',
    })
  }
}

onMounted(() => {
  getHasTrademark()
})

const validatorTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名稱字數應不小於2'))
  }
}

const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('品牌圖片為必填'))
  }
}

const rules = {
  tmName: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorTmName,
    },
  ],
  logoUrl: [
    {
      required: true,
      // trigger: 'change',
      validator: validatorLogoUrl,
    },
  ],
}

const removeTrademark = async (id: number) => {
  let result = await reqDeleteTrademark(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '刪除品牌成功',
    })
    getHasTrademark(trademarkArr.value.length ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '刪除品牌失敗',
    })
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
