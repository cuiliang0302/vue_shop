import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
import axios from "axios";
// 全局样式文件
import './assets/css/global.less'
// 字体图标文件
import '@fortawesome/fontawesome-free/css/all.css'
// 请求根路径
// axios.defaults.baseURL = "http://timemeetyou.com:8889/api/private/v1/"

axios.defaults.baseURL = "http://rambuild.cn:8888/api/private/v1/"
// 请求时头部携带token认证信息
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // console.log(config)
  return config
})
axios.timeout = 1000 * 10
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
