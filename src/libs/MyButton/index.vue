<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-105': isActiveAnim }
    ]"
    @click.stop="onBtnClick"
  >
    <!-- 展示loading -->
    <svg-icon
      name="laoding"
      v-if="loading"
      class="w-2 h-2 animate-spin mr-1"
    ></svg-icon>
    <!-- icon按钮 -->
    <svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :fillClass="iconClass"
      :color="iconColor"
      :class="sizeEnum[sizeKey].icon"
    ></svg-icon>
    <!-- 文字按钮 -->
    <slot v-else></slot>
  </button>
</template>
<script>
// type可选项：按钮风格
const typeEnum = {
  primary:
    'text-white dark:bg-zinc-900 bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
  main: 'text-white dark:bg-zinc-900 bg-main hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700',
  info: 'text-zinc-800 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700'
}
// size可选项：按钮大小，区分文字按钮和icon按钮
const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
</script>

<script setup>
import { computed } from 'vue'
import SvgIcon from '../SvgIcon/index.vue'

const props = defineProps({
  // 图标名字
  icon: {
    type: String
  },
  // 图标颜色
  iconColor: {
    type: String
  },
  // 图标类名，可自定义tailwind
  iconClass: {
    type: String
  },
  // 按钮风格
  type: {
    type: String,
    validator(val) {
      // 获取所有按钮风格
      const keys = Object.keys(typeEnum)
      // 开发指定的type是否在可选范围内
      const result = keys.includes(val)
      // 如果给出非法的type则警告
      if (!result) {
        throw new Error(`你的type必须得是${keys.join('、')}中的一种`)
      }
      // 通过校验
      return result
    }
  },
  // 大小风格
  size: {
    type: String,
    default: 'default',
    validator(val) {
      // 获取所有可设置的大小，排除icon-开头的
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon-'))
      // 开发者指定的大小是否合法
      const result = keys.includes(val)
      // 非法则报错
      if (!result) {
        throw new Error(`你的size必须是${keys.join('、')}的一种`)
      }
      return result
    }
  },
  // 按钮点击时是否需要动画
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  }
})

// 处理size的key值，判断当前icon是否存在来加上'icon-'
const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})
</script>
