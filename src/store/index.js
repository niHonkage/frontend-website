import { createStore } from 'vuex'
import theme from './modules/theme.js'
import category from './modules/category'
import VuexPersistence from 'vuex-persist'

// 配置vuex-persist
const vuexLocal = new VuexPersistence({
  key: 'local',
  storage: window.localStorage
})
const store = createStore({
  state() {
    return {}
  },
  mutations: () => {},
  getters: {
    categorys: (state) => state.category.categorys,
    themeType: (state) => state.theme.themeType
  },
  modules: {
    category,
    theme
  },
  plugins: [vuexLocal.plugin]
})

export default store
