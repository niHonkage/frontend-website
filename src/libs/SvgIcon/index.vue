<template>
  <svg aria-hidden="true">
    <use :class="fillClass" :xlink:href="symbolId" :fill="color" />
  </svg>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 显示 svg 图标名称(剔除 icon- )
  name: {
    type: String,
    required: true
  },
  // 指定color
  color: {
    type: String
  },
  // 通过 tailwind 指定 svg 颜色的类名
  fillClass: {
    type: String
  }
})
// 真实显示的 svg 图标名，拼接 #icon-
const symbolId = computed(() => `#icon-${props.name}`)
</script>
