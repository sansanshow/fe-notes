## Promise.race()
Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```
const p = Promise.race([p1, p2, p3]);
```
上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数

## 神奇之一：Promise.resolve()
```
const jsPromise = Promise.resolve($.ajax('/whatever.json'));
```
上面代码将 jQuery 生成的deferred对象，转为一个新的 Promise 对象。

Promise.resolve等价于下面的写法。
```
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```
Promise.resolve方法的参数分成四种情况。

（1）参数是一个 Promise 实例

如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

（2）参数是一个thenable对象

thenable对象指的是具有then方法的对象，比如下面这个对象。
```
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```
Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
```
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```
上面代码中，thenable对象的then方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then方法指定的回调函数，输出 42。

（3）参数不是具有then方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
```
const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello
```
上面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。

（4）不带有任何参数
有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。

Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve方法。
```
const p = Promise.resolve();

p.then(function () {
  // ...
});
```
上面代码的变量p就是一个 Promise 对象。

需要注意的是，立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。
```
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```
上面代码中，setTimeout(fn, 0)在**下一轮“事件循环”开始时**执行，Promise.resolve()在**本轮“事件循环”结束时**执行，console.log('one')则是立即执行，因此最先输出。


一段有意思的代码

```
var p1 = this.$http.get(`someurl2`, {params: {key: 1}}).then(res => {
    this.list = template
}).catch(() => {})
// 获取驳回补件-附件-列表
var p2 = this.$http.get(`someurl2`, {params: {key: 2}}).then(res => {
    
    this.data2 = template
}).catch(() => {})

Promise.all([p1, p2]).then(() => {
    // 这是里是跟前面的p1,p2的then 并列执行的代码
    // 而检查数据dataValid，要在这两个请求返回之后并处理完成进行检查
    // 所以 根据事件机制，可以加一个setTimeOut来使得他在请求返回后的下一个轮回进行操作
    setTimeout(() => {
        this.dataValid()
    }, 0)
})
```