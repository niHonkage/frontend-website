<template>
  <div class="h-full w-full bg-zinc-200 dark:bg-zinc-800">
    <pins-vue :id="$route.params.id"></pins-vue>
  </div>
</template>
<script setup>
import PinsVue from './component/pins.vue'
</script>
