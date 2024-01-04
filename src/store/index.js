import { createStore } from 'vuex'
import category from './modules/category'

const store = createStore({
  state() {
    return {}
  },
  mutations: () => {},
  getters: {
    categorys: (state) => state.category.categorys
  },
  modules: {
    category
  }
})

export default store
