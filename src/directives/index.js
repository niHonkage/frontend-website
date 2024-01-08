export default {
  install(app) {
    // import.meta.globEager 为同步导入
    const directives = import.meta.globEager('./modules/*.js')
    const directiveArr = Object.entries(directives)
    for (const [key, value] of directiveArr) {
      // 分割路径名选择组件name
      const strArr = key.split('/')
      const directiveName = strArr[strArr.length - 1].replace('.js', '')
      app.directive(directiveName, value.default)
    }
  }
}
