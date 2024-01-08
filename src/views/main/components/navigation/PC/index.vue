<template>
  <div class="bg-white dark:bg-zinc-800 sticky top-0 left-0 z-10 w-full">
    <ul
      class="flex w-[800px] relative flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
      :class="[isOpen ? 'h-[206px]' : 'h-[56px]']"
    >
      <!-- lg下拉箭头 -->
      <div
        class="absolute right-1 bottom-1 p-1 z-20 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onToggle"
      >
        <svg-icon
          :name="isOpen ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></svg-icon>
      </div>
      <!-- category item -->
      <li
        class="shrink-0 px-1.5 py-0 text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 last:mr-4 duration-200 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded mr-1 mb-1"
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        @click="onItemClick(item)"
        :class="{
          'text-zinc-900 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-900':
            index === $store.getters.currentCategoryIndex
        }"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

// 展开收起状态
const isOpen = ref(false)
const onToggle = () => {
  isOpen.value = !isOpen.value
}

// 选中状态
const store = useStore()
const onItemClick = (item) => {
  store.commit('app/changeCurrentCategory', item)
}
</script>
