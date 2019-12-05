react如何通过shouldComponentUpdate来减少重复渲染
https://segmentfault.com/a/1190000016494335?utm_source=tag-newest

## 如何避免这些不必要的render：
### shouldComponentUpdate
```
shouldComponentUpdate(nextProps, nextState)
```
使用`shouldComponentUpdate()`以让React知道当前状态或属性的改变是否不影响组件的输出，默认返回ture，返回false时不会重写render，而且该方法并不会在初始化渲染或当使用forceUpdate()时被调用，我们要做的只是这样：
```
shouldComponentUpdate(nextProps, nextState) {
  return nextState.someData !== this.state.someData
}
```
但是，state里的数据这么多，还有对象，还有复杂类型数据，react的理念就是拆分拆分再拆分，这么多子组件，我要每个组件都去自己一个一个对比吗？？不存在的，这么麻烦，要知道我们的终极目标是不劳而获-_-

### React.PureComponent
`React.PureComponent` 与 `React.Component` 几乎完全相同，但 `React.PureComponent `通过props和state的浅对比来实现` shouldComponentUpate()`。如果对象包含复杂的数据结构，它可能会因深层的数据不一致而产生错误的否定判断(表现为对象深层的数据已改变视图却没有更新）

> 关注点：
- 无论组件是否是 PureComponent，如果定义了 shouldComponentUpdate()，那么会调用它并以它的执行结果来判断是否 update。在组件未定义 shouldComponentUpdate() 的情况下，会判断该组件是否是 PureComponent，如果是的话，会对新旧 props、state 进行 shallowEqual 比较，一旦新旧不一致，会触发 update。
- **浅判等** 只会比较到两个对象的 ownProperty 是否符合 Object.js() 判等，不会递归地去深层比较---
- 至于复杂数据结构，用Object.key()获取下key，然后key和对应的value都是基础类型数据，就是算是简单数据结构，不然就是复杂

#### 针对以上规则我们在项目开发种可以做出如下优化：

> 尽量将复杂类型数据（ArrayList）所关联的视图单独拆成PureComonent有助于提高渲染性能，比如表单、文本域和复杂列表在同一个 render() 中，表单域的输入字段改变会频繁地触发 setState() 从而导致 组件 重新 render()。而用于渲染复杂列表的数据其实并没有变化，但由于重新触发 render()，列表还是会重新渲染。

### react-immutable-render-mixin
我想复杂数组没变化时也不要render(), 那你用`react-immutable-render-mixin`

> 不能以正确的姿势来使用immutable-js做优化，你就不要瞎折腾了，用它react-immutable-render-mixin就行了

它和ProComponent原理一样，唯一的区别就是新旧数据的对比，`react-immutable-render-mixin`用了`immutable-js` 的is()方法去做对比，**性能强**，复杂类型数据也能对比（这里不对immutable-js做讨论，一篇很不错的文章Immutable 详解及 React 中实践）,相比于React.PureComponent更方便

**用法很多，我喜欢Decorator：**
```
import React from 'react';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

@immutableRenderDecorator
class Test extends React.Component {
  render() {
    return <div></div>;
  }
}
```