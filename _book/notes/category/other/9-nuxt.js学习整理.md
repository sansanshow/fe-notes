# nuxt.js学习整理
[环境部署](https://juejin.im/post/5a24df9ef265da43133cfb2e)

[git部署介绍](https://github.com/wmui/web-deploy/blob/master/httpsbu-shu.md)
## vue-router 基础
### 1. /users/1 -> /users/2  目的地和当前路由相同
如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 /users/1 -> /users/2)，你需要使用` beforeRouteUpdate `来响应这个变化 (比如抓取用户信息)。    
也可以使用` watch `来观察route的变动
```
使用组件内路由钩子
beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
}

或者

watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
}

```

### 2. 匹配优先级
有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：**谁先定义的**，谁的优先级就最**高**。

### 3. 嵌套路由
```
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```
基于上面的配置，当你访问 /user/foo(对应路由`/user/:id`) 时，User 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：

```
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: '', component: UserHome },

        // ...其他子路由
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```
> Tips   

**如果提供了 path，params 会被忽略，上述例子中的` query `并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的` name `或手写`完整的带有参数的 path`：**
```
const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

## Nuxt 使用axios 
事实上，nuxt, 是自带axios的.    

详细使用见githb(https://github.com/nuxt/nuxt.js/tree/dev/examples/axios)

## Nuxt 插件使用
在nuxt中使用UI框架，比如 mint-ui
1. 运行
```
npm install mint-ui --save
```
2. plugins中创建 mint-ui.js
```
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'

Vue.use(MintUI)
```

3. nuxt.config.js中加入
```
module.exports = {
 /*
  ** plugins
  */
  plugins: [
    // ……
    '~plugins/mint-ui'
    // ……
  ],
}
```

4. 如果需要在页面中多次引用，则会被多次打包，需要配置只打包一次。    
配置如下：
```
module.exports = {
  build: {
    vendor: ['mint-ui'],
    // ...其他配置
  }
}
```
# Nuxt + express 快速构建项目
https://www.cnblogs.com/stealth7/p/7299614.html


**生成模板项目**

```
vue init nuxt/express mynuxtexpress
```
