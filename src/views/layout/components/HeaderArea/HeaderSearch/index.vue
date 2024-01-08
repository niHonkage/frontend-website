<template>
  <div class="w-full">
    <search-input
      v-model="inputValue"
      @search="onSearchHandler"
      @clear="onSearchHandler"
    >
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <search-hint
            :search-text="inputValue"
            v-show="inputValue"
            @itemClick="onSearchHandler"
          ></search-hint>
          <!-- 搜索历史 -->
          <search-history
            v-show="!inputValue"
            @itemClick="onSearchHandler"
          ></search-history>
        </div>
      </template>
    </search-input>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import SearchHint from './SearchHint.vue'
import SearchHistory from './SearchHistory.vue'

const inputValue = ref('')
// 搜索的回调
const onSearchHandler = (val) => {
  inputValue.value = val
}
</script>
