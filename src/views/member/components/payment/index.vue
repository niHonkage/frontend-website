<template>
  <div>
    <!-- pc端支付 -->
    <pc-payment v-if="!isMobileTerminal"></pc-payment>
    <!-- 移动端支付 -->
    <mobile-payment v-else></mobile-payment>
  </div>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible.js'
import PcPayment from './PcPayment.vue'
import MobilePayment from './MobilePayment.vue'
</script>
