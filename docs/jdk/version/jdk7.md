---
title: JDK 7
description: Java 概念图，JDK 7 特性解读
meta:
  - name: keywords
    content: JDK 7 特性解读，Java 概念图
tags: ['JDK 7 特性解读',  'Java 概念图']
prev: ./
next: ./jdk8
---

## 概念图

在 JDK 7 中甲骨文官网用一张概念图将 Java 组件按级别进行分类，较低级别的技术给较高级别的技术奠定了基础。

![概念图.png](https://pycrab.github.io/KeepJava/assets/media/jdk-version-7-image1.png)

官方文档如图：

![image.png](https://pycrab.github.io/KeepJava/assets/media/jdk-version-7-image2.png)

译文：

甲骨文 Java SE 7 版本有两个产品：JDK 7 和 JRE 7。

JDK 7 是 JRE 7 的超集，它包含了 JRE 7 的所有，以及其他工具比如开发小程序或者应用系统的编译器和调试器。JRE 7 提供了运行环境、Java 虚拟机以及其他组件来运行使用 Java 编写的程序或应用。需要注意的是 JRE 不仅包含符合 Java 规范的组件，还包含非 Java 规范的组件。

## 特性解读