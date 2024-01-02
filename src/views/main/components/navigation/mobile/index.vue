<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
      ref="ulTarget"
    >
      <!-- 滑块 -->
      <li
        class="absolute bg-zinc-900 rounded-lg h-[22px] duration-200"
        ref="sliderTarget"
        :style="sliderStyle"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white z-20"
      >
        <svg-icon
          name="hamburger"
          class="w-1.5 h-1.5"
          @click="isVisible = !isVisible"
        ></svg-icon>
      </li>
      <li
        v-for="(item, index) in data"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :ref="setItemRef"
        @click="onClickChoose(index)"
        :class="{
          'text-zinc-100': currentIndex === index
        }"
      >
        {{ item.name }}
      </li>
    </ul>
    <popup-list v-model="isVisible">
      <div>测试内容</div>
    </popup-list>
  </div>
</template>
<script setup>
import { ref, onBeforeUpdate, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import PopupList from '@/libs/PopupList/index.vue'

defineProps({
  data: {
    type: Array,
    reqiured: true
  }
})

const sliderTarget = ref(null)
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '46px'
})
// 选中的 item 下标
const currentIndex = ref(0)
// 获取所有 item 子元素集合
let itemRefs = []
// :ref='回调函数' 回调中可以随着v-for循环得到所有子节点
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}
// 每次数据更新，DOM未变化之前先清空itemRefs
onBeforeUpdate(() => {
  itemRefs = []
})
// 获取ul元素，计算滑动偏移量
const ulTarget = ref(null)
const { x: ulScrollLeft } = useScroll(ulTarget)
watch(currentIndex, (val) => {
  // 获取选中的元素的 左间距left 和 宽度width
  const { left, width } = itemRefs[val].getBoundingClientRect()
  // 为sliderStyle设置属性
  sliderStyle.value = {
    // ul横向滚动距离 元素距左边缘距离减去左边padding
    transform: `translateX(${left - 9.5 + ulScrollLeft.value}px)`,
    width: width + 'px'
  }
})

// item点击事件
const onClickChoose = (index) => {
  currentIndex.value = index
}

// 控制popup显示
const isVisible = ref(false)
</script>
