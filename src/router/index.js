import Vue from 'vue'
import Router from 'vue-router'
import layout from '../components/layout/layout.vue'
import home from '../views/home'
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
          path: '',
          component: home
        },
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
          component: () => import('../views/fans/fansnew')
        },
        {
          path: 'fansinfo',
          component: () => import('../views/fans/fansnew')
        },
        {
          path: 'fansnew',
          component: () => import('../views/fans/fansnew')
        },
        {
          path: 'fanslist',
          component: () => import('../views/fans/fansnew')
        }
      ]
    },
    {
      path: '*',
      component: () => import('../views/404.vue')
    }
  ]
})

export default router
