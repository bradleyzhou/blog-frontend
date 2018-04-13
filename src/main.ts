import Vue from 'vue';
import axios from 'axios';
import moment from 'moment';
import MarkDownIt from 'markdown-it';
import { AuthServer } from './auth';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = '/api/v1.0';
Vue.prototype.$moment = moment;
Vue.prototype.$md = new MarkDownIt();
Vue.prototype.$auth = AuthServer;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');



