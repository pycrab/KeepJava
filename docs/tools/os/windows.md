---
title: Windows
description: Windows
meta:
  - name: keywords
    content: Windows 使用，重装 Windows 系统
tags: ['Windows']
prev: ../
next: ./linux


---

> 本文基于微软主推的 Windows 10 系统，介绍系统使用过程中的常用技巧。

## 系统安装与激活

不管是拿到一台 Windows 系统的新电脑，还是系统出现了问题，我们都会遇到重装系统。重装系统可以个性化设置盘符大小，通过官方原版镜像来重置脏数据（LM 软件和和捆绑软件）。

### 准备工作

- 准备一个大于 4G 的 U 盘用来制作启动盘，需要格式化，先备份好 U 盘中的数据
- 下载最新的 Win10 介质创建工具，打开 [官方地址](https://www.microsoft.com/zh-cn/software-download/windows10) 点击**立即下载工具**，下载完成后双击下载的 exe 文件运行，插入 U 盘按照提示制作 Win 10 专业版 U 盘启动盘

### 系统安装

- 如果原系统可用

  可以在开机状态下，插入制作好的 U 盘启动盘，Win 10 中打开**设置**=》**更新和安全**=》**恢复**=》**立即重新启动**，选择从 U 盘启动，然后选择自己的 U 盘即可进入自动安装步骤。

- 如果原系统不可用

  可以在关机状态下，插入制作好的 U 盘启动盘，在电脑加载厂商 LOGO 进入画面之前，按住快捷键（电脑进入 U 盘启动盘的快捷键，不知道可以搜一下，比如华硕笔记本是 ESC 键，小米笔记本是 F12 键，一般都不会是 F2 键，因为 F2 都是进 BIOS 修改配置的快捷键），等待电脑弹框提示选择 U 盘，按方向键选择自己的 U 盘，回车进入安装步骤。

  ::: warning 提示

  如果直接进入了系统，先排除系统是否开启了快速启动模式（Win 8 就会默认开启快速启动，跳过磁盘自检），如果开启了需要关闭才能按快捷键弹出 U 盘选择，否则可能需要重复好几次以上操作才能进入。

  :::

推荐使用第一种方式。

进入安装步骤后，按照提示操作，输入密钥先选择跳过以后再进行激活；可以自己重新分配盘符大小；安装过程可能会多次重启电脑，不要紧，连接网络后等待安装完成（过程中会配置账户信息及个性化设置）。

安装完成进入桌面后，首先不要下载安装软件，建议先进入设置进行检查更新，这时候会下载很多更新及驱动程序更新，比如显示器驱动（安装完成黑屏，或者不能够调整亮度，有可能就是没有安装好显示器驱动！）

### 系统激活

自带 Win 10 系统的新电脑一般已经主板激活，重装系统后只要联网就会自动激活。但是如果是盗版则需要使用 KMS 激活。

可以根据 [沧水的 KMS 激活服务](https://kms.cangshui.net/) 网站的指引进行激活，不用下载软件，打开 cmd 控制台，大致使用以下命令：

- `slmgr -xpr` 查看激活状态
- `slmgr -upk` 卸载密钥
- `slmgr -ipk W269N-WFGWX-YVC9B-4J6C9-T83GX` 安装密钥，该密钥需要和安装的系统版本对应，比如这里是专业版
- `slmgr -skms kms.cangshui.net` 设置 KMS 激活服务器，比如 `kms.03k.org`
- `slmgr -ato` 开始激活
- `slmgr -dlv` 激活成功后查看激活信息

## 系统优化设置

建议注册微软账号，登录微软账号可以同步设置及主题。

1、建议打开 **Windows 设置**，逐项查看，根据需要进行设置，里面有很多小细节。比如设置触摸板三指四指操作。

2、**更新和安全**中，开启开发人员模式。

3、**程序和功能**中，打开启用或关闭 Windows 功能，开启 Linux 子系统。

4、**电源选项**中，开启高性能电源计划。

5、打开文件资源管理器，点击菜单栏查看中的**选项**，设置快速访问，及显示文件后缀名。

6、**此电脑**右键选择**属性**，打开高级系统设置，设置系统还原点；开启性能模式。

7、**此电脑**右键选择**管理**，可以进行磁盘管理，从高一级给低一级的磁盘扩充容量（注意不能从低往高扩充，比如 C 盘固定了就不能增大了）；可以制定任务计划程序。 

8、搜索设置，设置索引目录

## 常用软件及其配置

### 基础软件

- [Google 浏览器](https://www.google.com/intl/zh-CN/chrome)，好用的插件如下：
  - Table of contents sidebar，将网页标题提取出来生成侧边导航栏，极力推荐
  - uBlock Origin，网页广告拦截
  - 眼睛护航，网页添加护眼背景色
  - Enhanced GitHub，提供了显示 GitHub 文件大小，及下载单个文件的功能
  - JSON Viewer，浏览器地址栏输入 json-viewer 按 tab 键，然后粘贴 JSON 文本回车
  - Google 翻译，不多说
  - 谷歌访问助手
  - Tampermonkey 油猴插件（配合 IDM 下载器使用）
  - Google 文档的离线功能
  - Foxit PDF Creator
- [7Zip 解压缩](https://www.7-zip.org)，轻量级的压缩解压工具
- [CCleaner 垃圾清理](https://download.ccleaner.com/cctrialsetup.exe)，下载专业版试用，用于卸载卸不掉的软件。离线激活：
  - 用户名 `Registered User`，激活码 `BB4-FJN4-EPC6-G5P6-QT4C`
- [软媒小工具](https://mofang.ruanmei.com)，绿色版压缩包内每一个工具都可以独立运行，很好用，请不要安装其他管家类软件啦！
- [Office](https://otp.landian.vip/zh-cn)

### 办公娱乐

- [QQ](https://im.qq.com)
- [微信](https://pc.weixin.qq.com)
- [网易云音乐](https://music.163.com/#/download)
- [Foxmail 邮箱客户端](https://www.foxmail.com)
- [企业微信](https://work.weixin.qq.com/#indexDownload)
- [Typora 编辑器](https://www.typora.io)
- 爱奇艺万能播放器，应用商店下载（PS 的轻量替代品，查看各种类型图片）

### 开发软件

- [JDK 8](https://www.oracle.com/technetwork/java/javase/downloads/index.html) 或更高版本
- [InteliJ Idea](https://www.jetbrains.com)
- [Node.js](http://nodejs.cn/download)（自带 npm）

- [Maven](https://maven.apache.org/download.cgi)

- [Git](https://git-scm.com/downloads)
- [SVN](https://tortoisesvn.net/downloads.html)
- 数据库
- PowerDesigner
- AxureRP8
- EA
- [Xmanager6](https://www.netsarang.com/zh)

## 其它

### 获取锁屏图片

Win 10 系统的锁屏界面设置为 Windows 聚焦后，联网就能自动更新高清好看的锁屏图片，如何将这些图片保存下来当作桌面壁纸呢？

- 首先，我们打开资源管理器，依次打开这个目录：`C:\Users\xxx\AppData\Local\Packages\Microsoft.Windows.ContentDeliveryManager_xxxxxx\LocalState\Assets` （其中，xxx 是你自己的账户名，xxxxxx 是你自己电脑生成的随机码）

- 打开后发现里面一堆文件，但是文件格式并不是图片格式，我们写个批处理脚本来转换为图片格式。在 `C:\Users\xxx\Pictures` 文件夹下新建一个文件夹 cover，在 cover 文件夹里面新建一个批处理脚本文件 `sync&rename.bat`，并写入以下内容（注意替换为自己电脑的文件夹路径）：

  ```powershell
  :: 重命名文件
  ren C:\Users\xxx\AppData\Local\Packages\Microsoft.Windows.ContentDeliveryManager_xxxxxx\LocalState\Assets\*.* *.jpg
  
  :: 移动文件
  move C:\Users\xxx\AppData\Local\Packages\Microsoft.Windows.ContentDeliveryManager_xxxxxx\LocalState\Assets\*.* C:\Users\xxx\Pictures\cover
  
  :: 开启系统延迟
  setlocal EnableDelayedExpansion
  
  :: 遍历 cover 文件夹，对 jpg 结尾的图片按照时间排序进行统一命名
  set /a a=0
  for /f "delims=" %%i in ('dir /b/od *.jpg') do (
  
      :: 名字相同则无需改变
      if not "%%i" == "!a!.jpg" (
          ren "%%i" "!a!.jpg"
      )
      set /a a+=1
  )
  pause
  ```

文中注释很清楚了，保存之后双击运行，cover 文件夹内便有图片了，其中每个图片都含有桌面横版和手机竖版。以后每隔一段时间只需要双击批处理文件，图片就自动跑到设置的文件夹里面并按创建时间重命名好了，是不是很方便呢？

::: warning 无法获取最新图片的解决方案

如果遇到将 Windows 锁屏界面设置背景为 Windows 聚焦时，总是自动重置为图片，这里给出两个解决办法：

- 看一下**设置**=》**后台应用**中，允许应用在后台运行的开关是否被关闭了，要打开
- 删除 `C:\Users\xxx\AppData\Local\Packages\Microsoft.Windows.ContentDeliveryManager_xxxxxx\Settings` 下面的文件

:::

### 穷人访问 Github

在不使用 VPN 等方式的情况下，修改 hosts 文件依旧可以加快一点访问 Github 的速度。

- 打开 [IP地址查询](https://www.ipaddress.com/)（[快速链接](https://github.com.ipaddress.com/)），查询 github.com 的最新服务器地址 IP，复制
- 右键管理员打开记事本，依次找到 `C:\Windows\System32\drivers\etc\hosts` host 文件并打开，在文件最后加上一行 `140.82.114.4 github.com`，其中 IP 为你查询到的最新 IP
- 保存，如果提示另存为或者只有只读权限，去 C 盘找到该 hosts 文件，右键属性去掉只读的对勾
- 命令行 cmd 运行 `ipconfig /flushdns` 刷新 IP 缓存，ok，可以看看效果（还得看网速）

