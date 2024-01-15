<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-300 xl:pt-1">
    <div
      class="max-w-screen-lg bg-white dark:bg-zinc-900 xl:mx-auto xl:mt-2 xl:px-4 xl:border xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600"
    >
      <!-- 移动端navbar -->
      <nav-bar v-if="isMobileTerminal" sticky :clickLeft="onNavBarClick">
        精选会员
      </nav-bar>

      <div class="py-2 px-1">
        <h2
          class="text-[34px] font-bold text-center text-yellow-700tracking-widest"
        >
          精选VIP
        </h2>
        <p class="text-yellow-400 text-lg text-center">
          升级精选VIP畅想所有内容
        </p>
        <!-- VIP价格菜单列表 -->
        <div
          class="flex flex-nowrap overflow-auto justify-between mt-5 pb-2 scrollbar-thin scrollbar-thumb-zinc-600 dark:scrollbar-thumb-zinc-200 scrollbar-track-transparent"
        >
          <pay-menu-item
            v-for="item in vipPayListData"
            :key="item.id"
            :hot="item.isHot"
            :select="item.id === currentItem.id"
            :data="item"
            @click="changeCurrentItem"
          ></pay-menu-item>
        </div>
        <!-- 特定item的说明文字 -->
        <p class="text-sm mt-1 text-zinc-500">{{ currentItem.desc }}</p>

        <!-- 支付模块 -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'member'
}
</script>
<script setup>
import { isMobileTerminal } from '@/utils/flexible.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import PayMenuItem from './components/PayMenuItem.vue'
import { getVipPayList } from '@/api/pay'
import { ref } from 'vue'

const store = useStore()
const router = useRouter()

// 移动端导航栏点击事件
const onNavBarClick = () => {
  store.commit('app/changeRouterType', 'back')
  router.back()
}

const vipPayListData = ref([])
const currentItem = ref({})
const getVipPayListData = async () => {
  const res = await getVipPayList()
  vipPayListData.value = res
  currentItem.value = vipPayListData.value[0]
}
getVipPayListData()

// 点击改变当前选中item
const changeCurrentItem = (item) => {
  currentItem.value = item
}
</script>
