---
title: 编码和解码
description: 编码和解码学习
meta:
  - name: keywords
    content: 编码，解码，字符集，乱码，ASCII码，ISO-8859-1，GB2312，GBK，GB18030，UTF-16，UTF-8，Unicode统一码，Base64
tags: ['编码和解码', '乱码', '字符集']
prev: ../
next: 
---

## 为什么要编码

计算机被设计为把字节 byte 作为最小的存储单位，即 8 个 bit，那么一个字节最多能表示 2 的 8 次方即 256 个字符。

世界上有各种各样的语言，256 个字符肯定不能代表所有的字符，那么就需要一种规范来表示不同的字符，这样就产生了**从字符 char 到字节 byte** <badge>编码</badge> 和**从字节 byte 到字符 char** <badge>解码</badge> 的转换，这就是编码和解码。

编码规范（或者叫编码格式）大致有以下几种：

- **ASCII 编码**，共有 128 个字符
- **ISO-8859-1**，共有 256 个字符
- **GB2312**，共有 682 个符号，6763 个汉字
- **GBK**，扩展了 GB2312，能表示 21003 个汉字。兼容 GB2312
- **GB18030**，国标，兼容 GB2312
- **Unicode 统一码**，包含世界所有语言，主要有以下两种编码：
  - **UTF-16**，固定两个字节表示一个字符，不适用于网络传输，容易丢失。（Java 在内存中默认使用 UTF-16 编码）
  - **UTF-8**，采用变长字节来表示不同字符，可以减少网络带宽和存储空间

编码并不是一种保证安全的技术，它只是为了使数据保持一致，对不同语言的人都是可视的。如果使用不当，那么就会产生**乱码**，这是我们不想见到的。

为了统一，我们建议使用 Unicode 统一编码；而对于使用到的一些旧的基于非统一编码的技术，我们要了解其默认编码，并通过配置或者程序来避免编码不一致产生的乱码。

## 编码场景及应用

根据编码和解码的定义，存在字符和字节之间进行转换的场景主要有以下几种：

- **Java IO 中字节流（Stream）和字符流 （Reader / Writer）之间的转换**

  主要由 StreamEncoder 类和 StreamDecoder 类进行编码和解码。

  

- **Java 字符串（String）和字节（Byte）的转换**

  主要由 StringCoding 类进行编码和解码。

## 一次 HTTP 请求中的编解码配置

- **对客户端请求编解码**
  - 设置 Ajax 请求 Content Type 编码为 charset=UTF-8
  - 使用 encodeURIComponent() 对 URL 编码
- **服务端接收请求编解码**
  - Tomcat 服务器设置 `<Connector URIEncoding="UTF-8">` 解码 URI
  - Tomcat 服务器设置 `<connector URIEncoding="UTF-8" useBodyEncodingForURI="true">` 解码 Query String 参数
  - 设置 `request.setCharacterEncoding(charset)` 解码 POST 表单
  - 使用 URLEncoder 类对请求头信息（HTTP Header 、Cookies）编解码
- **服务端响应请求编解码**
  - 设置 `response.setCharacterEncoding(charset)` 编码返回 BODY

---

::: tip 参考文献

- 《深入分析 Java Web 技术内幕》（修订版） 许令波 著 电子工业出版社
- [编码算法](https://www.liaoxuefeng.com/wiki/1252599548343744/1304227703947297) 廖雪峰的博客
- [Base64编码原理与应用](http://blog.xiayf.cn/2016/01/24/base64-encoding/) 有趣的技术

:::

