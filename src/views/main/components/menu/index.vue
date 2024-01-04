<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 px-1 mb-2 font-bold">所有分类</h2>
    <ul class="overflow-y-scroll">
      <li
        class="text-lg px-1 py-2 text-zinc-900 active:text-zinc-100 duration-200"
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        @click="$emit('onClickChoose', index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script setup></script>
