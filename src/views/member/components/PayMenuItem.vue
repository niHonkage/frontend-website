<template>
  <!-- 单个的支付项目 -->
  <div
    class="flex-none flex flex-col items-center rounded-md w-[120px] mt-2 mr-2 relative cursor-pointer border hover:bg-orange-50 hover:border-orange-300 xl:w-[150px] py-4 xl:py-2"
    :class="[
      select
        ? ' bg-orange-50 dark:bg-orange-200/30 border-orange-300'
        : ' bg-transparent border-zinc-300 dark:border-zinc-500'
    ]"
    @click="onItemClick"
  >
    <!-- 标题 -->
    <p
      class="text-base text-yellow-800"
      :class="[select ? ' dark:text-orange-300' : ' dark:text-zinc-300']"
    >
      {{ data.title }}
    </p>
    <!-- 价格 -->
    <p
      class="text-[32px] font-bold font-sans tracking-tighter text-yellow-800"
      :class="[select ? ' dark:text-orange-300' : ' dark:text-zinc-300']"
    >
      <span class="mr-0.5">￥</span>
      {{ data.price }}
    </p>
    <!-- 原价 -->
    <p class="line-through text-sm text-yellow-500">{{ data.oldPrice }}</p>
    <!-- 热销 -->
    <div
      v-if="hot"
      class="absolute top-[-12px] right-[-1px] h-[22px] leading-[22px] text-center text-yellow-700 bg-gradient-to-r from-orange-300 to-orange-100 rounded-tr-[10px] rounded-bl-[10px] text-[12px] px-1"
    >
      热销
    </div>
  </div>
</template>
<script>
const EMITS_CLICK = 'click'
</script>
<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  hot: {
    type: Boolean
  },
  select: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([EMITS_CLICK])

// 点击事件
const onItemClick = () => {
  emits(EMITS_CLICK, props.data)
}
</script>
