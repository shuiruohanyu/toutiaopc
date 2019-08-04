import Vue from 'vue'
import Router from 'vue-router'
import layout from '../components/layout/layout.vue'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login')
    },
    {
      path: '/',
      name: 'home',
      component: layout
    }
  ]
})

export default router
