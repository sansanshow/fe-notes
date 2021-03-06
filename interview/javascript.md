
- 知识点大纲：
https://juejin.im/post/5c64d15d6fb9a049d37f9c20#heading-31

- (1.6w字)浏览器与前端性能灵魂之问，请问你能接得住几个？（上）
https://juejin.im/post/5df5bcea6fb9a016091def69

- (2.4w字,建议收藏)😇原生JS灵魂之问(下), 冲刺🚀进阶最后一公里(附个人成长经验分享)
https://juejin.im/post/5dd8b3a851882572f56b578f#heading-36

- (建议精读)原生JS灵魂之问(中)，检验自己是否真的熟悉JavaScript？
https://juejin.im/post/5dbebbfa51882524c507fddb#heading-12

- (2.4w字,建议收藏)😇原生JS灵魂之问(下), 冲刺🚀进阶最后一公里(附个人成长经验分享)
https://juejin.im/post/5dd8b3a851882572f56b578f


## 1: 闭包是什么
闭包的优势 与 缺点
- 优势：
1. 可以读取函数内部的变量，并且让这些变量的值始终保持在内存中。

- 缺点
1. 常驻内存，开销变大

## 2. NaN是什么，用typeof会输出什么
Not a Number

会输出 Number


## 3. js的隐性转换和显性转换
- 隐性转换为
```
1 + '1' = '11'
```
- 显性转换
```
Number("24 cccc"); //结果：NaN
ParseInt("24 cccc");//结果：24
备注：Number的显性转换比较严格，若无法强转则直接报错
```

引伸
```
1 + -'1' + 1 等于什么
```
等于 0 ，'1'前面的负号把其数字化，变为-1，则后值为1
```
'A' - 'B' 等于什么
```
NaN

## 4. 什么是跨域？跨域问题如何解决？
1. 通过jsonp跨域  
jsonp在页面上引入不同域上的js脚本文件实现请求不同域上的数据
(1) 通过script标签引入一个js文件
(2) js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入
注：需要服务器端的页面进行相应的配合

2. 通过修改document.domain来跨子域

3. 使用window.name来进行跨域  
window对象有个name属性，该属性有个特征：即在一个窗口(window)的生命周期内,窗口载入的所有的页面都是共享一个window.name的，每个页面对window.name都有读写的权限，window.name是持久存在一个窗口载入过的所有页面中的，并不会因新页面的载入而进行重置。

## 5. 知道babel么
可以实现将ES6编译为ES5代码

## 6. 用js实现判断一个变量是否为整数的函数

实现思路：  
先判断该变量是否为Number类型，以此来缩小范围，再判断该变量除以1后是否与原值全等，若全等则返回true，若不全等则返回false
```
function isNumber(num) {
  if (typeof num === 'number') {
    if (num / 1 === num) {
      // NaN / 1 = NaN
      // NaN === NaN -> false
      return true;
    } else {
      return false;
    }
  }
  return false;
}
```


## 7. 获取手机屏幕方向

## 8. js种的this指向有几种？如何解决this指向混乱(教头函数)？

其实JS中的this是一个非常简单的东西，只需要理解它的执行规则就OK。

在这里不想像其他博客一样展示太多的代码例子弄得天花乱坠， 反而不易理解。

`call/apply/bind` 可以显式绑定, 这里就不说了。

主要这些场隐式绑定的场景讨论:

1. 全局上下文
2. 直接调用函数
3. 对象.方法的形式调用
4. DOM事件绑定(特殊)
5. new构造函数绑定
6. 箭头函数

### 1. 全局上下文
全局上下文默认this指向window, 严格模式下指向undefined。
#### 2. 直接调用函数
比如:
```
let obj = {
  a: function() {
    console.log(this);
  }
}
let func = obj.a;
func();
```
这种情况是直接调用。this相当于全局上下文的情况。
### 3. 对象.方法的形式调用
还是刚刚的例子，我如果这样写:
```
obj.a();
```
这就是对象.方法的情况，this指向这个对象
### 4. DOM事件绑定
 `onclick` 和 `addEventerListener` 中 `this` 默认指向绑定事件的元素。
IE比较奇异，使用`attachEvent`，里面的`this`默认指向`window`。
### 5. new + 构造函数
此时构造函数中的this指向实例对象。
### 6. 箭头函数？
箭头函数没有this, 因此也`不能绑定`。里面的`this`会指向`当前最近的非箭头函数的this`，找不到就是window(严格模式是undefined)。比如:
```
let obj = {
  a: function() {
    let do = () => {
      console.log(this);
    }
    do();
  }
}
obj.a(); // 找到最近的非箭头函数a，a现在绑定着obj, 因此箭头函数中的this是obj
```

> 优先级: new  > call、apply、bind  > 对象.方法 > 直接调用。

## 9. 浅拷贝都有哪些方法
1. 手动实现
```
const shallowClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? []: {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
          cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```
2. Object.assign
但是需要注意的是，Object.assgin() 拷贝的是对象的属性的引用，而不是对象本身。
```
let obj = { name: 'sy', age: 18 };
const obj2 = Object.assign({}, obj, {name: 'sss'});
console.log(obj2);//{ name: 'sss', age: 18 }
```

3. concat浅拷贝数组
```
let arr = [1, 2, 3];
let newArr = arr.concat();
newArr[1] = 100;
console.log(arr);//[ 1, 2, 3 ]
```
4. slice浅拷贝数组
```
let arr = [1, 2, {val: 4}];
let newArr = arr.slice();
newArr[2].val = 1000;

console.log(arr);//[ 1, 2, { val: 1000 } ]
```

5. ...展开运算符 数组
```
let arr = [1, 2, 3];
let newArr = [...arr];//跟arr.slice()是一样的效果
```


## 10. 深拷贝
1. 简易版及问题
```
JSON.parse(JSON.stringify());
```
> 估计这个api能覆盖大多数的应用场景，没错，谈到深拷贝，我第一个想到的也是它。但是实际上，对于某些严格的场景来说，这个方法是有巨大的坑的。问题如下：


- 无法解决循环引用的问题。举个例子：

```
const a = {val:2};
a.target = a;
```
拷贝a会出现系统栈`溢出`，因为出现了`无限递归`的情况。


- 无法拷贝一写特殊的对象，诸如 `RegExp`, `Date`, `Set`, `Map`等。


- 无法拷贝`函数`(`划重点`)。

## 11. 给你一个数组 怎么打乱顺序

## 12. 排序
1. 快排

2. 插入排序

3. 冒泡排序



## 12. 给你一个长度为N的排好序的数组，要求给出数组元素之和为M的情况，例如长度为10的数组，数组元素为[1,2,3,4,5,6,7,8,9,10],要求给出数组元素之和为11的情况，如[1,10],[1,2,9],[1,3,4,6]

## 13. 了解es6吗？说一下es6新增的字符串方法

## 14. 说一下es6中promise及其实现原理

## 15. vue里面双向数据绑定的实现原理

## 16. 说一下输入url地址到回来的过程(详细)

## 17. http缓存


## 18. 数组是如何在内存中存储的

## 19. 给你一个只有左右括号字符串，判断它是不是正常的括号匹配机制，如'(()())'是正常，‘())(()’是不正常


## 20. 数组去重的方法(ES5,ES6)

去重的细节(比如空对象和空数组不相等,不能去除)

## 21. 跳台阶和变态跳台阶（一共N阶台阶,每次只能跳1阶或2阶,问一共有多少种跳法）
```
function stepNum(num) {
  if(num <= 0) {
    return 0;
  } else if (num == 1) {
    return 1
  } else if (num == 2) {
    return 2
  }
  return arguments.callee(num - 1) + arguments.callee(num -2);
  
}
```

加入缓存
```
function solution(step) {
  var arr = [0];
  var func = function(num) {
    if (arr[num]) {
      return arr[num];
    }
    if(num <= 0) {
      return 0;
    } else if (num == 1) {
      arr[num] = 1;
      return 1;
    } else if (num == 2) {
      arr[num] = 2;
      return 2;
    }
    arr[num] = arguments.callee(num - 1) + arguments.callee(num -2);
    return arr[num]
  }
  return func(step);
}
```
## 22. canvas api 

## 23. 小程序setData
想要改 isChecked 的某个值怎么办？
```
data: {
    main_view_bgcolor: "",
    border: "",
    isChecked: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
}
```
解决方式如下
```
var str = "isChecked[" + id + "]"//重点在这里，组合出一个字符串 id: 0 1 2 3 4 5 6...
this.setData({
  [str]: false//用中括号把str括起来即可
})
```

还有一中key-value的
```
data: {
    main_view_bgcolor: "",
    border: "",
    isChecked: [
      { 
        key: true 
      },
      { 
        key: true 
      },
      { 
        key: true
      }
    ]
}
```
方法如下：
```
var str = "isChecked[" + id + "].key" // id 是下标
this.setData({
  [str]: false
})
```


## 24. vue学的怎么样，给你一个单选框，一个按钮，用vue实现点击单选框切换按钮的颜色(不要操作dom)


## 25. Object 构造函数也会像工厂方法一样根据传入的类型返回相应基本包装类型对象；

将字符串 传入`Object`构造函数，就会得到 String 类型的实例   


将数值 传入`Object`构造函数，就会得到 Number 类型的实例 

将布尔值 传入`Object`构造函数，就会得到 Boolean 类型的实例 

```
var str = new Object('some string'); // 创建一个String 对象
typeof str; // 'object'
str instanceof String;  // true
str === 'some string'; // false
str.valueOf() === 'some string'; // true
```
Boolean 也有相同的有意思
```
var bool = new Object(true);
typeof bool; // 'object'
bool instanceof Boolean; // true
bool === true; // false
bool.valueOf() === true; // true
```
## 26. 防抖 (debounce) & 节流 (throttle)

- `防抖 (debounce)`: 将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。
```
function debounce(fn, wait, immediate) {
    let timer = null

    return function() {
        let args = arguments
        let context = this

        if (immediate && !timer) {
            fn.apply(context, args)
        }

        if (timer) clearTimeout(timer) // 延迟动作的执行，并创建新的动作
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, wait)
    }
}
```

- `节流(throttle)`: 每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms执行一次即可。

```
function throttle(fn, wait, immediate) {
    let timer = null
    let callNow = immediate
    
    return function() {
        let context = this,
            args = arguments

        if (callNow) {
            fn.apply(context, args)
            callNow = false
        }

        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args)
                timer = null
            }, wait)
        }
    }
}
```

## 27 重绘 & 回流
当元素的样式发生变化时，浏览器需要触发更新，重新绘制元素。这个过程中，有两种类型的操作，即重绘与回流。


- 重绘(repaint):   
当元素样式的改变不影响布局时，浏览器将使用重绘对元素进行更新，此时由于只需要UI层面的重新像素绘制，因此 损耗较少


- 回流(reflow):    
当元素的尺寸、结构或触发某些属性时，浏览器会重新渲染页面，称为回流。此时，浏览器需要重新经过计算，计算后还需要重新页面布局，因此是较重的操作。会触发回流的操作:

- 页面初次渲染
- 浏览器窗口大小改变
- 元素尺寸、位置、内容发生改变
- 元素字体大小变化
- 添加或者删除可见的 dom 元素
- 激活 CSS 伪类（例如：:hover）
- 查询某些属性或调用某些方法
> clientWidth、clientHeight、clientTop、clientLeft   
offsetWidth、offsetHeight、offsetTop、offsetLeft   
scrollWidth、scrollHeight、scrollTop、scrollLeft   
getComputedStyle()   
getBoundingClientRect()   
scrollTo()  



回流必定触发重绘，重绘不一定触发回流。重绘的开销较小，回流的代价较高。

**最佳实践:**


- css   
避免使用table布局
将动画效果应用到position属性为absolute或fixed的元素上



- javascript   
避免频繁操作样式，可汇总后统一 一次修改
尽量使用class进行样式修改
减少dom的增删次数，可使用 字符串 或者 documentFragment 一次性插入
极限优化时，修改样式可将其display: none后修改
避免多次触发上面提到的那些会触发回流的方法，可以的话尽量用 变量存住



## 28. 能不能实现图片懒加载？

### 方案一:clientHeight、scrollTop 和 offsetTop

首先给图片一个占位资源:
```
<img src="default.jpg" data-src="http://www.xxx.com/target.jpg" />
```
接着，通过监听 scroll 事件来判断图片是否到达视口:
```
let img = document.getElementsByTagName("img");
let num = img.length;
let count = 0;//计数器，从第一张图片开始计

lazyload();//首次加载别忘了显示图片

window.addEventListener('scroll', lazyload);

function lazyload() {
  let viewHeight = document.documentElement.clientHeight;//视口高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//滚动条卷去的高度
  for(let i = count; i <num; i++) {
    // 元素现在已经出现在视口中
    if(img[i].offsetTop < scrollHeight + viewHeight) {
      if(img[i].getAttribute("src") !== "default.jpg") continue;
      img[i].src = img[i].getAttribute("data-src");
      count ++;
    }
  }
}
```
加个节流
### 方案二：getBoundingClientRect
现在我们用另外一种方式来判断图片是否出现在了当前视口, 即 DOM 元素的 `getBoundingClientRect` API。
上述的 `lazyload` 函数改成下面这样:
```
function lazyload() {
  for(let i = count; i <num; i++) {
    // 元素现在已经出现在视口中
    if(img[i].getBoundingClientRect().top < document.documentElement.clientHeight) {
      if(img[i].getAttribute("src") !== "default.jpg") continue;
      img[i].src = img[i].getAttribute("data-src");
      count ++;
    }
  }
}
```

### 方案三: IntersectionObserver
这是浏览器内置的一个API，实现了监听window的scroll事件、判断是否在视口中以及节流三大功能。
我们来具体试一把：
```
let img = document.getElementsByTagName("img");

const observer = new IntersectionObserver(changes => {
  //changes 是被观察的元素集合
  for(let i = 0, len = changes.length; i < len; i++) {
    let change = changes[i];
    // 通过这个属性判断是否在视口中
    if(change.isIntersecting) {
      const imgElement = change.target;
      imgElement.src = imgElement.getAttribute("data-src");
      observer.unobserve(imgElement);
    }
  }
})
Array.from(img).forEach(item => observer.observe(item));
```
这样就很方便地实现了图片懒加载，当然这个 `IntersectionObserver` 也可以用作其他资源的预加载，功能非常强大。


