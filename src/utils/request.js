import axios from 'axios'

export const service = axios.create({
  // 表示开发时的api请求
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

export default service
