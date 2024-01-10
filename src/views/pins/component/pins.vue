<template>
  <div class="fixed top-0 left-0 bg-slate-500 text-xl w-screen h-screen z-20">
    {{ id }}
  </div>
</template>
<script setup>
defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>
