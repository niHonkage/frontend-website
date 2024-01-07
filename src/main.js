import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './styles/index.scss'
import router from './router'
import { useRem } from './utils/flexible'
import mLibs from '@/libs/index.js'
import 'virtual:svg-icons-register'
import store from './store'
import useTheme from '@/utils/theme.js'
import MyDirective from '@/directive'
useTheme()
useRem()

createApp(App).use(store).use(mLibs).use(router).use(MyDirective).mount('#app')
