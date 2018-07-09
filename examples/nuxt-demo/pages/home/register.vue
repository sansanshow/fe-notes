<template>
    <section class="login-register">
        <div class="banner">
            <img class="bannerImg" src="//dn-dev-ubank-web-server.qbox.me/indcooldqafhkytocqbrewmhhhhaatmd_100000075_1508814855">
            <div class="bank-icon" id="banner_bank_bar">
                <div class="bank">
                    <div id="banner_bank_tit" class="tit">
                        <span class="icon">
                            <img class="js_bankIcon" src="//dn-dev-ubank-web-server.qbox.me/awarzwgjqavkoeuvnqaxfwssmzyqamwm_100000075_1508816315">
                        </span>
                        <span class="name js_bankName">孟州农商银行</span>
                    </div>
                </div>
            </div>

            <div class="cloud">
                <img src="//o4jh53fw9.qnssl.com/dev/credit_micro/m/themes/default/home/images/cloud.png?1530499161542">
            </div>
        </div>
        <div class="register-container">
            <mt-field label="number" placeholder="Input number" type="number" v-model="register.mobile"></mt-field>
            <mt-button type="primary" size="large" @click="login">登录</mt-button>
        </div>
  </section>
</template>
<script>
// import axios from '~plugins/axios'
import axios from 'axios'
export default {
    layout: "full",
    data () {
        return {
            register: {
                mobile:'11',
            }
        }
    },
    // 可以在服务端或路由更新之前被调用
    asyncData (ctx) {
        if(ctx.isClient) {
            console.log('---ctx.isClient')
        } else if(ctx.isServer) {
            console.log('---ctx.isServer')
        } else {
            console.log('ssssssssssss')
        }
        return { project: 'nuxt' }
    },

    // 设置状态树（store）数据，不会设置组件的数据
    fetch (ctx) {
        if(ctx.isClient) {
            console.log('--fetch-ctx.isClient')
        } else if(ctx.isServer) {
            console.log('--fetch-ctx.isServer')
        } else {
            console.log('fetch-else')
        }
    },
     head () {
        return {
            title: '银行微贷，无忧贷款',
            meta: [
                { hid: 'description', name: 'description', content: '无忧贷款' }
            ]
        }
    },
    validate({ params, query }) {
        return true // 如果参数有效
        // return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
    },
    methods: {
        login () {
            console.log('--click-login')
            // this.$axios.get('/users').then(res => {
            //     console.log('success-axios-register-'+ res);
            // }).catch(err => {
            //     console.log('error-axios-register-'+ err);
            // })

            // axios.all([axios.get('/users'), axios.get('/users')]).then(axios.spread((users1, users2) => {
            //     console.log('success-axios-register-'+ users1);
            //     console.log('success-axios-register-'+ users2);
            // }))
            axios.get('/users/1').then(res => {
                console.log('success-axios-register-'+ res);
            }).catch(err => {
                console.log('error-axios-register-'+ err);
            })
            
            this.$store.commit('login')
            this.$router.push({
                path: '/test'
            })
        }
    }
}
</script>

<style lang="less">
.login-register {
    .banner {
        position: relative;
        width: 100%;
        .cloud {
            position: absolute;
            width: 100%;
            height: 67px;
            background-size: 100% 100%;
            z-index: 2;
            bottom: -3px;
        }
    }
    .bannerImg {
        width: 100%;
        height: 315px;
    }
    .bank-icon {
        width: 100%;
        margin: 0 auto;
        position: absolute;
        top: 0;
        .bank {
            text-align: center;
            .tit {
                display: inline-block;
                padding: 1px 5px;
                background-color: #fff;
                border-radius: 0 0 7px 7px;
                position: relative;
                .icon {
                    display: inline-block;
                    width: 36px;
                    height: 36px;
                    vertical-align: middle;
                    margin-right: 3px;
                    text-align: center;
                }
                .name {
                    line-height: 36px;
                    font-size: 14px;
                    color: #333;
                }

            }
            .tit::before {
                content: "";
                display: block;
                width: 0.08rem;
                height: 0.08rem;
                position: absolute;
                transform: scaleX(-1);
                -webkit-transform: scaleX(-1);
                left: -0.07rem;
                top: 0;
                background-repeat: no-repeat;
                background-position: 0 45.57166%;
                -moz-background-size: 0.24rem auto;
                -o-background-size: 0.24rem auto;
                -webkit-background-size: 0.24rem auto;
                background-size: 0.24rem auto;
            }
            .tit::before {
                content: "";
                display: block;
                width: 0.08rem;
                height: 0.08rem;
                position: absolute;
                transform: scaleX(-1);
                -webkit-transform: scaleX(-1);
                left: -0.07rem;
                top: 0;
                background-repeat: no-repeat;
                background-position: 0 45.57166%;
                -moz-background-size: 0.24rem auto;
                -o-background-size: 0.24rem auto;
                -webkit-background-size: 0.24rem auto;
                background-size: 0.24rem auto;
            }
        }
    }
}
</style>
