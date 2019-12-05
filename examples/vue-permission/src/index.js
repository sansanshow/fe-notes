import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import App from './App'
import store from './store'
import api from './api'
import '@/styles/index.scss' // 全局样式

Vue.config.productionTip = false

Vue.prototype.$api = api

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
})
