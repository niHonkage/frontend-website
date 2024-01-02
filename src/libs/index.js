import { defineAsyncComponent } from 'vue'
export default {
  install(app) {
    // 获取特定路径下的所有index.vue文件
    const components = import.meta.glob('./*/index.vue')
    // 循环 路径：导入语句 的键值对
    for (const [key, value] of components) {
      // 拼接组件名
      const componentName = key.replace('./', '').split('/')[0]
      app.component(componentName, defineAsyncComponent(value))
    }
  }
}
