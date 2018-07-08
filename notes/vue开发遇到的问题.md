## 1. 原生事件处理
有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量` $event `把它传入方法：
```
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```
```
// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
}
```

## 2. vuejs的$emit如何在父组件中自己添加参数。
首先回顾下emit使用   
1. 父组件可以使用 props 把数据传给子组件。
2. 子组件可以使用 $emit 触发父组件的自定义事件。

```
vm.$emit( event, arg ) //触发当前实例上的事件
vm.$on( event, fn );//监听event事件后运行 fn； 
```

子组件：
```
<template>  
  <div>  
    <h3>父组件传给子组件的toCity:{{sendData}}</h3>   
    <br/><button @click='select(`大连`)'>点击此处将‘大连’发射给父组件</button>  
  </div>  
</template>  
<script>  
  export default {
    props:['sendData'], // 用来接收父组件传给子组件的数据  
    methods:{  
      select(val) {  
        let data = {  
          cityname: val  
        };  
        this.$emit('showCityName',data);//select事件触发后，自动触发showCityName事件  
      }  
    }  
  }  
</script>  
```

父组件：
```
<template>  
    <div>父组件的toCity{{toCity}}</div>  
    <train-city @showCityName="updateCity" :sendData="toCity"></train-city>  
<template>  
<script>  
  import TrainCity from "./train-city";  
  export default {  
    name:'index',  
    components: {TrainCity},  
    data () {  
      return {  
        toCity:"北京"  
      }  
    },  
    methods:{  
      updateCity(data){//触发子组件城市选择-选择城市的事件  
        this.toCity = data.cityname;//改变了父组件的值  
        console.log('toCity:'+this.toCity)  
      }  
    }  
  }  
</script>  

```

当需要在父组件额外添加参数，就必须$event 代替父组件传递的值
```
showCityName="updateCity($event, ...extraParams)"
````

## 3. vue传参方式
有：
1. query
2. params+动态路由传参。

区别：
1. query通过path切换路由，params通过name切换路由

假设去Detail页面需要传递id参数

```
// query通过path切换路由 
<router-link :to="{path: 'Detail', query: { id: 1 }}">前往Detail页面</router-link>
// params通过name切换路由
<router-link :to="{name: 'Detail', params: { id: 1 }}">前往Detail页面</router-link>
// 此时router.js配置文件路由配置
{ path: 'detail/:id', component: () => ..., name: 'Detail'}
这种情况使用路由跳转就只能是name跳转了，因为path不知道怎么写。。。哈哈哈
```

2. query通过this.$route.query来接收参数，params通过this.$route.params来接收参数


## 4. vue中前进刷新、后退缓存用户浏览数据和浏览位置的实践
https://juejin.im/post/5b2ce07ce51d45588a7dbf76


- 缓存组件，vue2中提供了keep-alive。首先在我们的app.vue中定义keep-alive:
```
<keep-alive>      
    <router-view v-if="$route.meta.keepAlive"/>    
</keep-alive>    
<router-view v-if="!$route.meta.keepAlive"/>
```
在router/index.js即我们的路由文件中，定义meta信息：
```
// list是我们的搜索结果页面
{      
    path: '/list',  
    name: 'List',      
    component: resolve => require(['@/pages/list'], resolve),    
    meta: {        
        isUseCache: false,  // 这个字段的意思稍后再说      
        keepAlive: true  // 通过此字段判断是否需要缓存当前组件  
    }    
}
```

- 刷新数据or缓存数据的实现

先简单说一下和缓存相关的vue钩子函数。设置了keepAlive缓存的组件：       

第一次进入：beforeRouterEnter ->created->…->activated->…->deactivated       

后续进入时：beforeRouterEnter ->activated->deactivated

可以看出，只有第一次进入该组件时，才会走created钩子，而需要缓存的组件中activated是每次都会走的钩子函数。所以，我们要在这个钩子里面去判断，当前组件是需要使用缓存的数据还是重新刷新获取数据。思路有了，下面我们来实现：

```
/ list组价的activated钩子
 activated() {
    // isUseCache为false时才重新刷新获取数据
    // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的         
    if(!this.$route.meta.isUseCache){            
        this.list = []; // 清空原有数据
        this.onLoad(); // 这是我们获取数据的函数
    } 
}

```


## 5. 定时器问题
单页面的问题：

我在a页面写一个定时，让他每秒钟打印一个1，然后跳转到b页面，此时可以看到，定时器依然在执行。这样是非常消耗性能的。

#### 解决方法1：
首先我在data函数里面进行定义定时器名称：
```
data() {            
    return {                              
        timer: null  // 定时器名称          
    }        
}
```
然后这样使用定时器：
```
this.timer = (() => {
    // 某些操作
}, 1000)最后在beforeDestroy()生命周期内清除定时器：beforeDestroy() {
    clearInterval(this.timer);        
    this.timer = null;
}
```
方案1有两点不好的地方就是：
- 它需要在这个组件实例中保存这个 timer，如果可以的话最好只有生命周期钩子可以访问到它。这并不算严重的问题，但是它可以被视为杂物。
- 我们的建立代码独立于我们的清理代码，这使得我们比较难于程序化的清理我们建立的所有东西。

#### 解决方案2：
该方法是通过$once这个事件侦听器器在定义完定时器之后的位置来清除定时器。以下是完整代码：
```
const timer = setInterval(() =>{                    
    // 某些定时器操作                
}, 500);            
// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
this.$once('hook:beforeDestroy', () => {            
    clearInterval(timer);                                    
})
```
## 6. CSS的scoped私有作用域和深度选择器

编译前：
```
<style scoped>
.example {
  color: red;
}
</style>
```

编译后：
```
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
```
其实是在你写的组件的样式，添加了一个属性而已，这样就实现了所谓的私有作用域。但是也会有弊端，考虑到浏览器渲染各种 CSS 选择器的方式，当` p { color: red } `设置了作用域时 (即与特性选择器组合使用时) 会慢很多倍。如果你使用 class 或者 id 取而代之，比如 `.example { color: red }`，性能影响就会消除。所以，在你的样式里，进来避免直接使用标签，取而代之的你可以给标签起个class名


