---
title: 对象共享
description: 对象共享
meta:
  - name: keywords
    content: 对象共享
tags: ['对象共享']
prev: ./
next: ./thread-coordinate
---

## 可共享的类

有些类是可以共享访问并且线程安全的，比如：

- 无状态的类

  如果一个类只提供方法，没有属性，那么它就是线程安全的。

- 不可变类

  如果对象的属性是不可变的，并且不提供修改方法，那么它是安全的。如果要声明一个完全不可变的类，至少需要以下要素：
  - 声明 final 类型的类，防止字类覆盖方法
  - 声明私有的不可变属性，并且不提供 set 方法修改属性的值
  - 对引用对象的属性，不提供修改方法，并且不暴露引用对象（可以通过提供引用对象的副本给外部访问）
  - 甚至是声明私有构造器，从工厂创建实例

  众所周知，Enum 枚举类是线程安全的不可变类，JDK 9 新增的 VarHandles 类也是不可变的类。

## 原子类

原子操作是一次有效地同时发生的动作。原子操作不能停在中间：它要么完全发生，要么根本不发生。直到动作完成，原子动作的结果才可见。原子动作不能交替，所以不必担心线程干扰（但是不能避免内存一致性错误）。

JDK 5 新增了一些原子操作的封装类在 java.util.concurrent.atomic 包中，比如 AtomicInteger 类提供了 int 类型的原子操作：

- `getAndIncrement()` 自增 1
- `getAndDecrement()` 自减 1
- `intValue()` 获取 int 值，原子类型不能替代 int 类型，但是提供了和 int 类型的转换

原子类更适用于实现线程安全的计数器、累加器等。

## 并发集合类

JDK 5 之前 java.util 包中的大部分集合类都是非线程安全的，JDK 5 在 java.util.concurrent 包中新增了线程安全的集合类，它们的用法与非线程安全的集合类相同，但是保证了线程安全及原子操作。

所有这些集合都通过在将对象添加到集合的操作与访问或删除该对象的后续操作之间定义 happens - before 关系来避免内存一致性错误。对照关系如下：

| 原始集合类 | 并发安全集合类       |
| ---------- | -------------------- |
| ArrayList  | CopyOnWriteArrayList |
| Hashtable  | ConcurrentHashMap    |
| Set        | CopyOnWriteArraySet  |

此外 JDK 6 新增了 支持近似匹配的 ConcurrentNavigableMap 类等。

## 并发随机数

JDK 7 新增了 ThreadLocalRandom 类提高并发获取随机数的性能。使用方式为 `int r = ThreadLocalRandom.current().nextInt(0, 100);`

## 线程局部变量

ThreadLocal 类用来保存线程局部变量，类内部维护了一个自定义的 ThreadLocalMap 哈希映射，键值对继承 WeakReference ，使用 ThreadLocal 对象作为 key，值作为 value，当 `get()` 方法返回空时会自动删除哈希表中的条目。

它作为与线程相关的类私有静态属性，提供了三个方法：

- `get()`，获取值
- `set(T)`，设置值
- `remove()`，清除值

使用方式如下：

```java
private static final ThreadLocal<Integer> local = new ThreadLocal<>();

// JDK 8 新增 lambada 表达式初始化语法
private static final ThreadLocal<Integer> local = ThreadLocal.withInitial(() -> 1);
```

## volatile 关键字

使用 `volatile` 声明变量，降低了内存一致性错误的风险，因为对`volatile`变量的任何写入都会与该变量的后续读取建立先发生后关系。这意味着对`volatile`变量的更改始终对其他线程可见。

## JMM 内存模型

TODO