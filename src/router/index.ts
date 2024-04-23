import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/session-time-series-car',
      name: 'session-time-series-car',
      component: () => import('../views/SessionTimeSeriesCarView.vue')
    }
  ]
})

export default router
