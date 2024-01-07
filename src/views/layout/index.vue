<template>
  <div class="h-screen">
    <!-- 需要自定义h-head高度 -->
    <header-area class="h-header"></header-area>
    <div class="h-main">
      <main-area></main-area>
    </div>
    <floating-component></floating-component>
  </div>
</template>
<script setup>
import HeaderArea from './components/HeaderArea/index.vue'
import FloatingComponent from './components/FloatingComponent.vue'
import MainArea from './components/main.vue'
import {} from 'vue'
</script>
