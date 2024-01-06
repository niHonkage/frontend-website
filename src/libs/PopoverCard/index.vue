<template>
  <div class="relative" @mouseleave="onMouseLeave" @mouseenter="onMouseEnter">
    <div ref="referenceRef">
      <!-- 具名插槽 -->
      <slot name="reference"></slot>
    </div>
    <transition name="slide">
      <div
        class="absolute p-1 rounded-md bg-white dark:bg-zinc-900 z-20 border dark:border-zinc-700"
        v-show="isVisible"
        ref="contentRef"
        :style="contentPlace"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOTTOM_RIGHT = 'bottom-right'

// 定义指定位置的 Enum
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>
<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  // 控制气泡位置，并给开发者错误提示
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(
          `你的placement必须是${placementEnum.join('、')}中的一种`
        )
      }
      return result
    }
  }
})

// 控制弹出层位置
const contentRef = ref(null)
const referenceRef = ref(null)
const useElementSize = (target) => {
  if (!target) return
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}
const contentPlace = ref({
  top: 0,
  left: 0
})

// 控制menu展示
const isVisible = ref(false)

watch(isVisible, (val) => {
  // 如果不显示则无变化
  if (!val) return
  // 等待渲染成功
  nextTick(() => {
    switch (props.placement) {
      // 左上
      case PROP_TOP_LEFT:
        contentPlace.value.top = 0
        contentPlace.value.left = -useElementSize(contentRef.value).width + 'px'
        break
      // 右上
      case PROP_TOP_RIGHT:
        contentPlace.value.top = 0
        contentPlace.value.left =
          useElementSize(referenceRef.value).width + 'px'
        break
      // 左下
      case PROP_BOTTOM_LEFT:
        contentPlace.value.top =
          useElementSize(referenceRef.value).height + 'px'
        contentPlace.value.left = -useElementSize(contentRef.value).width + 'px'
        break
      // 右下
      case PROP_BOTTOM_RIGHT:
        contentPlace.value.top =
          useElementSize(referenceRef.value).height + 'px'
        contentPlace.value.left =
          useElementSize(referenceRef.value).width + 'px'
        break
    }
  })
})

// 移出防抖
const DELAT_TIME = 100
let timeout = null

// 鼠标移入事件：清除计时器
const onMouseEnter = () => {
  isVisible.value = true
  if (timeout) {
    clearTimeout(timeout)
  }
}

// 鼠标移出事件：添加计时器
const onMouseLeave = () => {
  timeout = setTimeout(() => {
    isVisible.value = false
    timeout = null
  }, DELAT_TIME)
}
</script>
<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
