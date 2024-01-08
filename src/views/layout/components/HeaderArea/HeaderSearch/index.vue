<template>
  <div class="w-full">
    <search-input
      v-model="inputValue"
      @search="onSearchHandler"
      @clear="onSearchHandler"
    >
      <template #dropdown>
        <div>
          <search-hint
            :search-text="inputValue"
            v-show="inputValue"
            @itemClick="onSearchHandler"
          ></search-hint>
        </div>
      </template>
    </search-input>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import SearchHint from './SearchHint.vue'

const inputValue = ref('')
// 搜索的回调
const onSearchHandler = (val) => {
  inputValue.value = val
}
</script>
