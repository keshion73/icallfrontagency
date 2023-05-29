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

router.beforeEach((to, from, next) => {
  //authenticationState는 유저가 로그인이 되어있는지 아닌지 값을 가져와 판별해준다.
  let isLogin = store.getters['sessionStore/GET_ISLOGIN_INFO'];
  if (to.name == 'Login') {
    next();
  } else {
    if (!isLogin) {
      // 로그인이 되어있지 않으면 로그인 페이지로 보낸다.
      return next({ path: "/login" });
    } else {
      next();
    }
  }
});

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

