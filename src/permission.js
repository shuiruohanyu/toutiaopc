// 权限文件
import router from './router'
// 三个参数
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/home') && !checkIsLogin()) {
    // 如果是以/home为开头 说明必须要token认证
    next('/login')
  } else {
    next()
  }
})
const checkIsLogin = function () {
  let token = window.localStorage.getItem('pc-token')
  return !!token
}
