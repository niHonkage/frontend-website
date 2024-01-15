<template>
  <div
    class="flex justify-center items-center bg-orange-200 py-1 border-orange-300 xl:rounded-sm"
  >
    <svg-icon
      name="countdown"
      class="w-1.5 h-1.5 mr-1"
      fillClass="fill-red-600"
    ></svg-icon>
    <p class="text-xs font-bold text-red-600">
      限时特惠 | 距离优惠结束仅剩
      <count-down
        :time="52 * 60 * 1000"
        class="inline-block"
        @finish="isFinish = true"
      ></count-down>
    </p>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const isFinish = ref(false)
</script>
