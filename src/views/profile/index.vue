<template>
  <!-- 卡片外的背景，针对pc端 -->
  <div
    class="h-full bg-zinc-200 dark:bg-zinc-800 duration-300 overflow-auto xl:pt-2"
  >
    <!-- 卡片 -->
    <div
      class="mx-auto relative max-w-screen-lg bg-white dark:bg-zinc-900 duration-300 xl:rounded-sm border-zinc-200 dark:border-zinc-400 border-[1px] xl:px-4 xl:py-2"
    >
      <!-- 移动端navbar -->
      <nav-bar :clickLeft="onNavBarLeftClick" v-if="isMobileTerminal" sticky>
        个人资料
      </nav-bar>
      <!-- pc端 -->
      <div v-else class="mb-4 text-center text-lg font-bold dark:text-zinc-200">
        个人资料
      </div>

      <!-- 主要内容区域 -->
      <div class="h-full w-full pb-4 px-1 mt-2 text-sm xl:w-2/3 xl:pb-0">
        <!-- 头像部分：pc端排右侧 -->
        <div class="xl:absolute xl:right-[16%] xl:text-center">
          <span
            class="text-sm font-bold dark:text-zinc-200 inline-block w-8 mb-2 xl:block xl:mx-auto"
          >
            我的头像
          </span>
          <!-- 头像图片 -->
          <div
            class="relative w-[80px] h-[80px] rounded-full overflow-hidden group cursor-pointer mx-auto"
            @click="onAvatarClick"
          >
            <img
              v-lazy
              :src="$store.getters.userInfo.avatar"
              alt=""
              class="w-full h-full"
            />
            <!-- 头像蒙版 -->
            <div
              class="hidden xl:group-hover:block w-full h-full absolute left-0 top-0 bg-[rgba(0,0,0,0.4)]"
            >
              <svg-icon
                name="change-header-image"
                class="w-2 h-2 m-auto mt-2"
              ></svg-icon>
              <div class="text-xs text-white dark:text-zinc-300 mt-0.5">
                点击更换头像
              </div>
            </div>
          </div>
          <!-- 隐藏的文件选择器 -->
          <input
            type="file"
            accept=".png, .jpeg, .jpg, .gif"
            v-show="false"
            ref="inputFileRef"
            @change="onSelectHandler"
          />
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
            支持jpg、png、jpeg格式，大小5M以内的图片
          </p>
        </div>
        <!-- 用户名 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="font-bold dark:text-white w-8 mb-1 xl:mb-0 block">
            用户名
          </span>
          <my-input
            type="text"
            max="20"
            v-model="userInfo.nickname"
            class="w-full"
          ></my-input>
        </div>
        <!-- 职位 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="font-bold dark:text-white w-8 mb-1 xl:mb-0 block">
            职位
          </span>
          <my-input
            type="text"
            v-model="userInfo.title"
            class="w-full"
          ></my-input>
        </div>
        <!-- 公司 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="font-bold dark:text-white w-8 mb-1 xl:mb-0 block">
            公司
          </span>
          <my-input
            type="text"
            v-model="userInfo.company"
            class="w-full"
          ></my-input>
        </div>
        <!-- 个人主页 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="font-bold dark:text-white w-8 mb-1 xl:mb-0 block">
            个人主页
          </span>
          <my-input
            type="text"
            v-model="userInfo.homePage"
            class="w-full"
          ></my-input>
        </div>
        <!-- 个人介绍 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="font-bold dark:text-white w-8 mb-1 xl:mb-0 block">
            个人介绍
          </span>
          <my-input
            type="textarea"
            max="50"
            v-model="$store.getters.userInfo.introduction"
            class="w-full"
          ></my-input>
        </div>

        <!-- 保存修改 -->
        <my-button
          class="w-full mt-2 mb-4 bg-red-500 hover:bg-red-600 text-white dark:bg-zinc-800 dark:hover:bg-zinc-600 dark:text-zinc-200 xl:w-[160px] xl:mx-auto"
          @click="onSaveClick"
          :loading="loading"
        >
          保存修改
        </my-button>
        <my-button
          class="w-full mt-2 mb-4 bg-red-500 hover:bg-red-600 text-white dark:bg-zinc-800 dark:hover:bg-zinc-600 dark:text-zinc-200 xl:w-[160px]"
          v-if="isMobileTerminal"
          @click="onLogoutClick"
        >
          退出登录
        </my-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import { myConfirm, message } from '@/libs'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { putProfile } from '@/api/sys.js'

const store = useStore()
const router = useRouter()

// 隐藏选择框
const inputFileRef = ref(null)

// 更换头像点击事件：触发选择
const onAvatarClick = () => {
  inputFileRef.value.click()
}

// 头像选择后的回调
const onSelectHandler = () => {}

// 移动端后退处理
const onNavBarLeftClick = () => {
  router.back()
}

// 移动端退出登录
const onLogoutClick = () => {
  myConfirm('您确定要退出吗？').then(() => {
    store.dispatch('user/logout')
  })
}

// 双向绑定
/* const changeUserInfo = (key, event) => {
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    [key]: event
  })
} */

// 点击保存修改
const loading = ref(false)

const userInfo = ref(store.getters.userInfo)

const onSaveClick = async () => {
  loading.value = true
  await putProfile(userInfo.value)
  message('success', '用户信息修改成功')
  // 等待修改数据上传完成再修改本地数据
  store.commit('user/setUserInfo', userInfo.value)
  loading.value = false
}
</script>
