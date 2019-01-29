在iframe的页面中如果使用history.back()，那么会使其主窗口后退。

如何令单独的子窗口后退呢？

或者如何指定某个页面后退呢？

查了一下网上各种说法，什么 top.history.back() 还有 self.history.back()之类的，经过我的实验都不行。

最后采用这种：
```
parent.document.getElementById('iframe id').contentWindow.history.back();
```