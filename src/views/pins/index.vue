<template>
  <div class="w-full h-full bg-zinc-200 dark:bg-zinc-800">
    <pins-vue :id="$route.params.id"></pins-vue>
  </div>
</template>
<script>
import PinsVue from './component/pins.vue'
</script>
