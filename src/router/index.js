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
          component: () => import('../views/articles')
        },
        {
          path: 'publish',
          component: () => import('../views/publish')
        },
        {
          path: 'comment',
          component: () => import('../views/comment')
        },
        {
          path: 'material',
          component: () => import('../views/material')
        },
        {
          path: 'account',
          component: () => import('../views/account')
        },
        {
          path: 'twlist',
          component: () => import('../views/fans/twlist')
        },
        {
          path: 'fansinfo',
          component: () => import('../views/fans/fansinfo')
        },
        {
          path: 'fansnew',
          component: () => import('../views/fans/fansnew')
        },
        {
          path: 'fanslist',
          component: () => import('../views/fans/fanslist')
        }
      ]
    }
  ]
})

export default router
