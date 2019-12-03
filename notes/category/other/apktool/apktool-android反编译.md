# APK反编译工具与使用方法
## 工具： apktool.bat；apktool.jar [官网下载地址](https://ibotpeaches.github.io/Apktool/install/)
### 所需环境
- java
### 所需安装包
- [apktool.bat](./apktool.bat)
- [apktool.jar](./apktool.jar)

- 作用：最大程度的还原apk中的manifest文件和资源文件 。
### 安装
1. 将下载的 apktool.bat apktool.jar 放到 一个文件夹下
2. 并把该路径配置到 环境变量path中

使用apktool工具反编译apk文件比直接解压同一个apk文件大；

还可以将反编译之后的apk重新打包成apk文件，但需要重新签名，才能安装使用。

#### 使用
1. 打开cmd命令编辑器

2. 反编译：   
进入.apk文件目录（如test.apk）   
输入命令apktool d test.apk
```
apktool d test.apk
```