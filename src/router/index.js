import { createRouter, createWebHistory, createMemoryHistory  } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import '../../node_modules/nprogress/nprogress.css' 
import JwtService from '@/services/jwt_service'
import NProgress from 'nprogress'

const baseUrl = import.meta.env.BASE_URL
const history = import.meta.env.SSR ? createMemoryHistory(baseUrl) : createWebHistory(baseUrl)


const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

if (!import.meta.env.SSR) {
  router.beforeEach(async (to, from, next) => {
      JwtService.checkTokenAndDeleteItIfItIsExpired()
      console.log(JwtService.checkTokenAndDeleteItIfItIsExpired())

      return next()
  })

  router.beforeResolve((to, from, next) => {
      if (to.name) {
          NProgress.start()
      }
      next()
  })
  router.afterEach((to, from) => {
    NProgress.done()
  })
}

export default router
