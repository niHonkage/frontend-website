import axios from 'axios'

export const service = axios.create({
  // 表示开发时的api请求
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(function (config) {
  config.headers.icode = 'helloqianduanxunlianying'
  return config
})

// 响应拦截器
service.interceptors.response.use(
  function (response) {
    const { data } = response.data
    return data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default service
