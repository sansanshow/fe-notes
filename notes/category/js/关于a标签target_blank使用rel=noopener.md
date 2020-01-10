> 参考：
1. [关于a标签target_blank使用rel=noopener: https://www.jianshu.com/p/c8319e095474](https://www.jianshu.com/p/c8319e095474)

2. [网站使用 rel="noopener" 打开外部锚: https://www.cnblogs.com/flowerszhong/p/7323765.html](https://www.cnblogs.com/flowerszhong/p/7323765.html)


## 隐私与安全越来越受重视
1. 浏览器和 Node.js 端有如下安全更新：不安全的 `TLS 1.0` 和 `1.1` 默认被禁用（Safari TP 91、Google Chrome 72+、Firefox Nightly）;
2. Firefox 67 开始，`<a target="_blank">、<area target="_blank">` 自动附加"rel="noopener"，以防止新页面恶意篡改当前页面;
3. Chrome 69 开始支持 Content-Security-Policy 的 report-to 指令，此指令支持了合并多个违规上报请求;
4. Chrome 76 起实现 `Fetch Metadata` 请求头提案 ，允许请求时带上上下文，使服务器端可以进行安全相关的校验;
5. Node.js 12.7.0+ 支持了 --policy-integrity=sri，可以让不符合 `Subresource Integrity` 规范的请求在服务端执行任何代码前就被拦截。


## 本文主要讲 第二点 rel="noopener"

### 一、为什么要使用rel='noopener'？
例子：
- a.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <a href="b.html" target="_blank">da</a>
</body>
</html>
```

- b.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <SCRIPT>window.opener.location.href ="http://google.com"</SCRIPT>
</body>
</html>
```

其中在`a.html`中有个超链接，点击后打开新的`tab页(b.html)`，神奇的发现`原tab页(a.html)`已经变成了`谷歌页面`。原因是使用`target=_blank`打开新的窗口时，赋予了新的窗口一些权限可以操作`原tab页(a.html)`，其中window.location就是一个。不使用 `rel=noopener` 就是让用户暴露在钓鱼攻击上。

**还有一方面关于性能的考虑：**

摘自：[网站使用 rel="noopener" 打开外部锚: https://www.cnblogs.com/flowerszhong/p/7323765.html](https://www.cnblogs.com/flowerszhong/p/7323765.html)


当您的页面链接至使用 target="_blank" 的另一个页面时，`新页面将与您的页面`在`同一个进程上`运行。 如果新页面正在执行`开销极大`的 `JavaScript`，您的页面性能可能会受影响。

此外，`target="_blank"` 也是一个安全漏洞。新的页面可以通过` window.opener` 访问您的窗口对象，并且它可以使用 window.opener.location = newURL 将您的页面导航至不同的网址。

单击下面的一个链接，打开一个需要大量JavaScript计算的页面（以下并非链接，请参见原文——译者注）：
```
<a target="_blank">
<a target="_blank" rel="noopener">
```
没有rel="noopener"，随机数会被新打开页面中的JavaScript阻断。不仅如此，所有主线程活动也会被阻塞，试试选择页面中的文本。但加了rel="noopener"之后，随机数生成一直保持在60fps。当然，是在Chrome或Opera中。


大多数浏览器都是多进程的，除了Firefox（他们正在改）。每个进程包含多个线程，包括我们常说的“主”线程。解析、样式计算、布局、绘制和非worker的JavaScript都在主线程里执行。就是说，一个域中的JavaScript与另一个标签页或窗口中的域中的JavaScript在不同的线程里。


然而，由于我们可以通过window.opener同步跨窗口地访问DOM，因此通过target="_blank"启动的窗口还在同一个进程（线程）中。通过window.open打开的iframe和窗口也一样。


rel="noopener"会阻止window.opener，因此不存在跨窗口访问。Chromium浏览器为此做过优化，会在独立的进程中打开新页面。


> window.opener

![](https://upload-images.jianshu.io/upload_images/4952742-00276bd78b9f2a02.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

### 二、使用rel=noopener
为了防止window.opener被滥用，在使用targrt=_blank时需要加上rel=noopener
<a href="www.baidu.com" target="_blank" rel="noopener" >

### 三、rel=norefferrer
rel=noopener支持chrome49和opera36，不支持火狐，为了兼容需要加上rel=noreferrer
<a href="www.baidu.com" target="_blank" rel="noopener norefferrer" >
