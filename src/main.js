import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = '/api'
// axios.defaults.baseURL = "/"
axios.defaults.withCredentials = true
// axios.interceptors.request.use(config => {
//   // console.log(config)
//   config.headers.Authorization = window.sessionStorage.getItem('userid')
//   // 在最后必须 return config
//   return config
// })
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$qs = qs

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
