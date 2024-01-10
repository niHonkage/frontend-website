<template>
  <div
    class="w-full h-5 border-b border-b-zinc-200 dark:border-b-zinc-700 flex items-center bg-white dark:bg-zinc-800 z-10"
    :class="[sticky ? 'sticky top-0 left-0' : 'relative']"
  >
    <!-- 左 -->
    <div
      class="h-full w-5 absolute left-0 flex items-center justify-center"
      @click="onClickLeft"
    >
      <slot name="left">
        <svg-icon
          name="back"
          class="w-2 h-2"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></svg-icon>
      </slot>
    </div>
    <!-- 中 -->
    <div
      class="h-full m-auto flex justify-center items-center font-bold text-base text-zinc-900 dark:text-zinc-200"
    >
      <slot></slot>
    </div>
    <!-- 右 -->
    <div
      class="h-full absolute right-0 w-5 flex items-center justify-center"
      @click="onClickRight"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  clickLeft: {
    type: Function
  },
  clickRight: {
    type: Function
  },
  sticky: {
    type: Boolean
  }
})

// 注册点击事件
const router = useRouter()
// 左边点击倒退
const onClickLeft = () => {
  if (props.clickLeft) {
    props.clickLeft()
  }
  router.back()
}

// 右边点击
const onClickRight = () => {
  if (props.clickRight) {
    props.clickRight()
  }
}
</script>
