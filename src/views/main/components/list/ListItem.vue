<template>
  <div
    class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1 duration-300"
  >
    <div
      class="relative w-full rounded cursor-zoom-in group"
      @click="onToPinsClick"
      :style="{
        backgroundColor: randomRGB()
      }"
    >
      <!-- 图片 -->
      <img
        v-lazy
        :src="data.photo"
        class="w-full rounded bg-transparent"
        :style="{
          height: (width * data.photoHeight) / data.photoWidth + 'px'
        }"
        ref="imgTarget"
      />
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
          @click="onDownload"
        ></my-button>
        <!-- 放大 -->
        <my-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          size="small"
          type="info"
          icon="full"
          @click="onImgFullScreen"
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
      <img v-lazy :src="data.avatar" class="rounded-full w-2 h-2" />
      <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
    </div>
  </div>
</template>
<script setup>
import { randomRGB } from '../../../../utils/colors'
import { saveAs } from 'file-saver'
import { message } from '@/libs'
import { useElementBounding, useFullscreen } from '@vueuse/core'
import { computed, ref } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number
  }
})

// 下载功能
const onDownload = () => {
  message('success', '图片下载成功')
  // 延迟一段时间执行，提升体验
  setTimeout(() => {
    saveAs(props.data.photoDownLink)
  }, 300)
}

const imgTarget = ref(null)
const { enter: onImgFullScreen } = useFullscreen(imgTarget)
const {
  x: imgContainerX,
  y: imgContainerY,
  width: imgContainerWidth,
  height: imgContainerHeight
} = useElementBounding(imgTarget)

// 计算图片居中位置
const imgContainerCenter = computed(() => {
  return {
    translateX: imgContainerX + imgContainerWidth / 2,
    translateY: imgContainerY + imgContainerHeight / 2
  }
})

// 图片点击事件传入图片id和居中位置
const emits = defineEmits(['click'])
const onToPinsClick = () => {
  emits('click', {
    id: props.data.id,
    location: imgContainerCenter.value
  })
}
</script>
