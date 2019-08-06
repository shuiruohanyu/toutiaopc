import header from './header'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import upload from './upload'
export default {
  // 默认方法
  install (Vue) {
    Vue.component('content-header', header) // 注册头部组件
    Vue.component('quill-editor', quillEditor) // 注册富文本编辑器
    Vue.component('img-upload', upload) // 注册上传文件组件
  }
}
