---
title: Java 发展简史
description: Java 发展简史
meta:
  - name: keywords
    content: Java 发展简史
tags: ['Java 发展简史']
prev: ../introduction/
next: ../object/
---

## Java 版本历史

​		发布于 1996 年的 JDK 1.0，今年（2020年）已经更新到~~第十四个版本（JDK 14）~~ 第十五个版本（JDK 15）了。

​		看过 Java 相关书籍的小伙伴肯定都知道，开篇先讲 Java 的版本迭代历史。[Java 各版本详细文档解析官网地址](https://docs.oracle.com/en/java/javase/index.html) 从 JDK 7 开始发布的版本都有对应的文档，这里汇总一下：

| 版本号         | 更新内容                                                     |
| :------------- | :----------------------------------------------------------- |
| JDK1.0         | JDK+JRE；Java 虚拟机，Applet，AWT 等                         |
| JDK1.1         | 内部类，反射；JAR 文件格式，JDBC，JavaBeans，RMI             |
| JDK1.2         | 划分 J2EE，J2SE，J2ME；Collections 集合类，strictfp 关键字；JSP，Servlet，EJB 规范 |
| JDK1.3         | 默认 Hotspot 虚拟机；Timer 类及数学运算类库，JNDI 服务等     |
| JDK1.4         | 正则表达式，异常链，断言，NIO，日志类，XML 解析器和XSLT 转换器；这时期诞生了大量优秀的开源框架（Spring，Hibernate，Struts 等），企业应用服务器（WebLogic，JBoss，WebSphere） |
| JDK5           | 自动拆箱和装箱，泛型，动态注解，枚举，可变长参数，foreach 循环，静态导入，元数据，注释，concurrent 并发包，改进了JMM（Java 内存模型）；更名 Java SE 5.0 |
| JDK6           | 更改命名 Java SE，Java EE，Java ME；提供动态语言支持，改进虚拟机（锁与同步、垃圾收集、类加载） |
| [JDK7](./jdk7) | G1 收集器，二进制整数，Switch 语句支持字符串，菱形语法，多异常捕捉，try-with-resources 自动关闭资源 |
| [JDK8](./jdk8) | Lambda 表达式，Stream 流式编程                               |
| [JDK9]()       | 强大了模块化系统，G1 垃圾收集器；小的改进（try-with-resources 语句增强，菱形语法可以在匿名内部类中使用，@SafeVarargs可以用在私有实例方法上，下划线命名不再合法，支持私有的接口方法） |
| [JDK10]()      | 引入局部变量类型推断；包垃圾收集器，GC 改进，性能提升，线程管控 |
| [JDK11]()      | ZGC，Http Client；增强局部变量类型推断；Lambda 参数的本地变量语法 |
| [JDK12]()      | 预览 switch 表达式语句                                       |
| [JDK13]()      | 预览文本块；预览 switch 表达式语句                           |
| [JDK14]()      | 引入 switch 表达式语句；预览 instanceof 模式匹配；预览 Record 类；预览文本块 |
| [JDK15]()      | 引入文本块；预览 instanceof 模式匹配；预览 Record 类；预览 Sealed 类 |
| ......         |                                                              |

## 文件与目录

### JDK 8 及以前

JDK 8 及以前的版本的文件目录分为 JDK 和 JRE ：

![image.png](https://pycrab.github.io/KeepJava/assets/media/jdk-version-image1.png)

![image.png](https://pycrab.github.io/KeepJava/assets/media/jdk-version-image2.png)

![image.png](https://pycrab.github.io/KeepJava/assets/media/jdk-version-image3.png)

[官网文档](https://www.oracle.com/java/technologies/javase/jdk8-readme.html) 这样介绍文件目录：

- JDK 目录
  - bin/ 目录，包含用于开发、执行、调试、和记录 Java 程序的开发工具
  - include/ 目录，包含支持使用 Java 本机接口，JVM 工具接口和 Java 平台的其他功能进行本机代码编程的 C 语言头文件
  - jre/ 目录，供 JDK 使用的 Java 运行时环境（JRE）的实现
  - lib/ 目录，开发工具所需的其他类库和支持文件
  - src.zip 文件，组成 Java 核心 API 的所有类的 Java 编程语言源文件（即 java.* ，javax.* 和某些 org.* 程序包的源文件，除了 com.sun.* 程序包的源文件）

- JRE 目录
  - 即 JDK 目录中的 jre/ 目录

### JDK 9 及之后

从 JDK 9 开始，模块化系统，文件目录也按模块划分，顶层只有一个目录：

![image.png](https://pycrab.github.io/KeepJava/assets/media/jdk-version-image4.png)

![image.png](https://pycrab.github.io/KeepJava/assets/media/jdk-version-image5.png)

[官网文档](https://www.oracle.com/java/technologies/javase/jdk14-readme-downloads.html) 这样介绍文件目录：

- bin/ 目录，包含 Java 运行时环境（JRE）的实现及用于开发、执行、调试、和记录 Java 程序的开发工具，是原来的 bin/ 目录和 jre/ 目录的合集
- conf/ 目录，包含用户可配置选项的文件，可以编辑此目录中的文件，以更改 JDK 的访问权限，配置安全算法并设置 Java 密码学扩展策略文件，这些文件可用于限制 JDK 的加密强度
- include/ 目录，支持使用 Java 本机接口和 Java 虚拟机（JVM）调试器接口进行本机代码编程的 C 语言头文件
- jmods/ 目录，jlink 用于创建自定义运行时的已编译的模块
- legal/ 目录，每个模块的许可证和版权文件
- lib/ 目录，JDK 所需的其他类库和支持文件。这些文件不供外部使用

最后再附上一份官方发布更新内容快链（[JDK发布更新摘要](http://oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)）。
