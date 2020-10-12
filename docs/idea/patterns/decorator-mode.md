---
title: 结构型 - 装饰者模式
description: 装饰者模式
meta:
  - name: keywords
    content: 装饰者模式，结构型模式
tags: ['装饰者模式', '结构型模式']
prev: ./
next:
---

## 装饰者模式

目的：对一个类添加新的功能，但不改变原来的类。

实现：通过创建一个装饰类对原有类进行包装（组合），进而添加新的功能。

优点：使用组合和面向抽象原则更灵活，可以动态扩展。

## 实现类图

Java IO 流类库是经典的装饰者模式的实现，这里直接给出 Java IO 流的一个类图：

![IO 流装饰者模式类图.png](https://pycrab.github.io/KeepJava/assets/media/idea-patterns-decorator1.png)

装饰者模式的要点：

- 面向抽象
  - 被装饰类（FileInputStream）和抽象装饰类（FilterInputStream）都继承抽象类（InputStream）或者实现接口
  - 具体装饰类（BufferedInputStream）继承抽象装饰类（FilterInputStream）
- 使用组合
  - 抽象装饰类持有被装饰类的对象引用

## 一知半解

### 为什么不使用继承扩展？

如果仅仅是对一个类进行扩展，可以使用继承；但是如果对多个类进行同样的扩展，再使用继承就会产生大量类似的子类，这时就应该使用装饰者模式进行组合。

### 为什么要有抽象装饰类？

面向抽象的原则，封装公共的部分（如 Java IO 中释放系统资源的 close() 方法）；提供需要被装饰的功能，由具体装饰类去实现。