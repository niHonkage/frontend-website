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
import { ref } from 'vue'
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
useIntersectionObserver(
  loadingTarget,
  ([{ isIntersecting }], obserserElement) => {
    // 三个条件：被监视元素处于可视视口内，不处于加载中的状态，不处于加载完成状态
    if (isIntersecting && !loading.value && !props.isFinished) {
      console.log('loading')
      loading.value = true
      emits('onLoad')
    }
  }
)
</script>
