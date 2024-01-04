<template>
  <popover-card placement="bottom-left">
    <template #reference>
      <svg-icon
        name="theme-light"
        class="guide-theme w-4 h-4 p-1 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100/60"
        fillClass="fill-zinc-900"
      ></svg-icon>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center rounded hover:bg-zinc-100/60 cursor-pointer p-1"
        v-for="item in themeArr"
        :key="item.id"
      >
        <svg-icon class="w-1.5 h-1.5 mr-1" :name="item.icon"></svg-icon>
        <span class="text-zinc-900 text-sm">{{ item.name }}</span>
      </div>
    </div>
  </popover-card>
</template>
<script setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'
const themeArr = [
  {
    id: 0,
    type: THEME_LIGHT,
    name: '极简白'
  },
  {
    id: 1,
    type: THEME_DARK,
    name: '极夜黑'
  },
  {
    id: 2,
    type: THEME_SYSTEM,
    name: '跟随系统'
  }
]
</script>
