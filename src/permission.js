// 权限文件
import router from './router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 三个参数
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/home') && !checkIsLogin()) {
    // 如果是以/home为开头 说明必须要token认证
    next('/login')
  } else {
    nProgress.start() // 进度条开始
    next()
  }
})
router.afterEach(() => {
  nProgress.done() // 进度条结束
})
// 判断用户是否登录
const checkIsLogin = function () {
  let userInfo = window.localStorage.getItem('user-info')
  userInfo = userInfo ? JSON.parse(userInfo) : null
  return userInfo && userInfo.token
}
