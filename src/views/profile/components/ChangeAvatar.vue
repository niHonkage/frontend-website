<template>
  <div class="overflow-auto flex flex-col items-center">
    <svg-icon
      name="close"
      v-if="isMobileTerminal"
      class="w-3 h-3 p-0.5 ml-auto m-1"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="close"
    ></svg-icon>

    <img :src="blob" ref="imgRef" alt="" />

    <my-button
      class="mt-4 w-[80%] xl:w-1/2 bg-red-500 hover:bg-red-600 text-white dark:text-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-700"
      @click="onConfirmClick"
      >确定</my-button
    >
  </div>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible'
defineProps({
  blob: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['close'])

// 确认提交
const onConfirmClick = () => {}

// 关闭
const close = () => {
  emits('close')
}
</script>
