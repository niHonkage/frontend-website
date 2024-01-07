<template>
  <div>
    <waterfall-layout
      class="w-full px-1"
      :data="pexelsList"
      nodeKey="id"
      :column="isMobileTerminal ? 2 : 5"
      :picturePrereading="flase"
    >
      <template v-slot="{ item, width }">
        <list-item :data="item" :width="width"></list-item>
      </template>
    </waterfall-layout>
  </div>
</template>
<script setup>
import ListItem from './ListItem.vue'
import { getPexelsList } from '@/api/pexels.js'
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible.js'

const query = {
  page: 1,
  size: 20
}

const pexelsList = ref([])
const getPexelsData = async () => {
  const res = await getPexelsList(query)
  pexelsList.value = res.list
}
getPexelsData()
</script>
