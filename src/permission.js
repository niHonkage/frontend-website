// 鉴定用户权限
import store from '@/store'
import router from '@/router'
import { message } from '@/libs'

router.beforeEach((to) => {
  // 无需用户权限可以进入
  if (!to.meta.user) {
    return
  }
  // 有token可以进入
  if (store.getters.token) {
    return
  }
  // 无权限
  message('warn', '登录失效，请重新登录！')
  return '/'
})
