# FE笔记

[TODO](./TODO/TODO.md)

| 序号 | 课题 | src | demo | 备注 |
| :-: | :- | :- | :-: | :-: |
| ## | [工具函数](./notes/##-utils.md) | 无 | 无 | 无 |
| 0 | [ ES5 and ES6.md ](./notes/0-ES5-and-ES6.md) | -- | 无 | 待整理 |
| 1 | [JS控制CSS3，添加浏览器兼容前缀](./notes/JS控制CSS3，添加浏览器兼容前缀.md)| [example](./notes/js-add-css3-prefixer.js) | 无 | 无 |
| 2 | [PC端JS打开摄像头并拍照](./notes/PC端JS打开摄像头并拍照.md)| 无 | 无 | 无 |
| 3 | [DOMContentLoaded事件](./notes/DOMContentLoaded%E4%BA%8B%E4%BB%B6.md) | 无 | 无 | 无 |
| 4 | [vue开发遇到的问题](./notes/vue开发遇到的问题.md) | 无 | 无 | 无 |
| 5 | [LeetCode之路🙂](./notes/LeetCode之路🙂.md) | [source](../master/examples/leetcode/) | 无 | 无 |
| 6 | [ 各种真机远程调试方法](./notes/各种真机远程调试方法.textfile) | 无 | 无 | 无 |
| 7 | [ window.requestAnimationFrame](./notes/7-window.requestAnimationFrame.md) | 无 | [点击查看](https://sansanshow.github.io/fe-notes/examples/html/requestAnimationFrame.html) | 无 |
| 8 | [ 由div位移引导性的对requestAnimationFrame的思考](./notes/8-由div左位移300px动画实现引导性的对requestAnimationFrame的思考.md) | [source](../master/examples/html/8-div-move.html) | [点击查看](https://sansanshow.github.io/fe-notes/examples/html/8-div-move.html) | 无 |
| 9 | [ Nuxt.js api学习整理](./notes/9-nuxt.js学习整理.md) | [source](../master/examples/nuxt-demo) | [点击查看](https://sansanshow.github.io/fe-notes/examples/html/8-div-move.html) | 无 |
| 10 | [ 面试题 ](./notes/10-面试题.md) | [source](./notes/10-answers.md) | 无 | 无 |
| 11 | [ 浏览器缓存 ](./notes/12-前端性能优化.md#L103) | 无 | 无 | 无 |
| 12 | [ 前端性能优化 ](./notes/12-前端性能优化.md) | 无 | 无 | 无 |
| 13 | [ 实现跨域请求的几种方式 ](./notes/13-实现跨域请求的几种方式.md) | 无 | 无 | 无 |
| 14 | [ vue开发遇到的问题.md ](./notes/14-vue开发遇到的问题.md) | 无 | 无 | 无 |
| 15 | [ javascript高级程序设计-对象构造函数及继承.md ](./notes/15-javascript高级程序notes.md) | 无 | 无 | 无 |
| 16 | [ webpack打包后文件加载解读-初识.md ](./notes/16-webpack打包后文件加载解读-初识.md) | 无 | 无 | 未整理 |
| 17 | [ Node入门.md ](./notes/17-Node入门.md) | [source](../master/examples/nodejs/index.js) | 无 | 无 |
| 18 | [ flutter环境搭建.md ](./notes/18-flutter环境搭建.md) | [source](../master/examples/flutter_demo) | 无 | [Dart入门整理](./notes/18-2-dart入门整理.md)、[flutter常用组件](./notes/18-1-flutter常用组件.md) |
| 19 | [ indexDB入门.md ](./notes/19-indexDB入门.md) | [source](../master/examples/html/indexDB.html.) | [点击查看](https://sansanshow.github.io/fe-notes/examples/html/indexDB.html) | 待整理 |


其他链接
#### 1. 微信小程序   
1. 避坑指南：[WTF小程序之\<web-view\>](https://www.cnblogs.com/imgss/p/8504185.html)
2. [坑点整理](./notes/浅谈小程序.md)


### npm i sass-loader node-sass -D 安装失败问题解决

https://github.com/lmk123/blog/issues/28
安装 node-sass 的时候总是会各种不成功，今天我琢磨了一会儿总算知道要怎么解决了。

首先要知道的是，安装 node-sass 时在 node scripts/install 阶段会从 github.com 上下载一个 .node 文件，大部分安装不成功的原因都源自这里，因为 GitHub Releases 里的文件都托管在 s3.amazonaws.com 上面，而这个网址在国内总是网络不稳定，所以我们需要通过第三方服务器下载这个文件。（顺带一提，你可以看看这个好玩的 commit）

#### 方法一：使用淘宝镜像
macOS 系统直接运行下面的命令即可：

SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass
我们一般更希望能跨平台、并且直接使用 npm install 安装所有依赖，所以我的做法是在项目内添加一个 .npmrc 文件：
```
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
electron_mirror=https://npm.taobao.org/mirrors/electron/
registry=https://registry.npm.taobao.org
```
这样使用 npm install 安装 node-sass、electron 和 phantomjs 时都能自动从淘宝源上下载，但是在使用 npm publish 的时候要把 registry 这一行给注释掉，否则就会发布到淘宝源上去了。

#### 方法二：使用梯子
假设你的梯子在你本地机器上开启了一个第三方服务器 127.0.0.1:1080，那么只需按照下面的方法配置一下就能正常安装 node-sass 了（如果你开启的是 PAC 模式而不是全局模式，那还需要将 s3.amazonaws.com 加入 PAC 列表）：
```
npm config set proxy http://127.0.0.1:1080
npm i node-sass

# 下载完成后删除 http 代理
npm config delete proxy
```

## table
absolute绝对定位的div放在td中，他的定位是相对于table的左上角。

relative相对定位的div放在td总共，他的定位是相对于本td的的左上角。

当把td设置成相对或者绝对定位，所有定位都正常了，也就是说在内层使用定位，外层必须也要使用定位。

INPUT设置placeholder及disabled在iPhone下显示的问题
http://www.phpvar.com/archives/4060.html
  
     
        
           
            




---
**~~加班使我快乐~~ &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;** <br/>
**&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;学习使我进步🙂&emsp;&emsp;&emsp;&emsp;**
