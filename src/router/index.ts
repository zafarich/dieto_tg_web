import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { setupMiddleware } from './middleware'

const router = createRouter({
  history: createWebHistory(),
  routes
})

setupMiddleware(router)

export default router