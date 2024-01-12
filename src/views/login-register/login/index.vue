<template>
  <div
    class="bg-white dark:bg-zinc-800 xl:bg-zinc-200 relative w-screen h-screen"
  >
    <!-- 头部图标：pc端 -->
    <div class="hidden pt-5 h-8 xl:block">
      <img
        src="https://res.lgdsunday.club/signlogo.png"
        class="m-auto"
        v-lazy
      />
    </div>
    <!-- 头部图标：移动端 -->
    <div class="h-[111px] xl:hidden">
      <!-- 背景图 -->
      <img
        src="https://res.lgdsunday.club/login-bg.png"
        alt=""
        class="dark:hidden"
      />
      <!-- icon图 -->
      <img
        src="https://p3-passport.byteacctimg.com/img/user-avatar/7ae393c9f87273cf4d4942f9354c6aa5~150x150.awebp"
        alt=""
        class="absolute top-[5%] left-[50%] translate-x-[-50%] h-5"
      />
    </div>
    <!-- 表单区域 -->
    <div
      class="bg-white dark:bg-zinc-800 w-screen xl:dark:bg-zinc-900 xl:w-[388px] px-3 mt-4 m-auto xl:mt-8 xl:py-4 xl:rounded xl:shadow-lg"
    >
      <h3
        class="mb-2 text-center text-base font-semibold text-main hidden xl:block dark:text-zinc-300"
      >
        账号登录
      </h3>
      <vee-form @submit="onSubmit">
        <vee-field
          type="text"
          class="dark:bg-zinc-800 xl:dark:bg-zinc-900 outline-none dark:text-white border-b-zinc-400 border-b-[1px] px-1 pb-1 text-base focus:border-b-main focus:dark:border-b-zinc-200 w-full"
          placeholder="用户名"
          name="username"
          autocomplete="on"
          :rules="validateUsername"
          v-model="formValue.username"
        />
        <vee-error-message
          class="text-sm text-red-600 mt-0.5 text-left block"
          name="username"
        />
        <vee-field
          type="password"
          class="dark:bg-zinc-800 xl:dark:bg-zinc-900 dark:text-white text-base px-1 pb-1 mt-4 outline-none border-b-zinc-400 focus:border-b-main border-b-[1px] focus:dark:border-b-zinc-200 w-full"
          placeholder="密码"
          name="password"
          autocomplete="on"
          :rules="validatePassword"
          v-model="formValue.password"
        />
        <vee-error-message
          class="text-sm text-red-600 mt-0.5 text-left block"
          name="password"
        />
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block text-right text-sm p-1 text-zinc-400 hover:text-main dark:text-zinc-600 dark:hover:text-zinc-400 divide-neutral-400 cursor-pointer"
            >去注册</a
          >
        </div>
        <my-button
          class="w-full bg-zinc-200 hover:bg-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-200 dark:bg-zinc-900 dark:xl:bg-zinc-800"
          :loading="loading"
          :isActiveAnim="false"
        >
          登录
        </my-button>
        <!-- qq微信登陆 -->
        <div class="flex items-center justify-around mt-8 mb-4">
          <svg-icon name="qq" class="w-4 h-4 cursor-pointer"></svg-icon>
          <svg-icon name="wexin" class="w-4 h-4 cursor-pointer"></svg-icon>
        </div>
      </vee-form>
    </div>
    <slider-captcha
      v-if="isSliderVisible"
      @close="onCloseHandler"
      @success="onSuccessHandler"
    ></slider-captcha>
  </div>
</template>

<script setup>
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import SliderCaptcha from './SliderCaptcha.vue'
import { ref } from 'vue'
import { LOGIN_TYPE_USERNAME } from '@/constants'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

// 校验规则
const validateUsername = (value) => {
  // 用户名是必填项
  if (!value) {
    return '用户名是必填项'
  }

  // 用户名的长度在 3-12 位之间
  if (value.length < 3 && value.length > 12) {
    return '用户名的长度在 3-12 位之间'
  }

  // 通过检验
  return true
}
const validatePassword = (value) => {
  // 密码是必填项
  if (!value) {
    return '密码是必填项'
  }

  // 密码的长度在 6-12 位之间
  if (value.length < 6 && value.length > 12) {
    return '用户名的长度在 6-12 位之间'
  }

  // 通过检验
  return true
}

const onSubmit = () => {
  isSliderVisible.value = true
}

// 控制验证模块显示
const isSliderVisible = ref(false)

const onCloseHandler = () => {
  isSliderVisible.value = false
}

const onSuccessHandler = () => {
  isSliderVisible.value = false
  // 登陆操作
  login()
}

// 登陆动作
const loading = ref(false)
const store = useStore()
const router = useRouter()
const formValue = ref({
  username: '',
  password: ''
})

const login = async () => {
  loading.value = true
  try {
    // 传递 表单数据 和 登录方式
    await store.dispatch('user/login', {
      ...formValue.value,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
</script>
