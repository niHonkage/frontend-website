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
        :picturePrereading="false"
      >
        <template v-slot="{ item, width }">
          <list-item :data="item" :width="width" @click="onToPins"></list-item>
        </template>
      </waterfall-layout>
    </infinite-page>
    <transition
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <pins-vue v-if="isVisiblePins" :id="currentPins.id"></pins-vue>
    </transition>
  </div>
</template>
<script setup>
import ListItem from './ListItem.vue'
import { getPexelsList } from '@/api/pexels.js'
import { ref, watch } from 'vue'
import { isMobileTerminal } from '@/utils/flexible.js'
import { useStore } from 'vuex'
import PinsVue from '../../../pins/component/pins.vue'
import gsap from 'gsap'
import { useEventListener } from '@vueuse/core'

let query = {
  page: 1,
  size: 20,
  categoryId: '',
  searchText: ''
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
// 监听分类变化
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    resetQuery({ page: 1, categoryId: currentCategory.id })
  }
)
// 监听搜索文本变化
watch(
  () => store.getters.searchText,
  (val) => {
    resetQuery({
      page: 1,
      searchText: val
    })
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

// pins组件的状态
const isVisiblePins = ref(false)
const currentPins = ref({})

// 点击图片修改浏览器显示的url（新增）
const onToPins = (item) => {
  history.pushState(null, null, `/pins/${item.id}`)
  isVisiblePins.value = true
  currentPins.value = item
}

// 利用gsap写transition的动画逻辑
const onBeforeEnter = (el) => {
  // 设置进入之前的状态
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    transformOrigin: '0 0',
    opacity: 0
  })
}

const onEnter = (el, done) => {
  // 设置完成进入的状态
  gsap.to(el, {
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    duration: 0.3,
    onComplete: done,
    translateX: 0,
    translateY: 0
  })
}

const onLeave = (el) => {
  // 设置退出完成的状态
  gsap.to(el, {
    scaleX: 0,
    scaleY: 0,
    opacity: 0,
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    duration: 0.3
  })
}

// 监听浏览器的后退事件控制pins状态
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})
</script>
