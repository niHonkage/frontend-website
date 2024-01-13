<template>
  <popover-card placement="bottom-left" class="flex items-center">
    <template #reference>
      <!-- 展示区：头像、图标 -->
      <div
        class="guide-user relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
        v-if="$store.getters.token"
      >
        <img
          v-lazy
          :src="$store.getters.userInfo.avatar"
          class="w-3 h-3 rounded-sm"
        />
        <!-- 下箭头 -->
        <svg-icon
          name="down-arrow"
          class="w-1.5 h-1.5 ml-0.5"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></svg-icon>
        <!-- vip 标记 -->
        <svg-icon
          name="vip"
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
          v-if="$store.getters.userInfo.vipLevel"
        ></svg-icon>
      </div>
      <div v-else>
        <my-button
          icon="profile"
          class="guide-user"
          iconClass="fill-zinc-600 dark:fill-white"
          @click="onToLogin"
        ></my-button>
      </div>
    </template>
    <!-- 弹出层 -->
    <div class="w-[140px] overflow-hidden" v-if="$store.getters.token">
      <div
        v-for="item in menuArr"
        :key="item.id"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        @click="onItemClick(item)"
      >
        <svg-icon
          :name="item.icon"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
          class="w-1.5 h-1.5 mr-1"
        ></svg-icon>
        <span class="text-zinc-800 dark:text-zinc-300 text-sm">{{
          item.title
        }}</span>
      </div>
    </div>
  </popover-card>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { myConfirm } from '@/libs'
import { useStore } from 'vuex'

const store = useStore()

// 构建 menu 数据源
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]

// 注册登陆事件
const router = useRouter()
const onToLogin = () => {
  router.push('/login')
}

// 注册menuItem 点击事件
const onItemClick = (item) => {
  // 有 path 则跳转，没有就是退出登录
  if (item.path) {
    router.push(item.path)
    return
  }
  myConfirm('您确认要退出吗？').then(() => {
    store.dispatch('user/logout')
  })
}
</script>
