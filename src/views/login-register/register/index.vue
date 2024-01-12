<template>
  <div
    class="relative h-screen text-center bg-white dark:bg-zinc-800 xl:bg-zinc-200"
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
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:dark:bg-zinc-900 xl:w-[388px] xl:m-auto xl:py-4 xl:mt-8 xl:rounded xl:shadow-lg"
    >
      <h3
        class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block"
      >
        注册账号
      </h3>
      <vee-form>
        <vee-field
          name="username"
          type="text"
          class="dark:text-zinc-400 dark:bg-zinc-800 border-b-zinc-400 border-b-[1px] w-full outline-none px-1 pb-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          placeholder="用户名"
          autocomplete="on"
          :rules="validateUsername"
        ></vee-field>
        <vee-error-message
          class="text-sm text-red-600 block text-left mt-0.5"
          name="username"
        ></vee-error-message>

        <vee-field
          name="password"
          type="password"
          class="px-1 pb-1 text-base dark:text-zinc-400 dark:bg-zinc-800 border-b-zinc-400 border-b-[1px] w-full outline-none focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          placeholder="密码"
          autocomplete="on"
          :rules="validatePassword"
        ></vee-field>
        <vee-error-message
          name="password"
          class="text-sm text-red-600 block text-left mt-0.5"
        ></vee-error-message>

        <vee-field
          name="confirmPassword"
          type="password"
          class="px-1 pb-1 text-base dark:text-zinc-400 dark:bg-zinc-800 border-b-zinc-400 border-b-[1px] w-full outline-none focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          placeholder="确认密码"
          autocomplete="on"
          rules="validateConfirmPassword:@password"
        ></vee-field>
        <vee-error-message
          name="confirmPassword"
          class="text-sm text-left mt-0.5 text-red-600 block"
        ></vee-error-message>

        <a
          class="block text-right px-1 mt-2 text-sm text-zinc-400 hover:text-main dark:text-zinc-600 hover:dark:text-zinc-200 duration-300 cursor-pointer"
          target="__blank"
          @click="onToLogin"
        >
          去登录
        </a>
        <a
          class="block text-center mt-3 text-sm text-zinc-400 hover:text-main dark:text-zinc-600 dark:hover:text-zinc-200 duration-300 cursor-pointer"
        >
          注册即同意《慕课网注册协议》
        </a>
        <my-button
          class="mt-3 w-full bg-red-500 hover:bg-red-600 text-base tracking-widest py-1 text-white dark:bg-zinc-900 xl:dark:bg-zinc-800"
        >
          立即注册
        </my-button>
      </vee-form>
    </div>
  </div>
</template>
<script setup>
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage,
  defineRule
} from 'vee-validate'

const validateUsername = (val) => {
  if (!val) {
    return '用户名是必填项'
  }

  if (val.length < 3 && val.length > 12) {
    return '用户名的长度在 3-12 之间'
  }

  return true
}

const validatePassword = (val) => {
  if (!val) {
    return '密码是必填项'
  }

  if (val.length < 6 && val.length > 12) {
    return '密码的长度在 6-12 之间'
  }
  return true
}

const validateConfirmPassword = (val, password) => {
  // password是所有form中type为password的数组
  if (val !== password[0]) {
    return '两次密码的输入必须一致'
  }
  return true
}
// 插入规则
defineRule('validateConfirmPassword', validateConfirmPassword)
</script>
