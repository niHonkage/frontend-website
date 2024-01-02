import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './styles/index.scss'
import router from './router'
import { useRem } from './utils/flexible'
useRem()

createApp(App).use(router).mount('#app')
