# 一、按需加载
## 1.1、为什么需要按需加载
随着web应用功能越来越复杂，模块打包后体积越来越大，这样会带来两个问题：

- 所有的js文件打包到一个bundle.js中导致首屏加载时间过长
- 有时我们只是修改了一个模块就得重新打包所用的文件。webpack天然支持多种模块系统风格，支持灵活的代码分割


## 1.2、按需加载的三种方式
webpack支持三种代码分割方式分别是：

1. AMD: require(url, '别名')
2. CommonJS: require.ensure([],func),
3. ES6: import(url)

## 1.3、vue中如何按需加载
对应的vue中也有三种对应的解决方式：

### vue异步组件技术
```
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/vue-async',
            name: 'vueAsync',
            component: resolve => require(['@/components/VueAsync'], resolve)
        }
    ]
})
```
### webpack提供的require.ensure()
```
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/require-ensure'
            name: 'RequireEnsure',
            component: r => require.ensure([], () => r(require('@/components/RequireEnsure'), 'ensure'))
        }
    ]
})
```
### 利用ES6提案的import()函数
```
import Vue from 'vue'
import Router from 'vue-router'

const EsImport = () => import('@/components/EsImport')
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
    {
        path: '/es-import',
        name: 'EsImport',
        component: EsImport
    }
]
})
```
> 第三种方式比较简单，而且代码组织也比较明显，所以也更常被使用
