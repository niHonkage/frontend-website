<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{ height: containerHeight + 'px' }"
  >
    <!-- 数据渲染 -->
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
  </div>
</template>
<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { getImgElements, getAllImgs, onCompleteImgs } from './utils.js'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  noteKey: {
    type: String
  },
  column: {
    type: Number,
    default: 2
  },
  columnSpacing: {
    type: Number,
    default: 20
  },
  rowSpacing: {
    type: Number,
    default: 20
  },
  picturePreReading: {
    type: Boolean,
    default: true
  }
})

// 容器高度
const containerHeight = ref(0)
// 记录每列的容器高度
const columnHeightObj = ref({})
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}

// 计算列宽首先需要容器的总宽度
const containerTarget = ref(null)
// 容器总宽度
const containerWidth = ref(0)
// 容器左边距
const containerLeft = ref(0)
// 计算容器总宽度
const useContainerWidth = () => {
  console.log(getComputedStyle(containerTarget.value, null))
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )
  console.log(paddingRight)
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft)
  // 容器总宽度：不包括margin、padding、border
  containerWidth.value =
    containerTarget.value.offsetWidth -
    containerLeft.value -
    parseFloat(paddingRight)
}

// 列宽
const columnWidth = ref(0)
// 列间距合计
const totalColumnSpacing = computed(() => {
  return props.columnSpacing * (props.column - 1)
})

// 计算列宽
const useColumnWidth = () => {
  useContainerWidth()
  columnWidth.value =
    (containerWidth.value - totalColumnSpacing.value) / props.column
}
// 在mounted中调用
onMounted(() => {
  useColumnWidth()
  console.log(columnWidth.value)
})

// item 高度集合
let itemHeights = []
// 监听图片加载
const waitImgsComplete = () => {
  itemHeights = []
  // 拿到item元素
  let itemElements = [...document.getElementsByClassName('waterfall-item')]
  // 拿到img标签
  let imgElements = getImgElements(itemElements)
  // 拿到img的src
  let allImgs = getAllImgs(imgElements)
  // 等待img加载
  onCompleteImgs(allImgs).then(() => {
    itemElements.forEach((el) => {
      itemHeights.push(el.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
  })
}

// 不需要图片预读取时的计算高度
const getItemHeights = () => {
  let itemElements = [...document.getElementsByClassName('waterfall-item')]
  itemElements.forEach((el) => {
    itemHeights.push(el.offsetHeight)
  })
}

// 监听数据变化来重新获取itemHeights
watch(
  props.data,
  (val) => {
    nextTick(() => {
      if (props.picturePreReading) {
        waitImgsComplete()
      } else {
        getItemHeights()
      }
    })
  },
  {
    immediate: true,
    deep: true
  }
)

const useItemLocation = () => {
  console.log(itemHeights)
}
</script>
