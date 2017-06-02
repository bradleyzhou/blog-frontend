// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import auth from './auth'
import axios from 'axios'
import moment from 'moment'
import MarkDownIt from 'markdown-it'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL = '/api/v1.0'
Vue.prototype.$moment = moment
Vue.prototype.$md = new MarkDownIt()

Vue.prototype.$auth = auth
Vue.prototype.$auth.checkAuth()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
