<template>
  <div class="fixed bottom-0 left-0 w-full">
    <discounts-vue></discounts-vue>
    <div class="flex px-1.5 flex-row w-full flex-nowrap">
      <div class="mr-auto">
        <p class="text-sm dark:text-white">
          券后合计：<span class="text-lg font-bold text-red-600">￥9</span>
        </p>
        <p class="text-xs text-red-600">优惠券：限时立减￥10</p>
      </div>
      <div class="ml-auto">
        <my-button
          class="w-[120px] dark:text-white dark:bg-zinc-900"
          :isActiveAnim="false"
          @click="onOpenClick"
        >
          立即开通
        </my-button>
      </div>
    </div>
    <popup-list v-model="isOpenPopup" class="rounded">
      <mobile-select></mobile-select>
    </popup-list>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import DiscountsVue from './DiscountsVue.vue'
import MobileSelect from './MobileSelect.vue'

const isOpenPopup = ref(false)
const onOpenClick = () => {
  isOpenPopup.value = true
}
</script>
