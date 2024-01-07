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
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  getImgElements,
  getAllImgs,
  onCompleteImgs,
  getMinColumn,
  getMaxHeight,
  getMinHeight
} from './utils.js'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  nodeKey: {
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
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )
  containerLeft.value = paddingLeft
  // 容器总宽度：不包括margin、padding、border
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseInt(paddingLeft) -
    parseInt(paddingRight)
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
const useItemHeights = () => {
  let itemElements = [...document.getElementsByClassName('waterfall-item')]
  itemElements.forEach((el) => {
    itemHeights.push(el.offsetHeight)
  })
  useItemLocation()
}

// 监听数据变化来重新获取itemHeights
watch(
  props.data,
  (val) => {
    console.log(val)
    // 在第一次获取数据时构建高度记录容器
    const resetColumnHeight = val.every((item) => !item._style)
    if (resetColumnHeight) {
      // 初始化高度记录容器
      useColumnHeightObj()
    }
    nextTick(() => {
      if (props.picturePreReading) {
        waitImgsComplete()
      } else {
        useItemHeights()
      }
    })
  },
  {
    immediate: true,
    deep: true
  }
)

const useItemLocation = () => {
  props.data.forEach((item, index) => {
    if (item._style) return
    // 生成_style属性
    item._style = {}
    item._style.left = getItemLeft()
    item._style.top = getItemTop()
    // 指定的列的高度自增
    increasingHeight(index)
  })
  // 指定最高的容器高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}

// getItemLeft：获取最小高度的列，left = 所在列 * (columnWidth + columnSpacing) + containerLeft
const getItemLeft = () => {
  const column = getMinColumn(columnHeightObj.value)
  return (
    column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  )
}
// top = 列高对象中的最小值
const getItemTop = () => {
  return getMinHeight(columnHeightObj.value)
}

// 指定列自增方法：获取最小高度所在的列，然后index可以获得对应的item高度
const increasingHeight = (index) => {
  // 最小高度所在的列
  const minHeightColumn = getMinColumn(columnHeightObj.value)
  // 该列高度自增
  columnHeightObj.value[minHeightColumn] +=
    itemHeights[index] + props.rowSpacing
}

// 组件销毁时清空所有_style
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})

// 监听列数的变化，重新构建瀑布流
const reset = () => {
  // 设备类型切换时会出现宽度计算错误，延迟重新计算
  setTimeout(() => {
    // 重新计算列宽
    useColumnWidth()
    // 重置所有定位数据
    props.data.forEach((item) => {
      // data处于深度监听，这里的改动会触发重新定位
      item._style = null
    }, 100)
  })
}
watch(
  () => props.column,
  () => {
    if (props.picturePreReading) {
      // 在 picturePreReading 为 true 的前提下，需要首先为列宽滞空，列宽滞空之后，会取消瀑布流渲染
      columnWidth.value = 0
      // 等待页面渲染后，重新执行计算，否则item高度计算不准确
      nextTick(reset)
    } else {
      reset()
    }
  }
)
</script>
