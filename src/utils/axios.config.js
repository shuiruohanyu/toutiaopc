// 对于axios进行拦截处理
import axios from 'axios'
import jsonBig from 'json-bigint'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 由于后端数据返回的id为超大类型的数据 所以需要统一处理下  jsonBig是个库
axios.defaults.transformResponse = [
  function (data) {
    return jsonBig.parse(data)
  }
]
axios.interceptors.request.use(
  config => {
    // 在每个请求里面加入token
    let userInfo = window.localStorage.getItem('user-info')
    userInfo = userInfo ? JSON.parse(userInfo) : null
    userInfo && (config.headers.Authorization = `Bearer ${userInfo.token}`)
    return config // 必须返回配置文件
  },
  error => {
    Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    return response.data ? response.data : null
  },
  error => {
    let code = error.response ? error.response.status : ''
    let message = ''
    switch (code) {
      case 400:
        message = '请求参数错误'
        break
      case 401:
        message = 'token过期或未传'
        break
      case 403:
        message = '操作失败'
        break
      case 404:
        message = '手机号不正确'
        break
      case 500:
        message = '服务器异常'
        break
      case 507:
        message = '服务器数据库异常'
        break
      default:
        message = '处理异常'
    }
    Message({
      type: 'warning',
      message
    })
    return new Promise(function () {}) // 终止当前的promise链
  }
)
export default axios
