import { loginUser } from '@/api/sys'
import md5 from 'md5'

export default {
  namespaced: true,
  state: () => ({
    // 登陆后的token
    token: ''
  }),
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
    }
  },
  actions: {
    async login(context, payload) {
      // 从表单信息中解构出密码
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      context.commit('setToken', data.token)
    }
  }
}
