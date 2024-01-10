<template>
  <div class="w-full">
    <search-input
      class="guide-search"
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
          <!-- 热门精选 -->
          <popular-theme v-show="!inputValue"></popular-theme>
        </div>
      </template>
    </search-input>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import SearchHint from './SearchHint.vue'
import SearchHistory from './SearchHistory.vue'
import PopularTheme from './PopularTheme.vue'
import { useStore } from 'vuex'

const inputValue = ref('')
const store = useStore()
// 搜索的回调
const onSearchHandler = (val) => {
  if (val) {
    inputValue.value = val
    // 触发修改store
    store.commit('search/addHistory', val)
    store.commit('app/changeSearchText', val)
  }
}
</script>
