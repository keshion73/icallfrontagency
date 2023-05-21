import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/router/modules/login.js'
import Error from '@/views/error/Error'
import Main from '@/router/modules/main.js'
import Charge from '@/router/modules/charge.js'
import Myinfo from '@/router/modules/myinfo.js'
import Usim from '@/router/modules/usim.js'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...Login,
    ...Main,
    ...Charge,
    ...Myinfo,
    ...Usim,
    {
      path: '/error',
      name: 'Error',
      component: Error
    },
    {
      path: '*',
      component: Error
    }
  ]
})
