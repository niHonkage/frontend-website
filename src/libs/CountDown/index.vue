<template>
  <div>
    <slot></slot>
    <p class="text-sm">{{ showTime }}</p>
  </div>
</template>
<script>
const EMITS_FINISH = 'finish'
const EMITS_CHANGE = 'change'
const INTERVAL_COUNT = 1000
</script>
<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import dayjs from './utils.js'

const props = defineProps({
  // 倒计时毫秒数
  time: {
    type: Number,
    required: true
  },
  // dayjs的格式标准
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})

const emits = defineEmits([EMITS_CHANGE, EMITS_FINISH])

// 结束计时
let interval = null
const close = () => {
  if (interval) {
    clearInterval(interval)
  }
}

// 开始计时
const start = () => {
  // 每次开始计时前先清除上一次的计时器
  close()
  interval = setInterval(() => {
    durationFn()
  }, INTERVAL_COUNT)
}

// 倒计时时长
const duration = ref(0)

// 计时行为
const durationFn = () => {
  duration.value -= INTERVAL_COUNT
  // 通知每一次计时改变
  emits(EMITS_CHANGE)
  // 当倒计时归零结束计时
  if (duration.value <= 0) {
    duration.value = 0
    close()
  }
}

// 监听time的传入来启动倒计时
watch(
  () => props.time,
  (val) => {
    duration.value = val
    start()
  },
  {
    immediate: true
  }
)

onUnmounted(() => {
  close()
})

// 利用dayjs输出正确格式的事件
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})
</script>
