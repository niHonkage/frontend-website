<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900"
    ref="containerTarget"
  >
    <navigation-vue></navigation-vue>
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <list-vue></list-vue>
    </div>
    <trigger-menu
      v-if="isMobileTerminal"
      class="fixed bottom-6 left-[50%] translate-x-[-50%]"
    >
      <trigger-menu-item
        icon="home"
        iconClass="fill-zinc-900 dark:fill-zinc-200"
      >
        首页
      </trigger-menu-item>
      <trigger-menu-item
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        v-if="$store.getters.token"
        @click="onVIPClick"
      >
        VIP
      </trigger-menu-item>
      <trigger-menu-item
        icon="profile"
        fillClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onMyClick"
      >
        {{ $store.getters.token ? '我的' : '登录' }}
      </trigger-menu-item>
    </trigger-menu>
  </div>
</template>
<script>
export default {
  name: 'home'
}
</script>

<script setup>
import NavigationVue from './components/navigation/index.vue'
import ListVue from './components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexible.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useScroll } from '@vueuse/core'
import { onActivated, ref } from 'vue'

const store = useStore()
const router = useRouter()

const onVIPClick = () => {}

const onMyClick = () => {
  store.commit('app/changeRouterType', 'push')
  if (store.getters.token) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}

// 记录当前滚动位置
const containerTarget = ref(null)
const { y: containerTargetScrollY } = useScroll(containerTarget)
// 被缓存的组件再次可见时触发
onActivated(() => {
  if (!containerTarget.value) {
    return
  }
  // 滚动到记录好的位置
  containerTarget.value.scrollTop = containerTargetScrollY.value
})
</script>
