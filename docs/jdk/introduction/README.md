---
title: Java 语言基础
description: Java 语言基础
meta:
  - name: keywords
    content: Java 语言基础
tags: ['Java 语言基础']
prev: 
next: ../version/
---

::: tip 官方文档

先附上 [甲骨文Java下载地址](https://www.oracle.com/java/technologies/javase-downloads.html)，官方网站及源代码注释是学习 Java 的权威资料。

:::

![image.png](https://pycrab.github.io/KeepJava/assets/media/jdk-introduction-image1.png)  

## Java 由来

Java的由来，可以从几个角度来说：

- 一个是目的，为了做一个通用的家电（电视机顶盒，冰箱，彩电等）控制系统，摒弃不同的处理器等硬件厂商设备的不同，达到 **Write Once，Run Anywhere** 的效果，事实证明虚拟机的设计理念确实奏效；
- 一个是实现，由于 C++ 语言对开发人员不够友好，比如回收内存，可移植性，分布式，多线程等，“Green计划”小组成员基于 C++ 实现了这个面向对象的全新的语言（也继承了空指针这个令人头疼的特性）；
- 一个是机遇，虽然在机顶盒领域没有拿到一丁点回报，但是由于互联网和浏览器的出现，Java 抓住了机遇并顺势推出 Applet（Java 小程序），使得在浏览器上可以动态展示内容，这引起了开发者狂热的追捧。

## Java 语言

> The Java™ Programming Language is a general-purpose, concurrent, strongly typed, class-based object-oriented language. It is normally compiled to the bytecode instruction set and binary format defined in the Java Virtual Machine Specification.
>
> 译：Java 编程语言，是一门通用的并发、强类型、基于类的面向对象的语言。通常将其编译为 Java 虚拟机中定义的字节码指令集和二进制格式。

Java 语言是一种高级语言，在 [Java白皮书](https://www.oracle.com/technetwork/java/langenv-140151.html) 中用几个术语来表征：

- 简单性（Simple）
- 面向对象（Object oriented）
- 分布式（Distributed）
- 多线程（Multithreaded）
- 动态（Dynamic）
- 高性能（High performance）
- 健壮（Robust）
- 安全（Secure）
- 方便（Portable）
- 架构中立（Architecture neutral）

在 Java 语言中，所有的源文件都是以 .Java 结尾的纯文本文件，然后这些源文件通过 javac 编译器编译成以 .class 文件结尾的字节码文件（不是处理器能够原生处理的代码），字节码文件是 Java 虚拟机的机器语言，Java 启动器工具将使用Java 虚拟机的实例来运行我们的程序。

![image.png](https://pycrab.github.io/KeepJava/assets/media/jdk-introduction-image8.png)

因为 Java 虚拟机可以安装在不同的操作系统上，这就使得能够运行在 Java 虚拟机中的字节码文件得以运行于不同的平台，同时 Java 虚拟机可以在运行时执行其他任务，比如查找性能瓶颈、重新编译常用的代码为原生代码来提高应用程序的性能。

![image.png](https://pycrab.github.io/KeepJava/assets/media/jdk-introduction-image9.png)

## Java平台

> A *platform* is the hardware or software environment in which a program runs. We've already mentioned some of the most popular platforms like Microsoft Windows, Linux, Solaris OS, and Mac OS. Most platforms can be described as a combination of the operating system and underlying hardware. The Java platform differs from most other platforms in that it's a software-only platform that runs on top of other hardware-based platforms.
>
> 译：大多数平台可以描述为操作系统和基础硬件的组合，而 Java 平台不同的是，它是运行在其他基于硬件的平台之上的纯软件平台。

Java 平台包含两个组成部分：

- Java 虚拟机
- Java 应用程序编程接口（API）

其中，Java 虚拟机是 Java 平台的基础，并且它已经移植到各种基于硬件的平台上。API 则是大量现有软件组件的集合，它分为相关类和接口的库，这些库称为软件包（*packages*）。

![image.png](https://pycrab.github.io/KeepJava/assets/media/jdk-introduction-image10.png)

作为**与平台无关**的环境，Java 平台可能比本地代码稍微慢一些，但是，编译器和虚拟机技术的进步正在以不威胁可移植性的方式使性能接近本地代码。

## [Java 技术用途](https://docs.oracle.com/javase/tutorial/getStarted/intro/cando.html)

通用的高级 Java 编程语言是功能强大的软件平台，Java 平台的每个完整实现都包含以下内容：

- 开发工具，包含编译（javac）、运行（java）、监控（jConsole）、调试以及记录（javadoc）应用程序的工具
- 应用程序编程接口（API），提供 Java 语言的核心功能，他提供的类可以在应用程序中使用，涵盖了从基本对象到网络和安全，再到XML生成和数据库访问等各个方面
- 部署技术，JDK 提供了标准机制用于将应用程序部署到最终用户，比如 Java Web Start 软件和 Java Plug-In 软件
- 用户界面工具包，使用 JavaFX，Swing 和 Java 2D 工具箱来创建复杂的图形用户界面（GUI）
- 集成库，例如 Java IDL API，JDBC API，Java 命名和目录接口（JNDI）API，Java RMI，以及通过网络上的远程方法调用 Inter-ORB 协议技术（Java RMI-IIOP 技术）来访问和操作远程对象的数据库。

## [Java 技术优势](https://docs.oracle.com/javase/tutorial/getStarted/intro/changemylife.html)

- 快速上手
- 代码量更少（相比 C++ 少四倍），开发更快
- 写出更好的代码，Java 编程语言鼓励良好的编码习惯，自动垃圾回收可避免内存泄漏。它的面向对象，其 JavaBeans™ 组件体系结构以及范围广泛、易于扩展的 API 使您可以重用现有的，经过测试的代码，并减少错误
- 平台无关性，可移植性强，**Write once, run anywhere**

## 安装 JDK

​		Java 面世之后，首先发布了 JDK 1.0，它包含 JDK（Java Development Kit，Java 开发工具包）和 JRE（Java Runtime Environment，Java 运行时环境）两部分。JRE 包含 JVM（Java Virtual Machine， Java 虚拟机）、类库和运行 Java 程序的其他文件，只能用来运行 Java 程序；而 JDK 不仅包含 JRE，还提供了 javac 编译器以及 java 程序调试分析的工具等，所以开发人员需要下载 JDK来开发程序。

JDK 的下载安装也很简单，[进入官网](https://www.oracle.com/java/technologies/javase-downloads.html) 下载对应操作系统的 JDK 安装包：

- Windows 系统

  - exe安装，zip解压安装
  - 配置JAVA_HOME和path环境变量（JDK 1.5 之前还需要配置classpath）
    - `JAVA_HOME=`

- Linux 系统

  - 在线安装

    - `sudo apt install openjdk-11-jdk`，默认会配置环境变量

  - 手动安装

    - 创建文件夹`mkdir /usr/local/java`

    - 将tar.gz 离线包传输到服务器

    - 解压 `tar -zxvf jdk-8u221-linux-x64.tar.gz`

    - 设置环境变量`vi /etc/profile`添加：

      ```js
      export JAVA_HOME=/usr/local/java/jdk1.8.0_221
      export JRE_HOME=${JAVA_HOME}/jre
      export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib:$CLASSPATH
      export JAVA_PATH=${JAVA_HOME}/bin:${JRE_HOME}/bin
      export PATH=$PATH:${JAVA_PATH}
      ```

      使环境变量生效`source /etc/profile`

    - 添加软连接`ln -s /usr/local/java/jdk1.8.0_221/bin/java /usr/bin/java`

- macOs 安装

  - dmg 安装，gz

## [第一个 Java 应用程序](https://docs.oracle.com/javase/tutorial/getStarted/application/index.html)

- 下载安装 JDK
- 编写 Main.java 源文件如下：

```java
/**
 * Java 应用包含三部分，源代码注释、类定义和 Main 方法
 * Hello World
 */
public class Main
{
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

- 编译源文件`javac Main.java`
- 运行字节码文件`java Main`
- 要注意Java严格区分大小写

---

![image.png](https://pycrab.github.io/KeepJava/assets/media/jdk-introduction-image7.png)

## Java 基本语法

### 变量

- Java 语言定义了四种变量：
  - Instance Variables (Non-Static Fields) ，实例变量（非静态属性），对于每个类的实例（对象）来说，实例变量是唯一的
  - Class Variables (Static Fields) ，类变量（静态属性），用 **static** 关键字标识，不管类实例化了多少对象，这些对象都共享这个类变量（只有一份）
  - Local Variables，局部变量，方法中定义的变量，只能在定义它的方法中访问，其他方法不能访问，它只能被称为变量，而不能称为属性，区别于类及类实例的属性
  - Parameters，方法参数，给方法提供信息的变量，它只能被称为变量，而不能称为属性，它也适用于构造器和异常处理中的参数

- Java 变量命名规则： 
  - 字母，下划线 _ 或 $ 开头的无限长度的 Unicode 字符和数字序列，不能使用 Java 关键字或保留字
  - 约定：只用字母，采用英文全称 + 驼峰命名
  - 约定：静态常量使用全大写字母 + 下划线命名

### 数据类型

Java 语言是静态类型的语言，这意味着所有的变量必须先声明再使用。一个变量的数据类型定义了它的值是什么类型。

Java 基本类型由 Java 语言预先定义，并由保留关键字命名，基本类型的值是不与其它基本类型的值共享状态的。Java 有八种基本数据类型，其它统称为引用类型（即对象，字符串类型 String 虽然比较像基本数据类型，它也是对象）：

| 数据类型 |          | 简述                                                         |           长度范围           | 类变量默认值（使用局部变量必须赋值） | 特殊介绍                                                     |
| :------: | -------- | ------------------------------------------------------------ | :--------------------------: | ------------------------------------ | ------------------------------------------------------------ |
| 基本类型 | byte     | 字节数据类型是 8 位带符号的二进制补码整数                    |           -128~127           | 0                                    | 它的特殊长度限制可以用来节省内存                             |
|          | short    | 短数据类型是 16 位带符号的二进制补码整数                     |         -32768~32767         | 0                                    | 比 byte 大，它的特殊长度限制可以用来节省内存                 |
|          | int      | int 数据类型是一个 32 位带符号的二进制补码整数               |          -231~231-1          | 0                                    | Java8 新增的包装类型 Integer 类可以将 int 类型用作表示无符号的 32 位整数（0~232-1），并且 Integer 类提供了无符号整数的算数运算方法（ 如 compareUnsigned, divideUnsigned） |
|          | long     | long 数据类型是64位二进制补码整数                            |          -263~263-1          | 0L                                   | Java8 新增的包装类型 Long 类可以将 long 类型用作表示无符号的 64 位整数（0~264-1），并且 Long 类提供了无符号整数的算数运算方法（ 如 compareUnsigned, divideUnsigned） |
|          | float    | float 数据类型是单精度 32 位 IEEE 754 浮点数                 |                              | 0.0f                                 | 不能用于精确值（如货币），需要使用 BigDecimal 类来操作精确值 |
|          | double   | double 数据类型是双精度 64 位 IEEE 754 浮点数                |                              | 0.0d                                 | 不能用于精确值（如货币），需要使用 BigDecimal 类来操作精确值 |
|          | boolean  | boolean 数据类型用来表示一位信息（是/否）的标记，但是它的 size 不是精确定义的 |                              | false                                |                                                              |
|          | char     | char 数据类型是单个 16 位的 Unicode 字符                     | 0~65535（'\u0000'~'\uffff'） | 0                                    | 使用单引号表示                                               |
| 引用类型 | 类、接口 |                                                              |                              | null（只有引用类型可以表示 null 值） | String（字符串）类型使用双引号表示；.class 结尾的对象的类型，表示该类的类型 |
| 数组类型 |          |                                                              |                              |                                      |                                                              |
| null类型 |          |                                                              |                              |                                      |                                                              |

通常我们使用的都是十进制数，声明一个 long 类型的数值需要加 L（如 long i = 10L），声明一个 float 类型的数值需要加 F 或 f（如 float f = 10.0f）。整数默认就是 int 类型，浮点数默认是 double 类型（也可以加 D 或 d 表示）。如果需要使用数字系统，可以使用前缀 0x 表示十六进制，前缀 0b 表示二进制。

值得注意的是，JDK 7 及以后的版本中，我们可以在两个相邻的数字之间使用下划线 _ 来分割数字（如 long l = 1000_000_000L），以直观显示（并无其它用途）。

数组是一个容器对象，它包含固定数量的单个类型的值，数组创建时即指定了数组的长度，一经创建长度不可改变。

声明一个数组建议使用这种方式`int[] arr;`（类型和方括号标识一起出现），通过数组下标来操作数组，下标从 0 开始。

```java
// 声明数组
int[] arr0;

// 使用 new 关键字创建数组并初始化长度
int[] arr1 = new int[10];

// 声明数组并指定默认值（同时也指定了长度）
int[] arr2 = {1,2,3,4,5};

// 多维数组，数组嵌套
int[][] arr3 = new int[2][2];

// 数组拷贝（需要指定源数组下标从 srcPos 开始的 length 长度，复制到 destPos 开始的目标数组）
System.arraycopy(Object src, int srcPos, Object dest, int destPos, int length);
```

在 java.util.Arrays 类中有很多操作数组的方法，比如：

- 二分搜索 binarySearch
- 数组比较异同 equals
- 数组填充 fill
- 数组排序 sort（JDK 8 添加 parallelSort，在多处理器系统上并行排序大数组更快）

### 操作运算符

运算符一览：

![image.png](https://pycrab.github.io/KeepJava/assets/media/jdk-introduction-image11.png)

特殊要点：

- 建议使用 ? : 操作符替代 if-else if-else，使得代码可读性更高
- instanceof 运算符将对象与指定类型进行比较，可以用它来判断一个对象是某个类的实例，还是实现某个接口的实例，或者是子类的实例
- 作用于整数的按位和移位操作运算符（~ ^ & | << >>）不常用，但在某些时候很有用

### 表达式、语句和块

这里基本没啥讲的，表达式是变量、运算符和方法调用组成的构造，其结果是单个值；一条语句构成一个执行单元；用一对花括号表示一个块，可以用在单个语句的任何地方。

### 控制流语句

- 条件控制
  - if-else 用于边界条件控制
  - switch 用于测试单个整数或枚举或 String 表达式（JDK 8）

- 循环控制
  - while 和 do-while 主要区别是表达式先后执行
  - for 循环
    - 基本 for：for(int i = 0; i< 10; ++i)，根据是否需要使用循环变量i来决定其初始化的位置
    - 增强 for：for(type var : arrays)，用于数组和集合的循环迭代

- 分支控制
  - break，不带标签默认跳出一层循环；带标签，跳出循环至标签位置（跳出多重循环）
  - continue，跳过一次循环（非一层）
  - return，结束方法调用，返回方法被调用的地方。