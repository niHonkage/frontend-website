import { loginUser, getProfile, registerUser } from '@/api/sys'
import md5 from 'md5'
import { message } from '@/libs'

export default {
  namespaced: true,
  state: () => ({
    // 登陆后的token
    token: '',
    // 登陆后的用户信息
    userInfo: ''
  }),
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
    },
    setUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo
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
      context.dispatch('profile')
    },
    async profile(context) {
      const data = await getProfile()
      context.commit('setUserInfo', data)
      // 欢迎
      message(
        'success',
        `欢迎您 ${
          data.vipLevel
            ? '尊贵的VIP' + data.vipLevel + '用户' + data.nickname
            : '用户' + data.nickname
        }`,
        6000
      )
    },
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      location.reload()
    },
    async register(context, payload) {
      const { password } = payload
      return await registerUser({
        ...payload,
        password: password ? md5(password) : ''
      })
    }
  }
}
