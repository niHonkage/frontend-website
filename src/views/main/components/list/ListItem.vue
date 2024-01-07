<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div class="relative w-full rounded cursor-zoom-in group">
      <!-- 图片 -->
      <img :src="data.photo" class="w-full rounded bg-transparent" />
      <!-- 遮罩层 -->
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <!-- 分享 -->
        <my-button class="absolute top-1.5 left-1.5 bg-red-500 text-zinc-50"
          >分享</my-button
        >
        <!-- 点赞 -->
        <my-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        ></my-button>
        <!-- 下载 -->
        <my-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          size="small"
          type="info"
          icon="download"
        ></my-button>
        <!-- 放大 -->
        <my-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          size="small"
          type="info"
          icon="full"
        ></my-button>
      </div>
    </div>
    <!-- 标题 -->
    <p
      class="text-zinc-900 text-sm mt-1 px-1 font-bold dark:text-zinc-300 line-clamp-2"
    >
      {{ data.title }}
    </p>
    <!-- 作者 -->
    <div class="flex items-center">
      <img :src="data.avatar" class="rounded-full w-2 h-2" />
      <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
    </div>
  </div>
</template>
<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
