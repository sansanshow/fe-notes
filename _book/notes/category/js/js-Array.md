# 数组方法 及 扩展

## 一. 常用方法
1. map 返回新数组

2. forEach 遍历 

无法用break 打断， 可以使用try-catch throw Error()

3. filter 返回新数组

4. some 一个true 则true

5. every 一个false 则false

6. slice(start, end) 返回切割的数组

7. splice(start, number, ...value) 改变原数组 

8. join 返回字符串

9. push(val)/pop 数组末尾插入 或 弹出 改变原数组

10. unshift/shift 数组头部 推入 / 推出

结合 push shift / unshift/ pop 可实现不同方向的队列

11. concat 数组拼接， 不影响原数组， 浅拷贝 返回新数组

12. sort 数组排序，改变原数组

13. reduce/reduceRight 


## 二. 扩展
### 1. 数组乱序

[点击查看](./如何有效的打乱一个数组.md)

### 2. 数组展开