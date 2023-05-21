import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router";
import store from "./store/index";
import axios from 'axios'
import BASE_URL from './config.js';
import DashboardPlugin from "./plugins/dashboard-plugin";
import GlobalValue from './global/GlobalVariable'
import GlobalFunction from './global/GlobalFunction'
import VueSweetalert2 from "vue-sweetalert2";
import lodash from 'lodash';

Vue.prototype.$axios = axios
Vue.prototype._ = lodash
Vue.prototype.$BASE_URL = BASE_URL
Vue.prototype.GLOBALVAL = GlobalValue
Vue.prototype.GLOBALFNC = GlobalFunction
Vue.config.productionTip = false;

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

import Photoswipe from "vue-pswipe";
Vue.use(Photoswipe);
Vue.use(DashboardPlugin);
Vue.use(VueSweetalert2);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

