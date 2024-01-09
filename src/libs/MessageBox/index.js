import messageComponent from './index.vue'
import { h, render } from 'vue'

export const message = (type, content, duration = 5000) => {
  // 创建销毁函数作为参数
  const onDestory = () => {
    render(null, document.body)
  }
  // 生成vnode
  const vnode = h(messageComponent, {
    type,
    content,
    duration,
    destroy: onDestory
  })
  // 利用render函数渲染
  render(vnode, document.body)
}
