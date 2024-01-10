<template>
  <div class="fixed bottom-10 right-2">
    <!-- 引导 -->
    <div
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
<script setup></script>
