
https://segmentfault.com/a/1190000011949751
### Directionality
> 主要控制文本方向
```
Widget build(BuildContext context) {
    return new Container(
      color: Colors.white,
      child: new Text('我是一段文本')
    );
  }

```
替换后
```
Widget build(BuildContext context) {
    return new Container(
      color: Colors.white,
      child: new Directionality(
        textDirection: TextDirection.rtl,  //使文本右对齐
        child: new Text('我是一段文本')
      )
    );
  }
```