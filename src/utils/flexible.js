import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})

// 初始化rem基准值，最大值为40px
export const useRem = () => {
  // 定义最大值
  const MAX_FONT_SIZE = 40
  // 监听html文档解析完成的事件
  document.addEventListener('DOMContentLoaded', () => {
    // 获取html元素
    const html = document.documentElement
    // 获取根元素标准，屏幕宽度 / 10
    let fontSize = window.innerWidth / 10
    // 判断是否超过最大值
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    // 添加css规则
    html.style.fontSize = fontSize + 'px'
  })
}
