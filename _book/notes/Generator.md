yield表达式`只能`用在 Generator 函数里面，用在其他地方都会报错。
错误：
1. 
```
(function (){
  yield 1;
})()
// SyntaxError: Unexpected number
```


