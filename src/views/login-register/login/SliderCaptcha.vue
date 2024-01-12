<template>
  <div
    class="fixed top-[20%] left-[50%] translate-x-[-50%] rounded text-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 shadow-3xl w-[340px] h-[270px]"
  >
    <!-- 标题区域 -->
    <div class="flex items-center h-5 text-left px-1 mb-1">
      <span class="flex-grow dark:text-zinc-200">请完成安全验证</span>
      <svg-icon
        name="refresh"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-900"
        @click="onReset"
      ></svg-icon>
      <svg-icon
        name="close"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="w-3 h-3 p-0.5 ml-1 rounded-sm cursor-pointer duration-300 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-900"
        @click="onClose"
      ></svg-icon>
    </div>
    <!-- 验证区域 -->
    <div id="captcha"></div>
  </div>
</template>
<script>
const EMITS_CLOSE = 'close'
const EMITS_SUCCESS = 'success'
</script>
<script setup>
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
import '@/vendor/SliderCaptcha/slidercaptcha.min.css'
import { getCaptcha } from '@/api/sys'
import { onMounted } from 'vue'

const emits = defineEmits([EMITS_CLOSE, EMITS_SUCCESS])

// 生成captcha实例，把用户的拼图结果返回到服务端进行判定
let captcha = null
onMounted(() => {
  // captcha包提供的实例化方法
  captcha = sliderCaptcha({
    // 渲染位置
    id: 'captcha',
    // 拼图成功后的回调
    async onSuccess(arr) {
      const result = await getCaptcha({
        behavior: arr
      })
      if (result) {
        emits(EMITS_SUCCESS)
      }
    },
    // 拼图失败的回调
    onFail() {
      emits(EMITS_CLOSE)
    },
    // 默认的验证方法，此处选择的是等待用户拼图成功后进行验证
    verify() {
      return true
    }
  })
})

const onReset = () => {
  captcha.reset()
}

const onClose = () => {
  emits(EMITS_CLOSE)
}
</script>
