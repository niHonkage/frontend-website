<template>
  <div>
    <waterfall-layout
      :data="pexelsList"
      nodeKey="id"
      :column="5"
      :picturePrereading="true"
    >
      <template v-slot="{ item, width }">
        <list-item :data="item"></list-item>
      </template>
    </waterfall-layout>
  </div>
</template>
<script setup>
import ListItem from './ListItem.vue'
import { getPexelsList } from '@/api/pexels.js'
import { ref } from 'vue'

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
