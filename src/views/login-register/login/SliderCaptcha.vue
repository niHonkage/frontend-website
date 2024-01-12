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
<script setup>
const onReset = () => {}

const onClose = () => {}
</script>
