---
title: Java 注解
description: Java 注解
meta:
  - name: keywords
    content: Java 注解
tags: ['Java 注解']
prev: ../reflection/
next: ../exceptions/
---

## 注解概念

注解是元数据的一种，它提供给程序一些数据，注解对它注释的代码没有直接的影响。

## 元注解

元注解是用于注释注解的注解，它们在 java.lang.annotation 中定义。他们是：

- **@Documented**，声明使用 Javadoc 工具收录该注解注释的注解（默认定义的注解不收录）。

- **@Retention**，声明该注解作用于什么时期，其值有以下几种：

  - RetentionPolicy.*SOURCE*，表示只在源代码阶段起作用
  - RetentionPolicy.*CLASS*，表示只作用到编译阶段
  - RetentionPolicy.*RUNTIME*，表示作用到运行时阶段

- **@Target**，声明该注解作用于 Java 的哪个元素上，允许选择多个。

  JDK 8 之前，注解只能作用于声明上；JDK 8 开始新增两种类型，可以作用于任何类型使用上，比如创建类的 new 表达式，强转 casts 语句，implements 实现语句，throws 语句上，，以进行更加强壮的类型检查，我们可以自己开发或者使用 [第三方插件](https://checkerframework.org/) 来集成更加强大的检查，让程序更强大，并减少错误，比如使用 @NotNull 来检查可能的空指针异常。其值有以下几种：

  - ElementType.*ANNOTATION_TYPE*，可以作用于注解类型
  - ElementType.*CONSTRUCTOR*，可以作用于构造器上
  - ElementType.*FIELD*，可以作用于类属性上
  - ElementType.*LOCAL_VARIABLE*，可以作用于局部变量上
  - ElementType.*METHOD*，可以作用于方法上
  - ElementType.*PACKAGE*，可以作用于包上
  - ElementType.*PARAMETER*，可以作用于方法形式参数上
  - ElementType.*TYPE*，可以作用于类、接口、注解、枚举的声明上
  - ElementType.*TYPE_PARAMETER，*（JDK 8 引入）可以作用于类型参数上
  - ElementType.*TYPE_USE，*（JDK 8 引入）作用于类型的使用上

- **@Inherited**，该注解只用于父类声明上，表示字类可以从父类继承并使用该注解，且只能标注于类上。

- **@Repeatable**，（JDK 8 引入）声明该注解可以在一处使用多次。

## 预定义注解

在 java.lang 包中预定义了几个注解，他们是：

- @Override，该注解告诉编译器，其注解的方法是重写父类的方法
- @Deprecated，该注解表示注释的元素已弃用，未来不再使用，编译器也会发出警告，使用该注解建议配合文档注释中的 @deprecated 注解使用（文档注释中的该注解小写）
- @SuppressWarnings，该注解告诉编译器忽略指定的警告，比如`@SuppressWarnings({"unchecked", "deprecation"})`
- @SafeVarargs，该注解告诉编译器，注释的方法或构造器的参数是安全的，忽略 unchecked 警告
- @FunctionalInterface，（JDK 8 引入）该注解表示注解的元素类型声明为方法接口。

以上注解中，只有 @Deprecated 在运行时可用。

## 声明注解

1、注解的声明使用 @interface，属性可以提供默认值，示例：

```java
@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Author{
    String name() default "";
}
```

通过`@Author(name = "张三")`的形式来使用，如果只有一个属性，可以省略属性名，比如`@Author("张三")`。

2、JDK 8 引入的重复注解声明麻烦点，需要声明一个容器注解来承载多个注解，且容器注解的 @Target 声明应为单个注解的子集。示例：

```java
/**
 * 声明单个注解
 */
@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(Tasks.class)
public @interface Task {
    String name();
}

/**
 * 声明放置单个注解的容器注解
 */
@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Tasks {
    Task[] value();
}
```