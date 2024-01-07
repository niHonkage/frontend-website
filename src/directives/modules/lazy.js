import { useIntersectionObserver } from '@vueuse/core'

export default {
  // 图片懒加载就是监听图片是否处于可视视口内从而决定是否渲加载图片
  // 如何不加载图片：可以把src替换成本地替代图片
  mounted(el) {
    // 1.拿到src
    const imgSrc = el.src
    // 2.替换src
    el.src = ''
    // use方法会返回一个对象，其中stop方法可以停止监听
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 图片处于可视视口内加载
        el.src = imgSrc
        // 停止监听
        stop()
      }
    })
  }
}
