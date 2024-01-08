<template>
  <div>
    <!-- 长列表 -->
    <infinite-page
      v-model="isLoading"
      :isFinished="isFinished"
      @onLoad="getPexelsData"
    >
      <waterfall-layout
        class="w-full px-1"
        :data="pexelsList"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :picturePrereading="flase"
      >
        <template v-slot="{ item, width }">
          <list-item :data="item" :width="width"></list-item>
        </template>
      </waterfall-layout>
    </infinite-page>
  </div>
</template>
<script setup>
import ListItem from './ListItem.vue'
import { getPexelsList } from '@/api/pexels.js'
import { ref, watch } from 'vue'
import { isMobileTerminal } from '@/utils/flexible.js'
import { useStore } from 'vuex'

const query = {
  page: 1,
  size: 20
}

// 加载状态
const isLoading = ref(false)
// 数据加载是否完成
const isFinished = ref(false)
// 数据源
const pexelsList = ref([])

const resetQuery = (newQuery) => {
  // 希望添加的新参数
  query = { ...query, ...newQuery }
  // 重置状态和数据源
  isFinished.value = false
  pexelsList.value = []
}

const store = useStore()
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    const newQuery = { page: 1, categoryId: currentCategory.id }
    resetQuery(newQuery)
  }
)

const getPexelsData = async () => {
  // 首先判断是否加载完成，加载完成直接退出
  if (isFinished.value) {
    return
  }
  // 然后判断是否不为首次加载，除了第一次加载后续page自增
  if (pexelsList.value.length) {
    query.page += 1
  }
  // 触发接口请求
  const res = await getPexelsList(query)
  // 判断是否为初始请求
  if (query.page === 1) {
    pexelsList.value = res.list
  } else {
    pexelsList.value.push(...res.list)
  }
  // 最后判断此次请求是否完成了加载
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }
  // 此次加载完成，修改加载状态
  isLoading.value = false
}
getPexelsData()
</script>
