import Vue from 'vue'
import Router from 'vue-router'
import layout from '../components/layout/layout.vue'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login')
    },
    {
      path: '/home',
      name: 'home',
      component: layout,
      children: [
        {
          path: 'articles',
          component: () => import('./views/articles')
        }
      ]
    }
  ]
})

export default router
