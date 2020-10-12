---
title: 结构型 - 适配器模式
description: 适配器模式
meta:
  - name: keywords
    content: 适配器模式，结构型模式
tags: ['适配器模式', '结构型模式']
prev: ./
next:
---

## 适配器模式

目的：将一个接口转为另一个接口，复用接口而不改变原来的接口。

## 实现类图

Java IO 流类库也有适配器模式的实现，如下为对象适配器模式的类图：

![StringReader 适配器模式类图.png](https://pycrab.github.io/KeepJava/assets/media/idea-patterns-adapter1.png)

对象适配器模式的要点：

- 适配器类（StringReader）继承目标类（Reader）或者实现目标接口

- 适配器类（StringReader）持有被适配类（String）的对象引用（组合）

类适配器模式主要是适配器类继承被适配器类和目标类，由于 Java 只能单继承，往往是继承被适配类，并实现目标接口。