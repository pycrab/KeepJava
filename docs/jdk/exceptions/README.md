---
title: Java 异常
description: Java 异常
meta:
  - name: keywords
    content: Java 异常，Exception
tags: ['Exception']
prev: ../annotation/
next: ../generics/
---

## 什么是异常

​		异常是程序执行期间发生的中断正常指令流的事件。Java 提供了异常类和异常处理程序来处理运行时系统产生的异常。

## Java 异常类

​		Java 异常类主要分为两种类型，一种是应用程序外部产生的错误（由 **Error** 类声明）；一种是应用程序内部产生的异常（由 **Exception** 类声明）。Java 异常类继承体系如下图：

![Java 异常继承图](https://pycrab.github.io/KeepJava/assets/media/jdk-exceptions-extends.png)

​		其中，Exception 及其字类（除了 RuntimeException 及其字类）称为**已检查的异常（checked Exception）**，Java 规定已检查的异常必须处理（捕获或者抛出）；而 Error 及其字类和 RuntimeException 及其字类统称为**未检查的异常（UnChecked Exception）**，出现该类异常应用程序通常无法预期及恢复。

​		特殊声明的 **RuntimeException 运行时异常**用来指示由于编程错误导致的异常，这类错误无法全部列出并强制声明处理，因此归为未检查的异常。

常见的异常类：

![Error 类继承图](https://pycrab.github.io/KeepJava/assets/media/jdk-exceptions-extends-error.png)

![Exception 类继承图](https://pycrab.github.io/KeepJava/assets/media/jdk-exceptions-extends-exception.png)

## Java 异常处理

### 抛出异常

​		Java 使用 **throw** 和 **throws** 关键字来抛出异常。

​		throw 可抛出的对象必须是 Throwable 类及其字类的实例，通常我们的简单程序中不会去捕获或者抛出 Error 类型的异常，大多数程序都是抛出并捕获 Exception 类型的异常。如果抛出的是已检查的异常，需要捕获处理，或者不处理但在方法声明中使用 throws 关键字声明抛出该异常。示例：

```java
public void test() throws Exception {
    throw new IOException();
}
```

​		通常我们需要创建一类异常组，然后创建其具体的字类异常类型来使用，便于查找问题，而不是抛出模糊的 Exception 类型。示例：

```java
/**
 * 异常组
 */
public class BusException extends RuntimeException {
    public BusException() {
        super();
    }

    public BusException(String busMessage) {
        super(busMessage);
    }

    public BusException(String busMessage, Throwable cause) {
        super(busMessage, cause);
    }

    public BusException(Throwable cause) {
        this("业务异常信息", cause);
    }
}

/**
 * 具体异常
 */
public class BusOrderException extends BusException {
    public BusOrderException() {
        super();
    }

    public BusOrderException(String busMessage) {
        super(busMessage);
    }

    public BusOrderException(String busMessage, Throwable cause) {
        super(busMessage, cause);
    }

    public BusOrderException(Throwable cause) {
        this("订单业务异常信息", cause);
    }
}
```

### 捕获异常

​		Java 使用 **try**、**catch** 和 **finally** 关键字来捕获并处理异常。

​		首先必须使用 try 块包裹可能产生异常的代码块。

​		使用 catch 依次顺序捕获指定异常；一个 catch 块可以使用竖线 | 分隔异常来处理一种以上类型的异常<badge>JDK 7</badge>，处理一种以上类型的异常时，catch 块的参数是隐式的 final 类型，不可修改；catch 块和 finally 块至少有一个（使用 try - with - resources 形式时可以只有 try 块）。

​		在 try 和 catch 退出时执行 finally 块中的代码，finally 至多有一个。示例：

```java
try {
    // something
} catch (Exception1 e1) {
    // do
} catch (Exception2 e2 | Exception3 e3) {
    // do
} catch(Exception e) {
    // do
}

try {
    // something
} catch (Exception e) {
    // do
} finally {
    // do finally
}
```

::: warning 屏蔽异常

catch 捕获异常后可以继续抛出异常，进行异常的链式传播，最好不要丢失原来的异常信息。但是如果 catch 中抛出异常，在 finally 中也抛出了异常，这样 catch 中抛的异常就失效了，即异常被屏蔽，因为只能抛出一个异常。

如果我们需要保存所有异常信息，需要先将被屏蔽的原始异常缓存起来，然后加入新的异常中，示例：

```java
Exception origin = null;
try {
    System.out.println(Integer.parseInt("abc"));
} catch (Exception e) {
    origin = e;
    throw e;
} finally {
    Exception e = new IllegalArgumentException();
    if (origin != null) {
        e.addSuppressed(origin);
    }
    throw e;
}
```

:::

### 释放资源

​		实现了 AutoCloseable 接口（java.io.Closeable 接口继承了 AutoCloseable 接口）的类称为资源。通常我们在 finally 块中释放资源，因为 finally 块总是最后执行。

::: warning finally

正常情况下 try - catch - finally 顺序执行，即 finally 总会在异常处理完毕最后执行，除非在 try 或者 catch 中 JVM 直接退出，或者执行 try / catch 的线程被中断或杀死。示例：

```java
// 该段代码会输出 try catch，不会输出 finally
try {
    System.out.print("try ");
    throw new RuntimeException();
} catch (Exception e) {
    System.out.print("catch");
    System.exit(0);
} finally {
    System.out.print("finally");
}
```

:::

<badge>JDK 7 </badge>提供了 try - with - resources 语法糖保证在 try 执行之后自动关闭资源，可以省略 finally 语句。示例：

```java
try (BufferedReader br = new BufferedReader(new FileReader(path))) {
    return br.readLine();
}
```

## Java 异常优势

使用 Java 异常处理程序相比传统错误处理代码的优势如下：

- 传播异常：通过方法声明抛出异常，使得异常可以在方法调用堆栈中传播，按需捕获处理
- 捕获异常：通过继承创建异常组，可以捕获异常组或者精确异常。
- 处理异常：将可能发生异常的代码与异常处理代码分开（解耦）

---

::: tip 链接

使用Spring 注解实现 [全局统一异常处理](../../javaEE/Spring/action-exception) 。

:::