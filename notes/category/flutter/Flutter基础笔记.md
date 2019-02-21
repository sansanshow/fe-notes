## 组件：
### **有状态的部件（Stateful widget）**
`Stateless widgets` 是不可变的, 这意味着它们的属性不能改变 - 所有的值都是最终的.

`Stateful widgets` 持有的状态可能在widget生命周期中发生变化. 实现一个 stateful widget 至少需要`两个类`:

- 一个 StatefulWidget类。
- 一个 State类。 StatefulWidget类本身是不变的，但是 State类在widget生命周期中始终存在.

