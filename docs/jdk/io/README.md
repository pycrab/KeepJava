---
title: Java IO
description: Java IO
meta:
  - name: keywords
    content: Java IO
tags: ['Java IO']
prev: ../collection/
next: ../thread/
---

## Java Basic IO

### [IO 流](./io-streams)

> Java 中使用流来传递、操纵、转换数据，流就是简单字节、原始数据类型、本地化字符或者对象组成的数据序列。
>
> 一次 IO 流就是数据从一个源到一个目的地的过程，它可能存在磁盘文件、外围设备（键盘等）、其它程序（通过网络）或者内存序列之间。其中，向内存写入的流称为**输入流**，从内存中输出的流称为**输出流**。
>
> IO 流大大简化了 IO 操作，大多数类都在 java.io 包中。

### [文件 IO](./file-io)

> JDK 7 重新设计了文件 IO，新增了 java.nio.file 包，JDK 7 之前的 java.io.File 类中的一些功能可以映射到 java.nio.file 包中。
>

## 拓展

### IO 模型

### Java NIO