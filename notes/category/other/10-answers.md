## 3. 哪些操作会引起浏览器重绘和重排？

> 1. postion:absolute; left:100px;会不会引起？
> 2. translateX:100px;会不会引起？
> 3. getBoundingClientRect会不会引起？
> 4. getClientWidth、getClientHeight会不会引起？ 
**重绘 && 重排**

无论何时总会有一个初始化的页面布局伴随着一次绘制。（除非你希望你的页面是空白的:)）之后，每一次改变用于构建渲染树的信息都会导致以下至少一个的行为：

1. 部分渲染树（或者整个渲染树）需要重新分析并且节点尺寸需要重新计算。这被称为重排。注意这里至少会有一次重排-初始化页面布局。

2. 由于节点的几何属性发生改变或者由于样式发生改变，例如改变元素背景色时，屏幕上的部分内容需要更新。这样的更新被称为重绘。

重排和重绘代价是高昂的，它们会破坏用户体验，并且让UI展示非常迟缓。

### **什么情况会触发重排和重绘**
任何改变用来构建渲染树的信息都会导致一次重排或重绘。

- 添加、删除、更新DOM节点

- 通过display: none隐藏一个DOM节点-触发重排和重绘

- 通过visibility: hidden隐藏一个DOM节点-只触发重绘，因为没有几何变化

- 移动或者给页面中的DOM节点添加动画

- 添加一个样式表，调整样式属性

- 用户行为，例如调整窗口大小，改变字号，或者滚动。

让我们来看一些例子:
```
var bstyle = document.body.style; // cache
bstyle.padding = "20px"; // 重排+重绘
bstyle.border = "10px solid red"; // 另一次重排+重绘
bstyle.color = "blue"; // 没有尺寸变化，只重绘
bstyle.backgroundColor = "#fad"; // 重绘
bstyle.fontSize = "2em"; // 重排+重绘
// 新的DOM节点 - 重排+重绘
document.body.appendChild(document.createTextNode('dude!'));
```
一些重排可能开销更大。想象一下渲染树，如果你直接改变body下的一个子节点，可能并不会对其它节点造成影响。但是当你给一个当前页面顶级的div添加动画或者改变它的大小，就会推动整个页面改变-听起来代价就十分高昂。

### **善于应对的浏览器**

### **最小化重排和重绘**
通过减少重排/重绘的负面影响来提高用户体验的最简单方式就是尽可能少的去使用他们同时尽可能少的请求样式信息。这样浏览器就可以优化重排。如何实践呢？

- 不要逐个变样式。对于静态页面来说，明智且兼具可维护性的做法是改变类名而不是样式。对于动态改变的样式来说，相较每次微小修改都直接触及元素，更好的办法是统一在cssText变量中编辑。
```
// bad
var left = 10,
    top = 10;
el.style.left = left + "px";
el.style.top  = top  + "px";
// better 
el.className += " theclassname";
// 当top和left的值是动态计算而成时...
// better
el.style.cssText += "; left: " + left + "px; top: " + top + "px;";
```
- “离线”的批量改变和表现DOM。   

“离线”意味着不在当前的DOM树中做修改。你可以：
```
1. 通过documentFragment来保留临时变动。
2. 复制你即将更新的节点，在副本上工作，然后将之前的节点和新节点交换。
```
- 通过`display:none`属性隐藏元素（只有一次重排重绘），添加足够多的变更后，通过`display`属性显示（另一次重排重绘）。通过这种方式即使大量变更也只触发两次重排。
- 不要频繁计算样式。如果你有一个样式需要计算，只取一次，将它缓存在一个变量中并且在这个变量上工作。看一下下面这个反例：
```
// no-no!
for(big; loop; here) {
    el.style.left = el.offsetLeft + 10 + "px";
    el.style.top  = el.offsetTop  + 10 + "px";
}
// better
var left = el.offsetLeft,
    top  = el.offsetTop
    esty = el.style;
for(big; loop; here) {
    left += 10;
    top  += 10;
    esty.left = left + "px";
    esty.top  = top  + "px";
}
```
- 通常情况下，考虑一下渲染树和变更后需要重新验证的消耗。举个例子，使用绝对定位会使得该元素单独成为渲染树中body的一个子元素，所以当你对其添加动画时，它不会对其它节点造成太多影响。当你在这些节点上放置这个元素时，一些其它在这个区域内的节点可能需要重绘，但是不需要重排。


1. 避免逐项更改样式。最好一次性更改style属性，或者将样式列表定义为class并一次性更改class属性。
2. 避免循环操作DOM。创建一个documentFragment或div，在它上面应用所有DOM操作，最后再把它添加到window.document。

> 也可以在一个display:none的元素上进行操作，最终把它显示出来。因为display:none上的DOM操作不会引发重排和重绘。

3. 避免循环读取offsetLeft等属性。在循环之前把它们存起来。
4. 绝对定位具有复杂动画的元素。绝对定位使它脱离文档刘，否则会引起父元素及后续元素大量的重排。
>使用CSS3的transition也可以获得不错的性能。

## 4. 
1. W3C 标准盒模型：
属性width,height只包含内容content，不包含border和padding。
2. IE 盒模型：
属性width,height包含border和padding，指的是`content+padding+border`。   

   在ie8+浏览器中使用哪个盒模型可以由box-sizing(CSS新增的属性)控制，默认值为content-box，即标准盒模型；如果将box-sizing设为border-box则用的是IE盒模型。如果在ie6,7,8中DOCTYPE缺失会触发IE模式。在当前W3C标准中盒模型是可以通过box-sizing自由的进行切换的。



## 5. 
> javascript 之 - 深入事件机制
参考：https://juejin.im/entry/5864af5861ff4b00631b259d

> `stopPropagation` 与 `preventDefault`
参考：https://blog.csdn.net/wxl1555/article/details/53128966
1. `event.stopPropagation()`方法

这是阻止事件的冒泡方法，不让事件向documen上蔓延，但是默认事件任然会执行，当你掉用这个方法的时候，如果点击一个连接，这个连接仍然会被打开，

2. `event.preventDefault()`方法

这是阻止默认事件的方法，调用此方法是，连接不会被打开，但是会发生冒泡，冒泡会传递到上一层的父元素；

3.` return false `

这个方法比较暴力，他会同事阻止事件冒泡也会阻止默认事件；写上此代码，连接不会被打开，事件也不会传递到上一层的父元素；可以理解为return false就等于同时调用了event.stopPropagation()和event.preventDefault()

## 6. 浏览器缓存

浏览器 缓存 的过程：

首次访问一个 URL ，没有 缓存 ，但是，服务器会响应一些 header 信息，如： expires、cache-control、last-modified、etag 等，来记录下次请求是否缓存、如何缓存。

再次访问这个 URL 时候，浏览器会根据首次访问返回的 header 信息，来决策是否缓存、如何缓存。
