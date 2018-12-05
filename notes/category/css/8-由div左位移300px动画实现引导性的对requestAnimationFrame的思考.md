# 面试题：请实现div向右位移的效果
### 0. 定义原始div样式
```
>>> css:
.baseDiv {
    width: 100px;
    height: 100px;
    background: red;
    position: relative;
    margin-bottom: 20px;
}
>>> html: 
<div class="baseDiv">
    请将鼠标放置触发动画
</div>
```
### 1. transition 过渡动画实现
> css
```
/* ex1 */
.transDiv {  
    transition: all ease-in-out 3s;
}

.transDiv:hover {
    transform: translateX(300px);
}
```

> html
```
<div class="baseDiv transDiv">
    请将鼠标放置触发动画
</div>
```

### 2. animation + @keyframes动画实现

> css
```
 /* ex2 */
@keyframes divmove {
    0% {left: 0; }
    100% {left: 300px;}
}
.animateDivWrap:hover .animateDiv{
    animation: divmove 1s ease-in-out 1 forwards;
    /* animation: name duration timing-function delay iteration-count direction fill-mode;  */
}
```

> html
```
 <div class="animateDivWrap">
    <div class="baseDiv animateDiv">
        请将鼠标放置触发动画
    </div>
</div>
```
### 3. requestAnimationFrame 动画实现
> html 
```
<div id="moveDiv" class="baseDiv">

</div>
<button onclick="moveBtn()">向右移动300px</button>
```

> javascript
```
<script>
    //  requestAnimationFrame 定义
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
    var offestX = 0;
    var moveDiv = document.getElementById('moveDiv');
    var moveUniqueId = [];
    function moveBtn() {
        moveDiv.style.left = "0px";
        offestX = 0;
        moveUniqueId.forEach(uniqueId => { // 防止重复触发动画。如果没有此操作，会发现，连续点击运行按钮，会使得动画运行越来越快
            window.cancelAnimationFrame(uniqueId);
        })
        moveUniqueId.push(requestAnimationFrame(move))
    }
    
    function move(timestamp) {
        offestX += 1;
        moveDiv.style.left = offestX + "px";
        if(offestX < 300) {
            moveUniqueId.push(requestAnimationFrame(move))
        }
    }
</script>
```

## 延申动画
### 1. 小球在一定时间内左右位移两个来回
> 运动轨迹使用 sin 函数来控制
### 2. 小球 模仿摆钟运动 无限运动
> 根据给定的半径值r ,及默认的最大摆动角度，   

可以计算出 左右最大摆动距离= 半径 * sin(最大摆动角度)   

上下的摆动： 半径 * (1 - cos(当前角度))



demo: [点击查看](https://sansanshow.github.io/fe-notes/examples/html/8-div-move.html)

