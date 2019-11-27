参考：
https://zhuanlan.zhihu.com/p/86525538


## 1:让一个元素水平垂直居中，到底有多少种方案
### 水平居中
- 对于行内元素: text-align: center;
- 对于确定宽度的块级元素：
- width和margin实现。margin: 0 auto;
- 绝对定位和margin-left: -width/2, 前提是父元素position: relative
- 对于宽度未知的块级元素   
table标签配合margin左右auto实现水平居中。使用table标签（或直接将块级元素设值为display:table），再通过给该标签添加左右margin为auto。
inline-block实现水平居中方法。display：inline-block和text-align:center实现水平居中。
- 绝对定位+transform，translateX可以移动本身元素的50%。
- flex布局使用justify-content:center
### 垂直居中
- 利用line-height实现居中，这种方法适合纯文字类
通过设置父容器相对定位，子级设置绝对定位，标签通过margin实现自适应居中
弹性布局flex:父级设置display: flex; 子级设置margin为auto实现自适应居中
父级设置相对定位，子级设置绝对定位，并且通过位移transform实现
table布局，父级通过转换成表格形式，然后子级设置vertical-align实现。（需要注意的是：vertical-align: middle使用的前提条件是内联元素以及display值为table-cell的元素）。


## 什么是响应式布局？什么是流式布局

## body 里面一个div，实现div元素水平垂直居中（多种，及最优法）

## css 实现一个三角行
？？ 正三角？
？？垂直三角
