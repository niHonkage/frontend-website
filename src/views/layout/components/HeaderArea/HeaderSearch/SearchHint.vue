<template>
  <div>
    <div
      class="py-1 pl-1 rounded text-base font-bold cursor-pointer duration-300 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      v-for="(item, index) in hintData"
      :key="index"
      @click="onItemClick(item)"
      v-html="highlightText(item)"
    ></div>
  </div>
</template>
<script>
const EMITS_ITEM_CLICK = 'itemClick'
</script>
<script setup>
import { getHint } from '@/api/pexels'
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'

// 接收搜索数据
const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})

// 处理搜索提示
const hintData = ref([])
const getHintData = async () => {
  // 如果搜索栏没有输入不会触发
  if (!props.searchText) return
  const { result } = await getHint(props.searchText)
  hintData.value = result
}

// item 点击事件处理
const emits = defineEmits([EMITS_ITEM_CLICK])
const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}

// 处理防抖功能
watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  debounce: 500,
  maxWait: 1000
})

// 处理文字高亮
const highlightText = (text) => {
  // 1.创建替换的高亮html标签
  const hightlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  // 2.创建匹配正则
  const reg = new RegExp(props.searchText, 'gi')
  // 3.替换普通文本为html文本
  return text.replace(reg, hightlightStr)
}
</script>
