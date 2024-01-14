<template>
  <router-view v-slot="{ Component }">
    <transition
      :name="transitionName"
      @after-leave="onAfterLeave"
      @before-enter="onBeforeEnter"
    >
      <keep-alive :include="virtualTaskStack">
        <component
          :is="Component"
          :class="{ 'fixed top-0 left-0 w-screen z-50': isAnimation }"
        ></component>
      </keep-alive>
    </transition>
  </router-view>
</template>
<script>
const NONE = 'none'
const ROUTER_TYPE_PUSH = 'push'
const ROUTER_TYPE_BACK = 'back'
</script>
<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
const props = defineProps({
  // 首页的组件名称，对应任务栈中的第一个栈
  mainComponentName: {
    type: String,
    required: true
  }
})

const transitionName = ref('none')

// 使用数组模拟虚拟的任务栈
const virtualTaskStack = ref([props.mainComponentName])
// 清空任务栈
const clearStack = () => {
  virtualTaskStack.value = [props.mainComponentName]
}

// 每一次的路由跳转之前手动更改routerType，通过路由前置守卫就可以拿到每次跳转的类型
const router = useRouter()
const store = useStore()
router.beforeEach((to, from) => {
  transitionName.value = store.getters.routerType
  // 如果回到首页清空所有任务栈
  if (to.name === props.mainComponentName) {
    clearStack()
    return
  }

  // 判断routerType决定当前操作是push还是pop
  if (store.getters.routerType === ROUTER_TYPE_PUSH) {
    virtualTaskStack.value.push(to.name)
  } else if (store.getters.routerType === ROUTER_TYPE_BACK) {
    virtualTaskStack.value.pop()
  }
})

// 在进入前和退出后的钩子内控制transition脱离常规文档流(绝对定位)和回归文档流的样式
const isAnimation = ref(false)
const onBeforeEnter = () => {
  isAnimation.value = true
}
const onAfterLeave = () => {
  isAnimation.value = false
}
</script>
<style lang="scss" scoped>
// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.4s;
}
// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.4s;
}
// push页面时：新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

// 后退页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.4s;
}
// 后退页面时：后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.4s;
}
// 后退页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
// 后退页面时：后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
