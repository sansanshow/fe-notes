## 1. 下载iTunes 确保手机连接

## 2. 安装ios_webkit_debug_proxy
在windows下，首先需要安装scoop，而安装scoop需要电脑里有powershell。win10一般自带。
### 2.1 安装scoop（一个安装工具）

```
set-executionpolicy unrestricted -s cu #修改执行策略，选择是
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')  #安装scoop
```

### 2.2 通过scoop安装ios_webkit_debug_proxy
```
scoop bucket add extras
scoop install ios-webkit-debug-proxy
```
## 3. 连接测试

确认手机已连接pc，输入

```
ios_webkit_debug_proxy -f chrome-devtools://devtools/bundled/inspector.html
```

## 在localhost:9221中查看设备连接情况，此时可看到连接设备的地址。



在chrome://inspect/#devices添加设备端口，在红圈处进行添加。

