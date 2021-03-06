import Vue from 'vue'
import App from './App.vue'
import './permission.js'
import router from './router'
import ElementUI from 'element-ui'
import Component from './components'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from './utils/axios.config'
import store from './store'
Vue.prototype.$http = axios // 将axios赋值给全局变量
Vue.config.productionTip = false
Vue.use(Component)
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
