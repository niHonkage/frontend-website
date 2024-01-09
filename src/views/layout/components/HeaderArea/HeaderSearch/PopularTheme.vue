<template>
  <div>
    <div class="text-xs mb-1 text-zinc-400">热门精选</div>
    <div class="h-[140px] flex" v-if="themesData.list.length">
      <!-- 左边的大图 -->
      <div
        class="w-[260px] rounded relative cursor-pointer overflow-hidden"
        :style="{ backgroundColor: randomRGB() }"
      >
        <img
          :src="themesData.big.photo"
          v-lazy
          class="w-full object-cover rounded"
        />
        <p
          class="absolute left-0 bottom-0 pl-1 w-full h-full flex items-end pb-1.5 backdrop-blur-[5px] text-white text-xs duration-300 hover:backdrop-blur-none rounded"
        >
          #{{ themesData.big.title }}
        </p>
      </div>
      <!-- 右边的小图列表 -->
      <div class="flex flex-wrap max-w-[860px] flex-1">
        <div
          v-for="item in themesData.list"
          :key="item.id"
          class="h-[45%] w-[260px] text-white text-xs relative mb-1.5 ml-1.5 rounded overflow-hidden cursor-pointer"
          :style="{ backgroundColor: randomRGB() }"
        >
          <img :src="item.photo" class="rounded w-full object-cover" v-lazy />
          <p
            class="backdrop-blur-[5px] hover:backdrop-blur-none absolute bottom-0 left-0 pl-1 h-full w-full duration-300 flex items-end pb-1 rounded"
          >
            #{{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getThemes } from '@/api/pexels.js'
import { ref } from 'vue'
import { randomRGB } from '@/utils/colors.js'

const themesData = ref({
  big: {},
  list: []
})

// 调用接口
const getThemesData = async () => {
  const { themes } = await getThemes()
  // 分两个部分，左边的大图和右边的小图
  themesData.value = {
    big: themes[0],
    list: themes.splice(1, themes.length)
  }
}
getThemesData()
</script>
