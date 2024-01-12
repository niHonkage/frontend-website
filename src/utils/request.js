import axios from 'axios'
import store from '../store'

export const service = axios.create({
  // 表示开发时的api请求
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  function (config) {
    config.headers.icode = 'helloqianduanxunlianying'
    // 如果token存在注入到请求头的授权信息中
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  function (response) {
    const { data } = response.data
    return data
  },
  function (error) {
    // 处理token超时
    if (error.response && error.response.data && error.response.data.code) {
      // TODO：token超时操作
      store.dispatch('user/logout')
    }
    return Promise.reject(error)
  }
)

export default service
