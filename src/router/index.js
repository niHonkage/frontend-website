import { createRouter, createWebHistory } from 'vue-router'
import { isMobileTerminal } from '../utils/flexible'
import mobileTerminalRoutes from './modules/mobile-routes.js'
import pcTerminalRoutes from './modules/pc-routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes: isMobileTerminal.value ? mobileTerminalRoutes : pcTerminalRoutes
})

export default router
