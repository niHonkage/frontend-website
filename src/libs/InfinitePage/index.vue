<template>
  <div>
    <!-- 定制的内容 -->
    <slot />
    <!-- 加载提示页 -->
    <div class="h-6 py-4" ref="loadingTarget">
      <!-- 加载更多 -->
      <svg-icon
        v-show="loading"
        name="infinite-load"
        class="h-4 w-4 mx-auto animate-spin"
      ></svg-icon>
      <!-- 没有数据了 -->
      <p class="text-center text-base text-zinc-400" v-if="isFinished">
        没有更多数据了
      </p>
    </div>
  </div>
</template>
<script setup>
import { useVModel, useIntersectionObserver } from '@vueuse/core'
import { ref, watch } from 'vue'
const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true
  },
  // 数据是否加载完成
  isFinished: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'onLoad'])

// 处理loading状态
const loading = useVModel(props)

// 滚动的元素
const loadingTarget = ref(null)
const targetIsIntersection = ref(false)
useIntersectionObserver(
  loadingTarget,
  ([{ isIntersecting }], obserserElement) => {
    targetIsIntersection.value = isIntersecting
    onEmit()
  }
)

const onEmit = () => {
  // 三个条件：被监视元素处于可视视口内，不处于加载中的状态，不处于加载完成状态
  if (targetIsIntersection.value && !loading.value && !props.isFinished) {
    loading.value = true
    // 触发更多加载
    emits('onLoad')
  }
}

watch(loading, (val) => {
  // 延时操作，解决首次加载如果导致被监视元素还在可视窗口内不会再次触发回调的问题
  setTimeout(() => {
    onEmit()
  }, 100)
})
</script>
