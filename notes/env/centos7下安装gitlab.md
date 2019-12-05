# linux 安装 GitLab
参考来源:https://blog.csdn.net/qq_29281307/article/details/86503880

## 安装
1. 配置yum源
```
vim /etc/yum.repos.d/gitlab-ce.repo
```

复制以下内容：
```
[gitlab-ce]
name=Gitlab CE Repository
baseurl=https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el$releasever/
gpgcheck=0
````
2.更新本地yum缓存
```
yum makecache
```

3.安装GitLab社区版
```
yum install gitlab-ce #自动安装最新版本
```

注：若需安装指定版本，则添加版本号即可，即`yum install gitlab-ce-x.x.x`

4.开启GitLab
```
gitlab-ctl start
```
**GitLab常用命令**
```
gitlab-ctl start # 启动所有 gitlab 组件；

gitlab-ctl stop # 停止所有 gitlab 组件；

gitlab-ctl restart # 重启所有 gitlab 组件；

gitlab-ctl status # 查看服务状态；

gitlab-ctl reconfigure # 启动服务；（重新加载配置文件，在GitLab初次安装后可以使用，但是在业务环境中不可随意使用，reconfigure会把一些过去的config还原，导致修改的端口以及域名等都没有了。）

vim /etc/gitlab/gitlab.rb # 修改默认的配置文件；

gitlab-rake gitlab:check SANITIZE=true --trace # 检查gitlab；

sudo gitlab-ctl tail # 查看日志；
```