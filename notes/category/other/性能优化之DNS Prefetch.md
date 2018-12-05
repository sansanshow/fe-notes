# 原理
## DNS原理
DNS(Domain Name System, 域名系统)，作为域名和IP地址相互映射的一个分布式数据库。
当浏览器访问一个域名的时候，需要解析一次DNS，获得对应域名的ip地址。在解析过程中，按照浏览器缓存、系统缓存、路由器缓存、ISP(运营商)DNS缓存、根域名服务器、顶级域名服务器、主域名服务器的顺序，逐步读取缓存，直到拿到IP地址。

## DNS Prefetch原理
DNS Prefetch就是根据浏览器定义的规则，提前解析之后可能会用到的域名，使解析结果缓存到系统缓存中，缩短DNS解析时间，来提高网站的访问速度。

> Architecture
> Chromium's implementation of DNS prefetching does not use the browser's network stack at all. Instead, it relies on external threads to resolve the names, thereby warming the DNS cache of the operating system (completely ignoring any cache in the application network stack). The advantage of this approach was that it was completely compatible with all network stacks (it is external), and prevented accidental regressions on the main network stack.
> Since some DNS resolutions can take a long time, it is paramount that such delays in one resolution should not cause delays in other resolutions. Toward this end (on Windows, where there is no native support for asynchronous DNS resolution), Chromium currently employs 8 completely asynchronous worker threads to do nothing but perform DNS prefetch resolution. Each worker thread simply waits on a queue, gets the next requested domain name, and then blocks on a synchronous Windows resolution function. Eventually the operating system responds with a DNS resolution, the thread then discards it (leaving the OS cache warmed!), and waits for the next prefetch request. With 8 threads, it is rare than more than one or two threads will block extensively, and most resolution proceed rather quickly (or as quickly as DNS can service them!). On Debug builds, the "about:histograms/DNS.PrefetchQueue" has current stats on the queueing delay.

Chromium不使用浏览器的网络堆栈，直接使用操作系统的缓存。通过8个异步线程执行预解析，每个线程处理一个队列，来等待域名的响应，最终操作系统会响应一个DNS结果给线程，然后线程丢弃它，等待下一个预解析请求。

## 如何使用DNS Prefetch
### - 自动解析
Chromium使用超链接的href属性来查找要预解析的主机名。当遇到a标签，Chromium会自动将href中的域名解析为IP地址，这个解析过程是与用户浏览网页并行处理的。但是为了确保安全性，在HTTPS页面中不会自动解析。
### - 手动解析
在页面添加如下标记
```
<link rel="dns-prefetch" href="//img.alicdn.com">
```
上面的link标签会让Chromium预取"img.alicdn.com"的解析。
### - 自动解析控制
当我们希望在HTTPS页面开启自动解析功能时，添加如下标记
```
<meta http-equiv="x-dns-prefetch-control" content="on">
```
当我们希望在HTTP页面关闭自动解析功能时，添加如下标记
```
<meta http-equiv="x-dns-prefetch-control" content="off">
```
# 解决的问题及收益
DNS Prefetch有效缩短了DNS的解析时间。

如果浏览器最近将一个域名解析为IP地址，所属的操作系统将会缓存，下一次DNS解析时间可以低至0-1ms。 如果结果不在系统本地缓存，则需要读取路由器的缓存，则解析时间的最小值大约为15ms。如果路由器缓存也不存在，则需要读取ISP（运营商）DNS缓存，一般像taobao.com、baidu.com这些常见的域名，读取ISP（运营商）DNS缓存需要的时间在80-120ms，如果是不常见的域名，平均需要200-300ms。一般的网站在运营商这里都能查询的到，所以普遍来说DNS Prefetch可以给一个域名的DNS解析过程带来15-300ms的提升，尤其是一些大量引用很多其他域名资源的网站，提升效果就更加明显了。

Chromium对底层缓存进行了建模，当Chrome浏览器启动的时候，就会自动的快速解析浏览器最近一次启动时记录的前10个域名。所以你经常访问的网址就没有DNS解析的延迟，打开速度更快。

# 如何不漏掉域名
借助开发者工具，查看所有静态资源域名，并添加link标签，手动解析

如果是HTTPS网页，考虑是否需要对超链接自动解析，如果需要，添加对应的meta标签

检查js中发起的跳转至其他域名的情况，对于这些域名，添加link标签，手动解析

检查是否存在重定向的域名，对于重定向的域名，将重定向之后的域名，添加link标签，手动解析