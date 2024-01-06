<template>
  <div>
    <!-- teleport是vue3提供的直接将组件内部的一部分模板“传送到”该组件DOM解构外层的位置 -->
    <!-- teleport -->
    <teleport to="body">
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          v-if="modelValue"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="emits('update:modelValue', false)"
        ></div>
      </transition>
      <!-- 内容 -->
      <transition name="popup">
        <div
          v-if="modelValue"
          v-bind="$attrs"
          class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0"
        >
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>
<script setup>
import { watch } from 'vue'
import { useScrollLock } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

// 锁定屏幕滑动
const isLockScreen = useScrollLock(document.body)
watch(
  () => props.modelValue,
  (val) => {
    isLockScreen.value = val
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s;
}
.popup-enter-from,
.popup-leave-to {
  transform: translateY(100%);
}
</style>
