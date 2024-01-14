<template>
  <div
    class="w-5 mx-0.5 flex flex-col items-center justify-center"
    @click="onItemClick"
  >
    <svg-icon :name="icon" :fillClass="iconClass" class="w-2 h-2"></svg-icon>
    <p class="text-sm mt-0.5" :class="textClass">
      <slot></slot>
    </p>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  to: {
    type: String
  },
  icon: {
    type: String,
    required: true
  },
  iconClass: {
    type: String
  },
  textClass: {
    type: String,
    default: 'text-zinc-900 dark:text-zinc-200'
  }
})

// 注册点击事件
const router = useRouter()
const onItemClick = () => {
  if (!props.to) {
    return
  }
  router.push(props.to)
}
</script>
