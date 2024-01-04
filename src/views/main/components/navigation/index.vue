<template>
  <mobile-navigation v-if="isMobileTerminal" />
  <pc-navigation v-else></pc-navigation>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigation from './mobile/index.vue'
import PcNavigation from './PC/index.vue'
import { useStore } from 'vuex'

const store = useStore()
store.dispatch('category/useCategoryData')
</script>
