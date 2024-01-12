import { createStore } from 'vuex'
import theme from './modules/theme.js'
import category from './modules/category'
import app from './modules/app.js'
import VuexPersistence from 'vuex-persist'
import search from './modules/search.js'
import user from './modules/user.js'

// 配置vuex-persist
const vuexLocal = new VuexPersistence({
  key: 'local',
  storage: window.localStorage,
  modules: ['category', 'theme', 'search', 'user']
})
const store = createStore({
  state() {
    return {}
  },
  mutations: () => {},
  getters: {
    categorys: (state) => state.category.categorys,
    themeType: (state) => state.theme.themeType,
    currentCategory: (state) => state.app.currentCategory,
    currentCategoryIndex: (state, getters) => {
      return getters.categorys.findIndex((category) => {
        return category.id === getters.currentCategory.id
      })
    },
    searchHistory: (state) => state.search.historyList,
    searchText: (state) => state.search.searchText,
    token: (state) => state.user.token,
    userInfo: (state) => state.user.userInfo
  },
  modules: {
    category,
    theme,
    app,
    search,
    user
  },
  plugins: [vuexLocal.plugin]
})

export default store
