import Axios from 'axios'
import Vue from 'vue'
import router from '../router'
import Cookie from './cookie'

Axios.defaults.baseURL = process.env.BASE_URL

Axios.interceptors.request.use(function (config) {
    config.headers = {
        version: process.env.API_VERSION,
        token: Cookie.get('m_token')
    }
    Vue.prototype.$Loading.start()
    return config
})

Axios.interceptors.response.use(function (response) {
    if (response.data.code !== '0000') {
        Vue.prototype.$Loading.error()
        if (response.data.code === '6302') {
      // router.push('/')
            location.href = 'index.html'
        }
        Vue.prototype.$Message.error(response.data.message)
        return Promise.reject(new Error(response.data.code))
    }
    Vue.prototype.$Loading.finish()
    return response
}, function (error) {
    Vue.prototype.$Loading.error()
    if (error.response.status === 608) {
        if (error.response.data.code === '6302') {
      // router.push('/')
            location.href = 'index.html'
        } else if (error.response.data.code === '0003') {
            router.replace('/home/401')
            return Promise.reject(error)
        } else if (error.response.data.code === '0004') {
            Vue.prototype.$Modal.warning({
                title: '提示信息',
                content: '系统已更新，请重新登录再进行操作！',
                onOk: function () {
                    location.href = 'index.html'
                }
            })
            return Promise.reject(error)
        }
        Vue.prototype.$Message.error(error.response.data.message || 'server error')
    } else if (error.response.status === 404) {
        Vue.prototype.$Message.error({
            content: `出错啦，您访问的地址不存在`,
            onClose: () => {
                router.replace('/home/404')
            }
        })
    } else {
        Vue.prototype.$Message.error('system error')
    }
    return Promise.reject(error)
})

export default Axios
