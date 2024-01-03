<template>
  <div class="w-full">
    <search-input v-model="inputValue">
      <template #dropdown>
        <div>dropdown</div>
      </template>
    </search-input>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>
