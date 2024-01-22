<template>
  <div>
    <div class="login__container">
      <el-row>
        <el-col :span="12" :xs="0"></el-col>
        <el-col :span="12">
          <el-form
            class="login-form"
            :model="loginForm"
            :rules="rules"
            ref="loginFormRef"
          >
            <h1>HELLO</h1>
            <h2>WELCOME TO MEOW</h2>
            <el-form-item prop="userName">
              <el-input
                :prefix-icon="User"
                v-model="loginForm.userName"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                :prefix-icon="Lock"
                v-model="loginForm.password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="login-form__btn"
                type="primary"
                size="default"
                @click="login"
                :loading="loading"
              >
                LOGIN
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time.ts'
let $router = useRouter()
const useStore = useUserStore()

const loginForm = reactive({
  userName: 'admin',
  password: '123456',
})

const loading = ref(false)
const loginFormRef = ref()
const login = async () => {
  loading.value = true
  // 發送登入請求
  // 請求成功 => 導至首頁
  // 請求失敗 => 顯示失敗訊息

  // let result = loginFormRef.value.validate()
  // console.log('result__', result)

  try {
    await useStore.userLogin(loginForm)
    $router.push('./')
    ElNotification({
      type: 'success',
      message: '歡迎回來',
      title: `${getTime()}安安`,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

const validatorUserName = (rule: any, value: any, callback: any) => {
  // console.log('validatorUserName')
  // console.log('rule__', rule)
  // console.log('value__', value)
  // console.log('callback__', callback)
  // if (/^\d{6, 10}$/.test(value)) {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('帳號長度至少六位'))
  }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  // console.log('validatorUserName')
  // console.log('rule__', rule)
  // console.log('value__', value)
  // console.log('callback__', callback)
  // if (/^\d{6, 10}$/.test(value)) {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密碼長度至少六位'))
  }
}

const rules = {
  userName: [
    // {
    //   required: true,
    //   message: '帳號不能為空',
    //   trigger: 'blur',
    // },
    // {
    //   required: true,
    //   min: 6,
    //   max: 10,
    //   message: '帳號長度至少六位',
    //   trigger: 'change',
    // },

    // 自定義較驗規則
    {
      validator: validatorUserName,
      trigger: 'change',
    },
  ],
  password: [
    // {
    //   required: true,
    //   min: 6,
    //   max: 15,
    //   message: '密碼長度至少六位',
    //   trigger: 'change',
    // },

    // 自定義較驗規則
    {
      validator: validatorPassword,
      trigger: 'change',
    },
  ],
}
</script>
<style scoped lang="scss">
.login {
  &__container {
    width: 100vw;
    height: 100vh;
    background-color: #ffeedd;
    background-image: url('@/assets/images/bg-login-container.jpg');
    background-repeat: no-repeat;
    background-size: contain;
  }
}

.login-form {
  position: relative;
  width: 80%;
  padding: 40px;
  top: 30vh;
  background-color: #162c38;

  h1 {
    color: #f5f2e5;
    font-size: 40px;
    font-family: monospace;
    margin-bottom: 6px;
  }

  h2 {
    color: #f5f2e5;
    font-size: 20px;
    margin-bottom: 20px;
    font-family: monospace;
  }

  &__btn {
    width: 100%;
    background-color: #417972;
    border-color: #417972;
    font-family: monospace;
    font-size: 18px;
  }
}
</style>
