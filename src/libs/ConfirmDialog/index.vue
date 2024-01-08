<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisible"
        class="w-screen h-screen bg-zinc-900/80 fixed top-0 left-0 z-40"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        v-if="isVisible"
        class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] px-2 py-1.5 z-50 rounded-sm border dark:border-zinc600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <my-button type="info" class="mr-2" @click="onCancelClick">{{
            cancelText
          }}</my-button>
          <my-button type="primary" @click="onConfirmClick">{{
            confirmText
          }}</my-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import MyButton from '../MyButton/index.vue'
defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmHandler: {
    type: Function
  },
  cancelHandler: {
    type: Function
  },
  close: {
    type: Function
  }
})

const isVisible = ref(false)

// confirm展示
const show = () => {
  isVisible.value = true
}
// 因为有进入动画，所以需要页面构建完成后执行展示动作
onMounted(() => {
  show()
})

// 退出动画
const duration = '0.5s'

// 处理关闭方法：因为有退出动画需要展示，所以需要预留时间
const close = () => {
  isVisible.value = false
  setTimeout(() => {
    if (props.close) {
      props.close()
    }
  }, parseInt(duration.replace('0.', '').replace('s', '') * 100))
}
// 取消按钮点击事件
const onCancelClick = () => {
  if (props.cancelHandler) {
    props.cancelHandler()
  }
  close()
}

// 确认点击事件
const onConfirmClick = () => {
  if (props.confirmHandler) {
    props.confirmHandler()
  }
  close()
}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}
.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
