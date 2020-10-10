---
title: Java 泛型
description: Java 泛型
meta:
  - name: keywords
    content: Java 泛型
tags: ['Java 泛型']
prev: ../exceptions/
next: ../collection/
---

## 泛型概念

### 泛型是什么

简言之，泛型是一种类型的抽象，它允许类型（类、接口）作为定义类、接口和方法的参数。使用泛型，我们可以通过这种强类型检查在 Java 编译阶段就发现错误，而不是等到运行时阶段（编译阶段检查并处理错误更容易点儿）；可以避免类型强转可能引发的运行时错误；可以实现一些通用的模板方法，并且它是类型安全和易读的。这三点一开始可能并不明晰，但是在之后的阅读中会深有体会。

### 泛型命名规范

- T - Type
- S,U,V etc. - 2nd, 3rd, 4th types
- E - Element (used extensively by the Java Collections Framework)
- N - Number
- K - Key
- V - Value

## 类型推断

Java编译器通过类型推断算法来判断类型。下面是具体示例：

```java
/**
 * 泛型声明
 */
public class Demo<S> {
    // 1、已知泛型类型（泛型类 S 声明），可以直接使用此泛型类型
    public S getClassType(S s) {
        return s;
    }

    // 2、新的泛型方法，需要使用 <> 声明泛型类型 T
    <T> T getMethodType(T t1, T t2) {
        return t2;
    }

    public Demo(){}
    
    // 3、声明泛型构造器 X
    public <X> Demo(X x) {
        super();
    }

    public void setList(List<String> list) {
    }
}

public class Test {
    /**
     * 类型推断示例
     */
    public void infer() {
        // 1、实例化泛型类
        Demo<String> stringDemo = new Demo<String>(); // JDK 7 以前需使用尖括号声明泛型类类型
        Demo<String> stringDemo2 = new Demo<>(); // JDK 7 及以后可以省略泛型类类型

        // 2、类型推断会自动选择最适合的类型
        Serializable methodType = stringDemo.getMethodType("1", 2); // 这里传入两个不同类型的值，它返回两个类型公共的父类型

        // 3、泛型构造器，根据参数类型来推断类型
        Demo<String> stringDemo3 = new Demo<>("str"); // JDK 7 及以后可以省略泛型类类型
        
        // 4、泛型方法，根据参数值类型推断类型
        String classType1 = stringDemo.<String>getClassType("1"); // 泛型类型可省略
        String classType2 = stringDemo.getClassType("1");

        // 5、根据目标类型推断类型(这里目标类型为值为 String 的 List)
        stringDemo.setList(Collections.<String>emptyList()); // JDK 8 以前需要指明泛型类型
        stringDemo.setList(Collections.emptyList()); // JDK 8 及以后可以省略泛型类型
    }

    // 6、根据返回值类型推断类型
    public List<String> getList() {
        return Collections.emptyList();
    }
}
```

## 类型传递

泛型类型也支持通过继承泛型父类或者实现泛型接口来传递泛型类型，比如`ArrayList<T>`继承自`List<T>`。

泛型类型也支持类似多态的类型转换，只要类型兼容，则可以将子类类型赋值给父类类型，比如以下：

- `Demo<Number> demo = new Demo<>(new Integer(1));`
- `List<? extends Integer> intList = new ArrayList<>(); List<? extends Number>  numList = intList;`

## 有界类型

可以使用 extends 关键字来限制类型为某个类的子类或接口的实现类，如`<T extends A>`。

- 如果声明多个限制，要保证顺序，先是类，然后是接口，如`<T extends A & B & C>`，A 代表某个类 A，在接口 B 和接口 C 前面声明
- 比如如果要比较两个泛型对象的大小，不能直接使用操作运算符，但是可以声明是 Comparable 泛型接口的子类型`<T extends Comparable<T>>`，然后就可以使用 compareTo 方法来比较两个泛型对象的大小了

## 通配符

类型通配符 ? 通常作为参数、属性或局部变量的类型。它和类型参数还是有区别的，通用模板方法等使用显式类型参数来表示方法的参数类型和返回值类型的依赖性，如果没有这种依赖性，则应该使用更灵活的子类型化——通配符。

### 上界通配符

- 上界通配符用来放宽对变量的限制，表示可接受的类型为未知类型的子类型或其实现类
- 使用方式为`<? extends ParentType>`

### 无界通配符

- 表示未知类型，
- 使用方式为`<?>`
- 适用场景：
  - 可接受 Object 类型的方法
  - 方法不依赖于泛型类型，比如只返回集合元素的个数

### 下界通配符

- 表示可接受的类型为未知类型的超级类型
- 使用方式为`<? super SubType>`

### 通配符捕获

当我们直接处理未知类型的 <?> 的参数时，编译器会提示类型不兼容`capture of ?`，这时候我们可以通过特殊方法将未知类型 ? 转化为泛型类型，这种方式将通配符的未知类型作为普通泛型类型使用。示例：

```java
void foo(List<?> list) {
    transfer(list);
}

<T> void transfer(List<T> list) {
    list.set(0, list.get(0));
}
```

### 通配符疑点

含有通配符 ? 定义的 List，不能直接插入除 null 以外的元素，因为任何类型的值都可以为 null，插入一个元素到一个未知类型的集合中，这是不安全的，所以，你可以执行 clear 方法或者使用迭代器执行 remove 方法，或者通过捕获通配符来插入从该集合读取的元素。

### 通配符使用指南

入操作的变量，形如输入流，作为输入源；出操作的变量，形如输出流，作为输出源

- 表示入操作的变量，需要时应使用上界通配符
- 表示出操作的变量，需要时应使用下界通配符
- 使用 Object 类的方法访问表示入操作的变量，应使用无界通配符
- 如果一个变量进行出入两种操作，则不要使用通配符
- 作为返回类型使用，应使用上界通配符，来给调用者更大的灵活性
- 仅作为参数使用，应使用下界通配符

## 类型擦除

Java 引入泛型以便在编译期提供更严格的类型检查并支持泛型编程。Java 编译器通过类型擦除来实现泛型，确保类型擦除不会为参数化类型产生新类（不会产生运行时开销）。具体操作：

- 对于无限类型的方法参数或泛型类型，Java编译器会将其类型替换为边界类型或者 Object 类型
- 必要时插入类型转换来保证类型安全
- 生成桥方法以保留扩展泛型类型的多态性

注意事项：

- 防止产生堆污染带来的类型转换异常（ClassCastException）
- 避免未经检查的警告，明确指明类型

## 泛型使用限制

1. 不能将泛型类型实例化为基本类型，而应该实例化为基本类型的包装类型。
2. 泛型类不能直接或间接继承 Throwable 类；方法不能捕获泛型异常类型的实例，但是可以 throws 抛出此类型实例。
3. 以泛型参数类型作为参数列表的方法，不能按参数类型重载。
4. 要特别注意的是，泛型可以说是一种规范，它通过强制编译期错误来避免可能的运行时错误。
5. 泛型类相当于对不同的参数提供相同的行为，泛型参数并没有改变类的类型，它代表的是类的对象的类型。泛型类在所有实例中是共享的，比如`new ArrayList<>("1").getClass() == new ArrayList<>(1).getClass()`一直为 true。由于类变量和类方法是类的实例所共有的，所以对于（static 声明）静态代码块及类变量和类方法声明为泛型类型是不合法的（不同泛型参数的实例会对静态变量进行修改，导致堆污染）。
6. 不同泛型参数的实例之间是不能直接 Casts 强转的，但是原始类型可以强转为泛型类型，但是这是不安全的，会提示未经检查的警告。
7. 不能使用 instanceof 运算符来判断某个实例是否为泛型类的实例，因为运行时进行类型擦除，不会去比较泛型类型，只会比较类类型的关系，但是可以判断某个实例是否为无界通配符修饰的类，如 List<?>，因为无界通配符表示未知的类型。