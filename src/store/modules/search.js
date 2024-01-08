export default {
  namespaced: true,
  state: () => ({
    historyList: []
  }),
  // 搜索历史提供添加、删除和清空三个方法
  mutations: {
    addHistory(state, newHistory) {
      // 不允许出现重复的历史记录
      const findIndex = historyList.findIndex((history) => {
        return history === newHistory
      })
      // 如果存在，剔除旧数据
      if (findIndex !== -1) {
        state.historyList.splice(findIndex, 1)
      }
      state.historyList.unshift(newHistory)
    },
    removeHistory(state, index) {
      state.historyList.splice(index, 1)
    },
    removeAllHistory(state) {
      state.historyList = []
    }
  }
}
