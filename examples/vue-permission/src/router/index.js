import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            name: 'Login',
            path: '/',
            component: resolve => require(['../views/login.vue'], resolve)
        },
        {
            name: 'Home',
            path: '/home',
            component: resolve => require(['../views/home/home.vue'], resolve),
            children: [
                {
                    name: 'Hello',
                    path: '',
                    component: resolve => require(['../views/home/hello.vue'], resolve)
                }
            ]
        }
    ]
})

export default router
