import { ALL_CATEGORY_ITEM } from '@/constants'
export default {
  namespaced: true,
  state: () => ({
    // 当前选中的分类
    currentCategory: ALL_CATEGORY_ITEM,
    // 搜索文本
    searchText: '',
    // 路由跳转类型
    routerType: 'none'
  }),
  mutations: {
    // 切换选中分类
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },
    // 修改搜索文本
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText
    },
    // 切换路由跳转类型
    changeRouterType(state, newRouterType) {
      state.routerType = newRouterType
    }
  }
}
