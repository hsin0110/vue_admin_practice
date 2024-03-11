<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用戶名:">
        <el-input placeholder="請輸入用戶搜索名稱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="default" size="default">搜索</el-button>
        <el-button type="default" size="default">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="default" size="default" @click="addUser">
      添加用戶
    </el-button>
    <el-button type="default" size="default">批量刪除</el-button>
    <el-table style="margin: 10px 0" border :data="userArr">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column
        label="用戶名字"
        align="center"
        prop="userName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用戶名稱"
        align="center"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用戶角色"
        align="center"
        prop="roleName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="創建時間"
        align="center"
        prop="createTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="更新時間"
        align="center"
        prop="updateTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="addSku(row)"
            title="分配角色"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateUser(row)"
            title="編輯"
          ></el-button>

          <el-popconfirem
            :title="`你確定刪除${row.spuName}嗎?`"
            width="200px"
            @confirm="deleteSpu(row)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirem>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="changeSize"
      @current-change="getHasUser"
    />
  </el-card>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ userParams.id ? '更新用戶' : '添加用戶' }}</h4>
    </template>
    <template #default>
      <el-form :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用戶姓名" prop="userName">
          <el-input
            placeholder="請填寫用戶姓名"
            v-model="userParams.userName"
          ></el-input>
        </el-form-item>
        <el-form-item label="用戶暱稱" prop="name">
          <el-input
            placeholder="請填寫用戶暱稱"
            v-model="userParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="用戶密碼" prop="password" v-if="!userParams.id">
          <el-input
            placeholder="請填寫用戶密碼"
            v-model="userParams.password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">確定</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqUserInfo, reqAddOrUpdateUser } from '@/api/acl/user'
import type {
  UserResponseData,
  Records,
  User,
  ResponseData,
} from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'

let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let userArr = ref<Records>([])
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value)
  if (result.code === 200) {
    userArr.value = result.data.records
    total.value = result.data.total
  }
}

const changeSize = () => {
  getHasUser()
}

let drawer = ref<boolean>(false)
const addUser = () => {
  drawer.value = true
  Object.assign(userParams, {
    id: 0,
    userName: '',
    name: '',
    password: '',
  })
  nextTick(() => {
    formRef.value.clearValidate('userName')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
const updateUser = (row: User) => {
  drawer.value = true
  Object.assign(userParams, row)
  nextTick(() => {
    formRef.value.clearValidate('userName')
    formRef.value.clearValidate('name')
  })
}

const cancel = () => {
  drawer.value = false
}

let userParams = reactive<User>({
  userName: '',
  name: '',
  password: '',
})

let formRef = ref<any>()

const save = async () => {
  await formRef.value.validate()

  let result: any = await reqAddOrUpdateUser(userParams)
  if (result.code === 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: userParams.id ? '編輯成功' : '添加成功',
    })
    // getHasUser(userParams.id ? pageNo.value : 1) // 因有觸發 reload 所以可有可無
    // 若更新的是當前帳號，讓瀏覽器自動刷新一次(router 會判斷是否放行)
    window.location.reload()
  } else {
    drawer.value = false
    ElMessage({
      type: 'error',
      message: userParams.id ? '編輯失敗' : '添加失敗',
    })
  }
}

const validatorUserName = (rule: any, value: any, callback: any) => {
  // if (/^\d{6, 10}$/.test(value)) {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用戶名字至少五位'))
  }
}

const validatorName = (rule: any, value: any, callback: any) => {
  // if (/^\d{6, 10}$/.test(value)) {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用戶名稱至少五位'))
  }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  // if (/^\d{6, 10}$/.test(value)) {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('用戶密碼至少六位'))
  }
}

const rules = {
  userName: [
    // 自定義較驗規則
    {
      required: true,
      validator: validatorUserName,
      trigger: 'blur',
    },
  ],
  name: [
    // 自定義較驗規則
    {
      required: true,
      validator: validatorName,
      trigger: 'blur',
    },
  ],
  password: [
    // 自定義較驗規則
    {
      validator: validatorPassword,
      trigger: 'blur',
    },
  ],
}
onMounted(() => {
  getHasUser()
})
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
