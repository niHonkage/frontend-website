import axios from 'axios'

export const service = axios.create({
  // 表示开发时的api请求
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 响应拦截器
service.interceptors.response.use((response) => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    // TODO:错误逻辑
    return Promise.reject(new Error(message))
  }
})

export default service
