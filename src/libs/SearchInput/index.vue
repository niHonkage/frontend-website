<template>
  <div
    class="relative group p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
    ref="inputContainer"
  >
    <div>
      <!-- 搜索图标 -->
      <svg-icon
        class="w-1.5 h-1.5 absolute top-[50%] translate-y-[-50%] left-2"
        name="search"
        color="#707070"
      ></svg-icon>
      <!-- 输入框 -->
      <input
        type="text"
        class="block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide font-semibold border border-zinc-100 duration-500 group-hover:bg-white group-hover:border-zinc-200 focus:border-red-300"
        placeholder="搜索"
        v-model="inputValue"
        @keyup.enter="onSearchHandler"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
      />
      <!-- 删除按钮 -->
      <svg-icon
        class="w-1.5 h1.5 absolute top-[50%] translate-y-[-50%] right-9 duration-500 cursor-pointer"
        name="input-delete"
        v-show="inputValue"
        @click="onClearClick"
      ></svg-icon>
      <!-- 分割线 -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute top-[50%] translate-y-[-50%] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- 搜索按钮 -->
      <my-button
        class="absolute top-[50%] translate-y-[-50%] right-1 rounded-xl duration-500 opacity-0 group-hover:opacity-100"
        type="primary"
        size="default"
        icon="search"
        iconColor="#ffffff"
        @click="onSearchHandler"
      ></my-button>
    </div>
    <transition name="slide">
      <div
        class="max-h-[368px] w-full text-base overflow-auto bg-white absolute left-0 top-[56px] z-20 p-2 rounded border border-zinc-200 duration-200 hover:shadow-3xl"
        v-if="$slots.dropdown"
        v-show="isFocus"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>
<script>
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
const EMIT_SEARCH = 'search'
const EMIT_CLEAR = 'clear'
const EMIT_iNPUT = 'input'
const EMIT_FOCUS = 'focus'
const EMIT_BLUR = 'blur'
</script>
<script setup>
import { useVModel, onClickOutside } from '@vueuse/core'
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const inputValue = useVModel(props)
const emits = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EMIT_SEARCH,
  EMIT_CLEAR,
  EMIT_iNPUT,
  EMIT_FOCUS,
  EMIT_BLUR
])

watch(inputValue, (val) => {
  emits(EMIT_iNPUT, val)
})

// 删除文本
const onClearClick = () => {
  inputValue.value = ''
  emits(EMIT_CLEAR, '')
}

// 搜索触发
const onSearchHandler = () => {
  emits(EMIT_SEARCH, inputValue.value)
}

// 处理dropdown
const isFocus = ref(false)
const inputContainer = ref(null)

const onFocusHandler = () => {
  isFocus.value = true
  emits(EMIT_FOCUS, 'focus')
}
// 失去焦点
const onBlurHandler = () => {
  emits(EMIT_BLUR)
}

// 检测是否点击了指定DOM元素的外部区域，点击执行回调
onClickOutside(inputContainer, () => {
  isFocus.value = false
})
</script>
<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
