<template>
  <div
    class="fixed top-0 left-0 bg-slate-500 text-xl w-screen h-screen z-20 backdrop-blur-3xl bg-transparent pb-2 overflow-y-auto xl:p-2"
  >
    <!-- 移动端下展示导航栏 -->
    <nav-bar v-if="isMobileTerminal" @clickLeft="onPop" @clickRight="onPop">
      {{ pexelData.title }}
      <template #right>
        <svg-icon
          name="share"
          class="w-2 h-2"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></svg-icon>
      </template>
    </nav-bar>
    <!-- pc端下展示关闭按钮 -->
    <svg-icon
      v-else
      name="close"
      class="w-3 h-3 absolute top-2 right-3.5 hover:bg-zinc-300 p-0.5 rounded-sm duration-300 cursor-pointer flex items-center justify-center"
      fillClass="fill-zinc-400"
      @click="onPop"
    ></svg-icon>
    <!-- 最外层的div只有在xl宽度下才有样式 -->
    <div class="xl:w-[80%] xl:h-full xl:m-auto xl:rounded-lg xl:flex">
      <img
        :src="pexelData.photo"
        class="w-screen mb-2 xl:h-full xl:w-3/5 xl:rounded-tl-lg xl:rounded-bl-lg"
      />
      <!-- 最外层的div只有在xl宽度下才有样式 -->
      <div
        class="xl:w-2/5 xl:h-full xl:rounded-tr-lg xl:rounded-br-lg xl:p-3 xl:bg-white xl:dark:bg-zinc-900"
      >
        <!-- pc端首行有两个按钮 -->
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <svg-icon
            name="share"
            class="w-4 h-4 cursor-pointer rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300"
            fillClass="fill-zinc-900 dark:fill-zinc-200"
          ></svg-icon>
          <my-button
            icon="heart"
            type="info"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
          ></my-button>
        </div>
        <!-- 标题 -->
        <p
          class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5"
        >
          {{ pexelData.title }}
        </p>
        <!-- 作者 -->
        <div class="flex items-center pl-1 mt-1">
          <img
            v-lazy
            :src="pexelData.avatar"
            class="rounded-full h-3 w-3"
            alt=""
          />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{
            pexelData.author
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible.js'
import { getPexelsFromId } from '@/api/pexels.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// 根据id获取图片数据
const pexelData = ref({})
const getPexelsData = async () => {
  const res = await getPexelsFromId(props.id)
  pexelData.value = res
}
getPexelsData()

// 处理关闭
const router = useRouter()
const onPop = () => {
  router.back()
}
</script>
