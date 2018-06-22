min-width/min-height 的初始值是auto，max-width/maxheight
的初始值是none

（1）min-wdith/height 值为auto 合法。例如，设置：
<body style="min-width:auto;">
结果所有浏览器下：
document.body.style.minWidth; // 结果是auto
说明min-*支持auto 值，同样，如果是max-width:auto，结果则是''，进一步证明
min-width/height 值为auto 合法。
（2）数值变化无动画。假设元素的min-width/min-height 的初始值是0，那么，当我们
设置transition 过渡同时改变了min-width/min-height 值，岂不是应该有动画效果？结果：
.box {
transition: min-height .3s;
}
.box:hover {
min-height: 300px;
}
鼠标经过.box 元素，元素突然变高，并无动画效果，但是，如果是下面这样的设置：
.box {
min-height: 0;
transition: min-height .3s;
}
.box:hover {
min-height: 300px;
}
鼠标经过.box 元素，transition 动画效果就出现了。这就证明了，min-height 的初始值
不是0，既然不是0，那就应该是所有浏览器都支持的auto。


## 第四章 
### content: counter()计数器
