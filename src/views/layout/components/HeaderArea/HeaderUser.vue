<template>
  <popover-card placement="bottom-left" class="flex items-center">
    <template #reference>
      <!-- 展示区：头像、图标 -->
      <div
        class="guide-user relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100"
      >
        <img
          src="https://github.com/nihonKage.png"
          class="w-3 h-3 rounded-sm"
        />
        <!-- 下箭头 -->
        <svg-icon
          name="down-arrow"
          class="w-1.5 h-1.5 ml-0.5"
          fillClass="fill-zinc-900"
        ></svg-icon>
        <!-- vip 标记 -->
        <svg-icon
          name="vip"
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
        ></svg-icon>
      </div>
    </template>
    <!-- 弹出层 -->
    <div class="w-[140px] overflow-hidden">
      <div
        v-for="item in menuArr"
        :key="item.id"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
      >
        <svg-icon name="item.icon" class="w-1.5 h-1.5 mr-1"></svg-icon>
        <span class="text-zinc-800 text-sm">{{ item.title }}</span>
      </div>
    </div>
  </popover-card>
</template>
<script setup>
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
</script>
