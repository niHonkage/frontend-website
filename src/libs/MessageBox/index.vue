<template>
  <transition name="down" @after-leave="destory">
    <div
      class="min-x-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      v-show="isVisible"
      :class="styles[type].containerClass"
    >
      <svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="h-1.5 w-1.5 mr-1.5"
      ></svg-icon>
      <span class="text-sm" :class="styles[type].textClass">{{ content }}</span>
    </div>
  </transition>
</template>
<script>
const typeEnum = ['warn', 'error', 'success']
// 样式表数据
const styles = {
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100'
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100'
  },
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100'
  }
}
</script>
<script setup>
import { onMounted, ref } from 'vue'
import SvgIcon from '@/libs/SvgIcon/index.vue'
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator(val) {
      const result = typeEnum.includes(val)
      if (!result) {
        throw new Error(`你的type必须是${typeEnum.join('、')}中的一种`)
      }
      return result
    }
  },
  // 描述文本
  content: {
    type: String,
    required: true
  },
  // 展示时长
  duration: {
    type: Number
  },
  // 关闭时的回调
  destory: {
    type: Function
  }
})

const isVisible = ref(false)
onMounted(() => {
  isVisible.value = true
  // 延迟时间关闭
  setTimeout(() => {
    isVisible.value = false
  }, props.duration)
})
</script>
<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}
.down-enter-from,
.down-leave-to {
  transform: translate3d(-50%, -100px, 0);
  opacity: 0;
}
</style>
