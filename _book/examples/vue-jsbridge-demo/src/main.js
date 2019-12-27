// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueBridgeWebview from 'vue-bridge-webview'

Vue.config.productionTip = false

Vue.use(VueBridgeWebview)
// set default config 
VueBridgeWebview.config(1000, true);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
