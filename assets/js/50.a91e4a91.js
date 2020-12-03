(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{403:function(t,r,e){"use strict";e.r(r);var s=e(25),a=Object(s.a)({},(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("blockquote",[e("p",[t._v("本文基于微软主推的 Windows 10 系统，介绍系统使用过程中的常用技巧。")])]),t._v(" "),e("h2",{attrs:{id:"系统安装与激活"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#系统安装与激活"}},[t._v("🎋")]),t._v(" 系统安装与激活")]),t._v(" "),e("p",[t._v("不管是拿到一台 Windows 系统的新电脑，还是系统出现了问题，我们都会遇到重装系统。重装系统可以个性化设置盘符大小，通过官方原版镜像来重置脏数据（LM 软件和和捆绑软件）。")]),t._v(" "),e("h3",{attrs:{id:"准备工作"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#准备工作"}},[t._v("🎋")]),t._v(" 准备工作")]),t._v(" "),e("ul",[e("li",[t._v("准备一个大于 4G 的 U 盘用来制作启动盘，需要格式化，先备份好 U 盘中的数据")]),t._v(" "),e("li",[t._v("下载最新的 Win10 介质创建工具，打开 "),e("a",{attrs:{href:"https://www.microsoft.com/zh-cn/software-download/windows10",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方地址"),e("OutboundLink")],1),t._v(" 点击"),e("strong",[t._v("立即下载工具")]),t._v("，下载完成后双击下载的 exe 文件运行，插入 U 盘按照提示制作 Win 10 专业版 U 盘启动盘")])]),t._v(" "),e("h3",{attrs:{id:"系统安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#系统安装"}},[t._v("🎋")]),t._v(" 系统安装")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("如果原系统可用")]),t._v(" "),e("p",[t._v("可以在开机状态下，插入制作好的 U 盘启动盘，Win 10 中打开"),e("strong",[t._v("设置")]),t._v("=》"),e("strong",[t._v("更新和安全")]),t._v("=》"),e("strong",[t._v("恢复")]),t._v("=》"),e("strong",[t._v("立即重新启动")]),t._v("，选择从 U 盘启动，然后选择自己的 U 盘即可进入自动安装步骤。")])]),t._v(" "),e("li",[e("p",[t._v("如果原系统不可用")]),t._v(" "),e("p",[t._v("可以在关机状态下，插入制作好的 U 盘启动盘，在电脑加载厂商 LOGO 进入画面之前，按住快捷键（电脑进入 U 盘启动盘的快捷键，不知道可以搜一下，比如华硕笔记本是 ESC 键，小米笔记本是 F12 键，一般都不会是 F2 键，因为 F2 都是进 BIOS 修改配置的快捷键），等待电脑弹框提示选择 U 盘，按方向键选择自己的 U 盘，回车进入安装步骤。")]),t._v(" "),e("div",{staticClass:"custom-block warning"},[e("p",{staticClass:"custom-block-title"},[t._v("提示")]),t._v(" "),e("p",[t._v("如果直接进入了系统，先排除系统是否开启了快速启动模式（Win 8 就会默认开启快速启动，跳过磁盘自检），如果开启了需要关闭才能按快捷键弹出 U 盘选择，否则可能需要重复好几次以上操作才能进入。")])])])]),t._v(" "),e("p",[t._v("推荐使用第一种方式。")]),t._v(" "),e("p",[t._v("进入安装步骤后，按照提示操作，输入密钥先选择跳过以后再进行激活；可以自己重新分配盘符大小；安装过程可能会多次重启电脑，不要紧，连接网络后等待安装完成（过程中会配置账户信息及个性化设置）。")]),t._v(" "),e("p",[t._v("安装完成进入桌面后，首先不要下载安装软件，建议先进入设置进行检查更新，这时候会下载很多更新及驱动程序更新，比如显示器驱动（安装完成黑屏，或者不能够调整亮度，有可能就是没有安装好显示器驱动！）")]),t._v(" "),e("h3",{attrs:{id:"系统激活"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#系统激活"}},[t._v("🎋")]),t._v(" 系统激活")]),t._v(" "),e("p",[t._v("自带 Win 10 系统的新电脑一般已经主板激活，重装系统后只要联网就会自动激活。但是如果是盗版则需要使用 KMS 激活。")]),t._v(" "),e("p",[t._v("可以根据 "),e("a",{attrs:{href:"https://kms.cangshui.net/",target:"_blank",rel:"noopener noreferrer"}},[t._v("沧水的 KMS 激活服务"),e("OutboundLink")],1),t._v(" 网站的指引进行激活，不用下载软件，打开 cmd 控制台，大致使用以下命令：")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("slmgr -xpr")]),t._v(" 查看激活状态")]),t._v(" "),e("li",[e("code",[t._v("slmgr -upk")]),t._v(" 卸载密钥")]),t._v(" "),e("li",[e("code",[t._v("slmgr -ipk W269N-WFGWX-YVC9B-4J6C9-T83GX")]),t._v(" 安装密钥，该密钥需要和安装的系统版本对应，比如这里是专业版")]),t._v(" "),e("li",[e("code",[t._v("slmgr -skms kms.cangshui.net")]),t._v(" 设置 KMS 激活服务器，比如 "),e("code",[t._v("kms.03k.org")])]),t._v(" "),e("li",[e("code",[t._v("slmgr -ato")]),t._v(" 开始激活")]),t._v(" "),e("li",[e("code",[t._v("slmgr -dlv")]),t._v(" 激活成功后查看激活信息")])]),t._v(" "),e("h2",{attrs:{id:"系统优化设置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#系统优化设置"}},[t._v("🎋")]),t._v(" 系统优化设置")]),t._v(" "),e("p",[t._v("建议注册微软账号，登录微软账号可以同步设置及主题。")]),t._v(" "),e("p",[t._v("1、建议打开 "),e("strong",[t._v("Windows 设置")]),t._v("，逐项查看，根据需要进行设置，里面有很多小细节。比如设置触摸板三指四指操作。")]),t._v(" "),e("p",[t._v("2、"),e("strong",[t._v("更新和安全")]),t._v("中，开启开发人员模式。")]),t._v(" "),e("p",[t._v("3、"),e("strong",[t._v("程序和功能")]),t._v("中，打开启用或关闭 Windows 功能，开启 Linux 子系统。")]),t._v(" "),e("p",[t._v("4、"),e("strong",[t._v("电源选项")]),t._v("中，开启高性能电源计划。")]),t._v(" "),e("p",[t._v("5、打开文件资源管理器，点击菜单栏查看中的"),e("strong",[t._v("选项")]),t._v("，设置快速访问，及显示文件后缀名。")]),t._v(" "),e("p",[t._v("6、"),e("strong",[t._v("此电脑")]),t._v("右键选择"),e("strong",[t._v("属性")]),t._v("，打开高级系统设置，设置系统还原点；开启性能模式。")]),t._v(" "),e("p",[t._v("7、"),e("strong",[t._v("此电脑")]),t._v("右键选择"),e("strong",[t._v("管理")]),t._v("，可以进行磁盘管理，从高一级给低一级的磁盘扩充容量（注意不能从低往高扩充，比如 C 盘固定了就不能增大了）；可以制定任务计划程序。")]),t._v(" "),e("p",[t._v("8、搜索设置，设置索引目录")]),t._v(" "),e("h2",{attrs:{id:"常用软件及其配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#常用软件及其配置"}},[t._v("🎋")]),t._v(" 常用软件及其配置")]),t._v(" "),e("h3",{attrs:{id:"基础软件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#基础软件"}},[t._v("🎋")]),t._v(" 基础软件")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://www.google.com/intl/zh-CN/chrome",target:"_blank",rel:"noopener noreferrer"}},[t._v("Google 浏览器"),e("OutboundLink")],1),t._v("，好用的插件如下：\n"),e("ul",[e("li",[t._v("Table of contents sidebar，将网页标题提取出来生成侧边导航栏，极力推荐")]),t._v(" "),e("li",[t._v("uBlock Origin，网页广告拦截")]),t._v(" "),e("li",[t._v("眼睛护航，网页添加护眼背景色")]),t._v(" "),e("li",[t._v("Enhanced GitHub，提供了显示 GitHub 文件大小，及下载单个文件的功能")]),t._v(" "),e("li",[t._v("JSON Viewer，浏览器地址栏输入 json-viewer 按 tab 键，然后粘贴 JSON 文本回车")]),t._v(" "),e("li",[t._v("Google 翻译，不多说")]),t._v(" "),e("li",[t._v("谷歌访问助手")]),t._v(" "),e("li",[t._v("Tampermonkey 油猴插件（配合 IDM 下载器使用）")]),t._v(" "),e("li",[t._v("Google 文档的离线功能")]),t._v(" "),e("li",[t._v("Foxit PDF Creator")])])]),t._v(" "),e("li",[e("a",{attrs:{href:"https://www.7-zip.org",target:"_blank",rel:"noopener noreferrer"}},[t._v("7Zip 解压缩"),e("OutboundLink")],1),t._v("，轻量级的压缩解压工具")]),t._v(" "),e("li",[e("a",{attrs:{href:"https://download.ccleaner.com/cctrialsetup.exe",target:"_blank",rel:"noopener noreferrer"}},[t._v("CCleaner 垃圾清理"),e("OutboundLink")],1),t._v("，下载专业版试用，用于卸载卸不掉的软件。离线激活：\n"),e("ul",[e("li",[t._v("用户名 "),e("code",[t._v("Registered User")]),t._v("，激活码 "),e("code",[t._v("BB4-FJN4-EPC6-G5P6-QT4C")])])])]),t._v(" "),e("li",[e("a",{attrs:{href:"https://mofang.ruanmei.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("软媒小工具"),e("OutboundLink")],1),t._v("，绿色版压缩包内每一个工具都可以独立运行，很好用，请不要安装其他管家类软件啦！")]),t._v(" "),e("li",[e("a",{attrs:{href:"https://otp.landian.vip/zh-cn",target:"_blank",rel:"noopener noreferrer"}},[t._v("Office"),e("OutboundLink")],1)])]),t._v(" "),e("h3",{attrs:{id:"办公娱乐"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#办公娱乐"}},[t._v("🎋")]),t._v(" 办公娱乐")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://im.qq.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("QQ"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://pc.weixin.qq.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("微信"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://music.163.com/#/download",target:"_blank",rel:"noopener noreferrer"}},[t._v("网易云音乐"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://www.foxmail.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("Foxmail 邮箱客户端"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://work.weixin.qq.com/#indexDownload",target:"_blank",rel:"noopener noreferrer"}},[t._v("企业微信"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://m.dingtalk.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("钉钉"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://www.typora.io",target:"_blank",rel:"noopener noreferrer"}},[t._v("Typora 编辑器"),e("OutboundLink")],1)]),t._v(" "),e("li",[t._v("爱奇艺万能播放器，应用商店下载（PS 的轻量替代品，查看各种类型图片）")])]),t._v(" "),e("h3",{attrs:{id:"开发软件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#开发软件"}},[t._v("🎋")]),t._v(" 开发软件")]),t._v(" "),e("ul",[e("li",[e("p",[e("a",{attrs:{href:"https://www.oracle.com/technetwork/java/javase/downloads/index.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("JDK 8"),e("OutboundLink")],1),t._v(" 或更高版本")])]),t._v(" "),e("li",[e("p",[e("a",{attrs:{href:"https://www.jetbrains.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("InteliJ Idea"),e("OutboundLink")],1)])]),t._v(" "),e("li",[e("p",[e("a",{attrs:{href:"http://nodejs.cn/download",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node.js"),e("OutboundLink")],1),t._v("（自带 npm）")])]),t._v(" "),e("li",[e("p",[e("a",{attrs:{href:"https://maven.apache.org/download.cgi",target:"_blank",rel:"noopener noreferrer"}},[t._v("Maven"),e("OutboundLink")],1)])]),t._v(" "),e("li",[e("p",[e("a",{attrs:{href:"https://git-scm.com/downloads",target:"_blank",rel:"noopener noreferrer"}},[t._v("Git"),e("OutboundLink")],1)])]),t._v(" "),e("li",[e("p",[e("a",{attrs:{href:"https://tortoisesvn.net/downloads.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("SVN"),e("OutboundLink")],1)])]),t._v(" "),e("li",[e("p",[t._v("数据库")])]),t._v(" "),e("li",[e("p",[t._v("PowerDesigner")])]),t._v(" "),e("li",[e("p",[t._v("AxureRP8")])]),t._v(" "),e("li",[e("p",[t._v("EA")])]),t._v(" "),e("li",[e("p",[e("a",{attrs:{href:"https://www.netsarang.com/zh",target:"_blank",rel:"noopener noreferrer"}},[t._v("Xmanager6"),e("OutboundLink")],1)])])]),t._v(" "),e("h2",{attrs:{id:"其它"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#其它"}},[t._v("🎋")]),t._v(" 其它")]),t._v(" "),e("h3",{attrs:{id:"获取锁屏图片"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#获取锁屏图片"}},[t._v("🎋")]),t._v(" 获取锁屏图片")]),t._v(" "),e("p",[t._v("Win 10 系统的锁屏界面设置为 Windows 聚焦后，联网就能自动更新高清好看的锁屏图片，如何将这些图片保存下来当作桌面壁纸呢？")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("首先，我们打开资源管理器，依次打开这个目录："),e("code",[t._v("C:\\Users\\xxx\\AppData\\Local\\Packages\\Microsoft.Windows.ContentDeliveryManager_xxxxxx\\LocalState\\Assets")]),t._v(" （其中，xxx 是你自己的账户名，xxxxxx 是你自己电脑生成的随机码）")])]),t._v(" "),e("li",[e("p",[t._v("打开后发现里面一堆文件，但是文件格式并不是图片格式，我们写个批处理脚本来转换为图片格式。在 "),e("code",[t._v("C:\\Users\\xxx\\Pictures")]),t._v(" 文件夹下新建一个文件夹 cover，在 cover 文件夹里面新建一个批处理脚本文件 "),e("code",[t._v("sync&rename.bat")]),t._v("，并写入以下内容（注意替换为自己电脑的文件夹路径）：")]),t._v(" "),e("div",{staticClass:"language-powershell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-powershell"}},[e("code",[t._v(":: 重命名文件\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ren")]),t._v(" C:\\Users\\xxx\\AppData\\Local\\Packages\\Microsoft"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Windows"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ContentDeliveryManager_xxxxxx\\LocalState\\Assets\\"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("jpg\n\n:: 移动文件\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("move")]),t._v(" C:\\Users\\xxx\\AppData\\Local\\Packages\\Microsoft"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Windows"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ContentDeliveryManager_xxxxxx\\LocalState\\Assets\\"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" C:\\Users\\xxx\\Pictures\\cover\n\n:: 开启系统延迟\nsetlocal EnableDelayedExpansion\n\n:: 遍历 cover 文件夹，对 jpg 结尾的图片按照时间排序进行统一命名\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("a a=0\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("f "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"delims="')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v("i in "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dir /b/od *.jpg'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("do")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\n    :: 名字相同则无需改变\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" not "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"%%i"')]),t._v(" == "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"!a!.jpg"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ren")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"%%i"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"!a!.jpg"')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("a a"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v("1\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\npause\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br"),e("span",{staticClass:"line-number"},[t._v("9")]),e("br"),e("span",{staticClass:"line-number"},[t._v("10")]),e("br"),e("span",{staticClass:"line-number"},[t._v("11")]),e("br"),e("span",{staticClass:"line-number"},[t._v("12")]),e("br"),e("span",{staticClass:"line-number"},[t._v("13")]),e("br"),e("span",{staticClass:"line-number"},[t._v("14")]),e("br"),e("span",{staticClass:"line-number"},[t._v("15")]),e("br"),e("span",{staticClass:"line-number"},[t._v("16")]),e("br"),e("span",{staticClass:"line-number"},[t._v("17")]),e("br"),e("span",{staticClass:"line-number"},[t._v("18")]),e("br"),e("span",{staticClass:"line-number"},[t._v("19")]),e("br"),e("span",{staticClass:"line-number"},[t._v("20")]),e("br")])])])]),t._v(" "),e("p",[t._v("文中注释很清楚了，保存之后双击运行，cover 文件夹内便有图片了，其中每个图片都含有桌面横版和手机竖版。以后每隔一段时间只需要双击批处理文件，图片就自动跑到设置的文件夹里面并按创建时间重命名好了，是不是很方便呢？")]),t._v(" "),e("div",{staticClass:"custom-block warning"},[e("p",{staticClass:"custom-block-title"},[t._v("无法获取最新图片的解决方案")]),t._v(" "),e("p",[t._v("如果遇到将 Windows 锁屏界面设置背景为 Windows 聚焦时，总是自动重置为图片，这里给出两个解决办法：")]),t._v(" "),e("ul",[e("li",[t._v("看一下"),e("strong",[t._v("设置")]),t._v("=》"),e("strong",[t._v("后台应用")]),t._v("中，允许应用在后台运行的开关是否被关闭了，要打开")]),t._v(" "),e("li",[t._v("删除 "),e("code",[t._v("C:\\Users\\xxx\\AppData\\Local\\Packages\\Microsoft.Windows.ContentDeliveryManager_xxxxxx\\Settings")]),t._v(" 下面的文件")])])]),t._v(" "),e("h3",{attrs:{id:"穷人访问-github"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#穷人访问-github"}},[t._v("🎋")]),t._v(" 穷人访问 Github")]),t._v(" "),e("p",[t._v("在不使用 VPN 等方式的情况下，修改 hosts 文件依旧可以加快一点访问 Github 的速度。")]),t._v(" "),e("ul",[e("li",[t._v("打开 "),e("a",{attrs:{href:"https://www.ipaddress.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("IP地址查询"),e("OutboundLink")],1),t._v("（"),e("a",{attrs:{href:"https://github.com.ipaddress.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("快速链接"),e("OutboundLink")],1),t._v("），查询 github.com 的最新服务器地址 IP，复制")]),t._v(" "),e("li",[t._v("右键管理员打开记事本，依次找到 "),e("code",[t._v("C:\\Windows\\System32\\drivers\\etc\\hosts")]),t._v(" host 文件并打开，在文件最后加上一行 "),e("code",[t._v("140.82.114.4 github.com")]),t._v("，其中 IP 为你查询到的最新 IP")]),t._v(" "),e("li",[t._v("保存，如果提示另存为或者只有只读权限，去 C 盘找到该 hosts 文件，右键属性去掉只读的对勾")]),t._v(" "),e("li",[t._v("命令行 cmd 运行 "),e("code",[t._v("ipconfig /flushdns")]),t._v(" 刷新 IP 缓存，ok，可以看看效果（还得看网速）")]),t._v(" "),e("li",[t._v("还是花一顿饭钱，买个加速器吧。")])])])}),[],!1,null,null,null);r.default=a.exports}}]);