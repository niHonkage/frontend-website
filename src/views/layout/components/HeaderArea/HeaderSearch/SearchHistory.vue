<template>
  <div class="">
    <div class="flex items-center text-xs mb-1 text-zinc-400">
      <span>最近搜索</span>
      <svg-icon
        name="delete"
        class="w-2.5 h-2.5 ml-1 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-100"
        fillClass="fill-zinc-400"
        @click="onDeleteAllClick"
      ></svg-icon>
    </div>

    <div class="flex flex-wrap">
      <div
        class="mr-2 mb-1.5 text-zinc-900 bg-zinc-100 font-bold px-1.5 py-0.5 flex items-center cursor-pointer text-sm rounded-sm hover:bg-zinc-200"
        v-for="(item, index) in $store.getters.historyList"
        :key="item"
        @click="onItemClick(item)"
      >
        <span>{{ item }}</span>
        <svg-icon
          name="input-delete"
          class="w-2.5 h-2.5 ml-1 p-0.5 hover:bg-zinc-100 rounded-sm duration-300"
          @click.stop="onDeleteClick(index)"
        ></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
const EMITS_ITEM_CLICK = 'itemClick'
</script>
<script setup>
import { useStore } from 'vuex'

const store = useStore()
const emits = defineEmits([EMITS_ITEM_CLICK])

// 删除全部历史记录
const onDeleteAllClick = () => {
  confirm('要删除所有历史记录吗？').then(() => {
    store.commit('search/removeAllHistory')
  })
}
// 历史记录点击事件
const onItemClick = (item) => {
  emits('itemClick', item)
}
// 删除单个历史记录
const onDeleteClick = (index) => {
  store.commit('search/removeHistory', index)
}
</script>
