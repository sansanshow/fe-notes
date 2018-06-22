### 1. 原生事件处理
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

### 2. vuejs的$emit如何在父组件中自己添加参数。
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
