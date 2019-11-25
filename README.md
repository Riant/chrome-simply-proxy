# chrome-host-proxy

通过预先配置需要代理的域名或者 URL 及其对应的目标服务器，然后快速的在各个目标服务器间进行切换。

# 安装（3 种方法）
1. [在线安装 Chrome 插件](https://chrome.google.com/webstore/detail/cpaaikjcnbooihdmpgcdhniadbhoailk) - 需要翻墙
2. 通过`设置 > 扩展程序 > 开发者模式（开启） > 加载已解压的扩展程序`，选择 `simply-proxy` 文件夹进行安装。
3. 下载 crx 文件安装

# 功能特点
该扩展主要是为了解决前后端分离开发（如 Vue 项目）的过程中，反向代理配置比较麻烦，且需要重启服务的问题：在前后端分离开发（如 Vue 项目）的过程中，我们经常需要配置反向代理（ 如 Vue 项目的 proxyTable ）来与真实的 API 服务器交换数据；但是

1. 同一个项目可能经常需要和不同的后端开发同事协作，此时不可避免的就需要修改前端服务的反向代理配置；

2. 前端的测试服务器也需要能够让客户端决定连接哪个 API 服务，如果直接配置反向代理，则需要根据客户端测试需要调整代理配置。

同时，也间接的能够支持其他代理类扩展的代理工作，只是配置方式稍显不同。

# PR
如有需要，欢迎提交 issue 以及 PR。

该版本基于 Vue 在原有基础上实现“设置”等相关 UI 逻辑，使用 Chrome 的 `proxy.settings` 的 `pac_script` 模式实现代理支持。

### Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for chrome extension
```
yarn build
```
