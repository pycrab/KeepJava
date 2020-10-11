---
title: 序列化和反序列化
description: 序列化和反序列化，Java 序列化和反序列化
meta:
  - name: keywords
    content: 序列化和反序列化，Java 序列化和反序列化
tags: []
prev: ./
next: 
---

## 什么是序列化

序列化就是把对象及其状态变成可以存取的形式（保存到文件、在网络中发送等），反序列化就是恢复对象的过程。

为什么要序列化呢？序列化和反序列化是一种规则，就像编码和解码一样，保证对象在传播过程中是不变的（完整性）。

## Java 中的序列化

Java 默认的序列化机制为：将每个可序列化的对象、对象状态及引用对象转变成字节序列，反序列化就是将字节序列恢复为对象。

### Java 默认序列化

要使用 Java 进行自动序列化，需要注意以下几点：

- 类需要实现 Serializable 接口或者 Externalizable 接口以允许对象序列化，否则 Java 不会对其序列化

- 声明为 static（类的属性，非对象属性）或 transient （临时的）的属性不会序列化

- 如果没有声明 serialVersionUID 属性（private static final long 类型），序列化时会自动根据对象生成，反序列化时也会自动根据现有的类生成并进行对比，不一致会反序列化失败抛出 InvalidClassException 异常

  > 建议手动指定该属性，防止由于平台不同或者类的变动导致已序列化的对象无法恢复。
  >
  > 当然指定了也可以修改，相当于版本号，用于告知不一致需要升级。

- 声明为可序列化类的字类也会继承变为可序列化的类；但是如果父类没有声明可序列化，字类声明了，则只序列化字类

- 枚举类的序列化不同于普通类，枚举常量的序列化只由其名称组成，常量的字段值不序列化；枚举常量的序列化过程无法自定义。

可知，Java 中的基础类 String 类默认支持序列化。

### 自定义序列化过程

Java 中手动进行序列化使用的类库为 ObjectOutputStream 类，即调用 ObjectOutputStream 类的 writeObject(Object o) 方法进行序列化对象，调用 ObjectInputStream 类的 readObject() 方法来反序列化对象。也可以自定义序列化的过程替代默认的序列化，方法为：

- 实现 Serializable 接口，并提供以下特殊方法，通过抛出 NotSerializableException 异常来终止序列化。

  ```java
  private void readObject(java.io.ObjectInputStream stream) throws IOException, ClassNotFoundException;
  private void writeObject(java.io.ObjectOutputStream stream) throws IOException;
  private void readObjectNoData() throws ObjectStreamException;
  ```

- 或者实现 Externalizable 接口，并实现以下方法：

  ```java
  void writeExternal(ObjectOutput out) throws IOException;
  void readExternal(ObjectInput in) throws IOException, ClassNotFoundException;
  ```

## Spring MVC 中的序列化

Java Web 开发中我们的 Web 请求和响应经常使用的序列化格式为 JSON 格式。将对象序列化为 JSON 格式和将 JSON 反序列化为对象的过程由 Spring MVC 指定序列化器，可以通过这篇文章 [DEBUG - Jackson 反序列化驼峰问题](./jackson-serialization) 管中窥豹。

JSON 序列化的第三方类库有 Jackson，Gson，fastjson 等，下面简单讲一下使用。

### Jackson

1、导包

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-json</artifactId>
</dependency>
```

2、实体类注解

3、序列化

### Gson

1、导包

2、实体类注解

3、序列化

### fastjson

1、导包

2、实体类注解

3、序列化

---

::: tip 参考文献

美团技术团队 [序列化和反序列化](https://tech.meituan.com/2015/02/26/serialization-vs-deserialization.html)

:::