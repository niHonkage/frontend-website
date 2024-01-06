<template>
  <div
    class="w-full border-b bg-white border-b-zinc-200 dark:bg-zinc-800 dark:border-b-zinc-700 px-2 py-1"
  >
    <div class="flex items-center">
      <img
        class="h-4 mr-2 cursor-pointer rounded-full"
        src="https://github.com/nihonKage.png"
        @click="onToHome"
      />
      <header-search class="mr-1"></header-search>
      <header-theme class="mr-1"></header-theme>
      <header-user></header-user>
    </div>
  </div>
</template>
<script setup>
import HeaderTheme from './HeaderTheme.vue'
import HeaderUser from './HeaderUser.vue'
import HeaderSearch from './HeaderSearch/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const onToHome = () => {
  router.push('/')
}
</script>
