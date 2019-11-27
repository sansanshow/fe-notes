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
箭头函数没有this, 因此也`不能绑定`。里面的this会指向`当前最近的非箭头函数的this`，找不到就是window(严格模式是undefined)。比如:
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

## 了解es6吗？说一下es6新增的字符串方法

## 说一下es6中promise及其实现原理

## vue里面双向数据绑定的实现原理

## 说一下输入url地址到回来的过程(详细)

## http缓存


## 数组是如何在内存中存储的

## 给你一个只有左右括号字符串，判断它是不是正常的括号匹配机制，如'(()())'是正常，‘())(()’是不正常


## 数组去重的方法(ES5,ES6)

去重的细节(比如空对象和空数组不相等,不能去除)

## 跳台阶和变态跳台阶（一共N阶台阶,每次只能跳1阶或2阶,问一共有多少种跳法）

## canvas api 