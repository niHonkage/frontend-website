<template>
  <div class="relative">
    <input
      v-if="type === 'text'"
      :maxlength="max"
      class="rounded-sm text-sm dark:text-zinc-400 w-full border-[1px] border-zinc-400 duration-300 focus:border-blue-500 dark:border-zinc-600 dark:hover:border-white px-1 py-0.5 outline-none"
      type="text"
      v-model="text"
    />
    <textarea
      v-if="type === 'textarea'"
      v-model="text"
      class="dark:text-zinc-400 text-sm duration-300 rounded-sm outline-none border-[1px] border-zinc-400 focus:border-blue-500 dark:border-zinc-600 dark:hover:border-white px-1 py-0.5 w-full"
      rows="5"
      :maxlength="max"
    ></textarea>
    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 dark:text-zinc-400 text-xs"
      :class="{ 'text-red-700': currentLength === parseInt(max) }"
      >{{ text }} / {{ max }}</span
    >
  </div>
</template>
<script>
const typeEnum = ['text', 'textarea']
</script>
<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: String
  },
  max: {
    type: [String, Number]
  },
  type: {
    type: String,
    required: true,
    validator(val) {
      if (!typeEnum.includes(val)) {
        return new Error(`type应该是${typeEnum.join('、')}中的一种`)
      }
      return true
    }
  }
})
// 处理数据双向绑定
defineEmits(['update:modelValue'])
const text = useVModel(props)

// 定义计算属性记录输入文字长度
const currentLength = computed(() => {
  return text.value.length
})
</script>
