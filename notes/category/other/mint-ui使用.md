## 使用mint-ui中弹框组件与原生弹框阻止父页面不滑动方法
1. 使用mint-ui框架中<mt-popup></mt-popup>,在组件中加入 lockScroll="true" 阻止父页面不滑动。

2. 原生弹框中，弹框页面中最外层div里面加(touchmove事件)@touchmove="handleTouchmove" 然后在methods方法里面加入 handleTouchmove (e) { e.preventDefault() }, 阻止父页面不滑动

## mint-ui 时间控件 ios存在穿透问题
转自：[原文链接](https://www.jianshu.com/p/58c7c21d5df4)
### 解决思路
在弹出组件的时候，阻止body滑动事件；弹回的时候，开启body滑动事件
```
data () {

  handler: function(e){
      e.preventDefault()
  },
}

mehtods: {
    /*解决页面层级相互影响滑动的问题*/
    closeTouch () {
        document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {passive:false})//阻止默认事件
    },
    openTouch () {
        document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {passive:false})//打开默认事件
    },
}
```

重要的一点就是何时去开启和关闭滑动事件，最好就是弹出和弹回的时候；

辣鸡的是，官方文档并没有提供这个事件，只能去摸索源码了，发现源码中提供了这个事件 `visbile-change`
```
watch: {
  value(val) {
    this.currentValue = val;
  },

  rims() {
    this.generateSlots();
  },

  visible(val) {
    this.$emit('visible-change', val);
  }
},
```

所以接下来的操作就很简单了
```
<mt-datetime-picker ref="picker"
    type="date"
    :endDate="endDate"
    :startDate="startDate"
    v-model="pickerValue"
    @confirm="handleConfirm"
    @visible-change = "visbleChange">
```
```
methods: {
  visbleChange (val) {
    if(val) {
        this.closeTouch()
    } else {
        this.openTouch()
    }
  },
}
```
