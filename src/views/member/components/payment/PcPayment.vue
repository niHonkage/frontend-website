<template>
  <div>
    <!-- 特惠提示 -->
    <discounts-vue></discounts-vue>
    <div
      class="mt-1 rounded border border-zinc-400 flex flex-col justify-center items-center h-[200px]"
    >
      <div class="text-sm dark:text-white h-[32px] leading-[32px] text-center">
        支付金额：<span class="text-lg ml-1 text-orange-600">￥19</span>
      </div>
      <!-- 支付方式 -->
      <div
        class="mt-1 mx-auto px-3 pb-1 rounded-sm border border-zinc-600 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
      >
        <img
          src="@/assets/images/alipay.png"
          class="w-4 h-4 inline-block"
          alt=""
        />
        <span class="ml-1 text-xl dark:text-white">支付宝</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import DiscountsVue from './DiscountsVue.vue'
</script>
