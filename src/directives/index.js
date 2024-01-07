import lazy from './modules/lazy.js'

export default {
  install(app) {
    app.directive('lazy', lazy)
  }
}
