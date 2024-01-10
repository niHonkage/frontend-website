<template>
  <div class="fixed bottom-10 right-2">
    <!-- 引导 -->
    <div
      @click="onGuide"
      class="guide-start group duration-200 hover:shadow-lg rounded-full border border-zinc-200 dark:border-0 w-4 h-4 mb-1 flex items-center justify-center cursor-pointer bg-white dark:bg-zinc-900"
    >
      <svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
      ></svg-icon>
    </div>
    <!-- 反馈 -->
    <popover-card class="flex items-center guide-feedback" placement="top-left">
      <!-- 展示的部分 -->
      <template #reference>
        <div
          class="rounded-full group bg-white dark:bg-zinc-900 flex items-center justify-center w-4 h-4 hover:shadow-lg border dark:border-0 cursor-pointer duration-200"
        >
          <svg-icon
            name="feedback"
            class="w-2 h-2"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
          ></svg-icon>
        </div>
      </template>
      <!-- 弹出的部分 -->
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center rounded px-1.5 cursor-pointer hover:bg-zinc-50/60 dark:hover:bg-zinc-800"
        >
          <svg-icon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
          ></svg-icon>
          <span class="text-sm text-zinc-800 dark:bg-zinc-300">立即吐槽</span>
        </div>
      </div>
    </popover-card>
  </div>
</template>
<script setup>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { onMounted } from 'vue'

// 初始化
let driverObj = null
onMounted(() => {
  driverObj = driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: '取消',
    nextBtnText: '下一个',
    prevBtnText: '上一个',
    showProgress: 'true'
  })
})

const steps = [
  {
    // 选中高亮元素
    element: '.guide-home',
    // 配置对象
    popover: {
      title: 'logo',
      description: '点击回到首页'
    }
  },
  {
    // 选中高亮元素
    element: '.guide-search',
    // 配置对象
    popover: {
      title: '搜索栏',
      description: '搜索您想要的图片'
    }
  },
  {
    // 选中高亮元素
    element: '.guide-theme',
    // 配置对象
    popover: {
      title: '主题',
      description: '点击切换不同主题',
      // 弹出位置
      position: 'left'
    }
  },
  {
    // 选中高亮元素
    element: '.guide-user',
    // 配置对象
    popover: {
      title: '账户',
      description: '这里标记了您的账户信息',
      position: 'left'
    }
  },
  {
    // 选中高亮元素
    element: '.guide-start',
    // 配置对象
    popover: {
      title: '引导',
      description: '点击可以再次查看引导信息',
      position: 'left'
    }
  },
  {
    // 选中高亮元素
    element: '.guide-feedback',
    // 配置对象
    popover: {
      title: '反馈',
      description: '在这里向我们提出您的反馈',
      position: 'left'
    }
  }
]

const onGuide = () => {
  driverObj.setSteps(steps)
  driverObj.drive()
}
</script>
