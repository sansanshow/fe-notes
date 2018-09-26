// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import 'lib-flexible'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Axios from 'axios'

import App from './App'
import router from './router'

Axios.defaults.baseURL = '/api'

Vue.prototype.$http = Axios

Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
