<template>
  <div v-if="isVisible">
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        class="w-screen h-screen z-40 bg-[rgba(0,0,0,0.8)] fixed top-0 left-0"
        @click="close"
      ></div>
    </transition>
    <transition name="up">
      <div
        class="max-w-[80%] max-h-[80%] overflow-auto fixed top-10 left-[50%] translate-x-[-50%] px-2 py-1.5 rounded-sm border border-zinc-400 bg-white dark:bg-zinc-800 xl:min-w-[35%] z-50"
      >
        <!-- 标题 -->
        <div v-if="title" class="font-bold text-lg dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="dark:text-zinc-200 text-base mb-2 mx-auto w-[75%]">
          <slot></slot>
        </div>
        <!-- 按钮 -->
        <div class="flex justify-around">
          <my-button
            class="mr-2"
            type="info"
            v-if="confirmHandler"
            @click="onConfirmHandler"
          >
            {{ confirmText }}
          </my-button>
          <my-button
            type="primary"
            v-if="cancelHandler"
            @click="onCancelHandler"
          >
            {{ cancelText }}
          </my-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { useVModel } from '@vueuse/core'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  close: {
    type: Function
  },
  title: {
    type: String
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelHandler: {
    type: Function
  },
  confirmHandler: {
    type: Function
  }
})

defineEmits(['update:modelValue'])

const isVisible = useVModel(props)

// 处理按钮点击事件
const onCancelHandler = () => {
  if (props.cancelHandler) {
    props.cancelHandler()
  }
  close()
}

const onConfirmHandler = () => {
  if (props.confirmHandler) {
    props.confirmHandler()
  }
  close()
}

const close = () => {
  isVisible.value = false
  if (props.close) {
    props.close()
  }
}
</script>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.up-enter-active,
.up-leave-active {
  transition: all 0.3s;
}
.up-enter-from,
.up-leave-to {
  transform: translate3d(-50%, 100px, 0);
}
</style>
