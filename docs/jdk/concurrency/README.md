---
title: Java 并发编程
description: Java 并发编程
meta:
  - name: keywords
    content: Java 并发编程
tags: ['Java 并发编程']
prev: ../io/
next: ../skill/
---

::: tip 致敬

学习 Java 并发编程首先要认识一下 Doug Lea，在源码阅读过程中，我们经常会看到一个作者的名字 `@author Doug Lea`，他编写的 java.util.concurrent 包在 Java 1.5 版本中引入，促进了 Java 的历史变革。

:::

## 进程和线程

::: details 进程和线程、并行和并发的概念

进程和线程的区别：在并发编程中，进程和线程是两个基本的执行单元。进程是 CPU 分配资源的基本单位，线程是 CPU 调度的基本单位。进程享有独立的内存空间，进程的多个线程共享该进程的资源、内存和打开的文件，这有利于线程之间的通信，但是可能会出问题。线程是轻量版的进程，创建一个线程要比创建一个进程需要更少的资源。获得资源的线程获取到时间片后即可被 CPU 调度执行，线程执行则其进程当然在执行。

并发和并行的区别：不管是多个处理器（多 CPU ）还是多个执行核心（多核），都可能实现程序并发执行，这主要依靠操作系统的调度。比如使用最广的时间片轮转调度算法，每个线程被分配一个时间片，当线程时间片使用完或者线程在时间片结束前阻塞或执行完毕，CPU 将保存该线程的状态并切换下一个线程执行。时间片往往设置地很短（毫秒），所以在一段时间内有多个线程执行（并发），而在一个时刻只有一个线程执行（并行）。

:::

## [线程基础](./thread)

> 介绍 Thread 类的基本属性和方法，及如何创建一个线程并启动。

## 线程安全

如果一个类设计成多线程可以正确访问，那么这个类就是**线程安全**的（thread - safe），否则就是**线程不安全**的（unsafe）。

由于一个进程内的线程共享进程的内存地址空间，这些线程都能访问共享变量及引用对象。而线程作为 CPU 调度的基本单位，运行时多个线程可能会交替执行，这样有可能产生**线程干扰**和**内存一致性**错误。

::: details 线程干扰的产生

示例一个计数器，一个线程加 100 次，一个线程减 100 次，最后结果却不一定是0。因为自增和自减不是原子性操作，它们实际执行三个步骤：先读取，进行加一/减一，再写入。由于 CPU 不确定的调度，两个线程可能在这三个步骤之间交叉执行，比如：

1、线程 1 读取（count = 0）

2、线程 1 加一（count = 1）

3、线程 2 得到 CPU 调度，线程 1 保存上下文暂停

4、线程 2 读取（count = 0）

5、线程 2 减一（count = -1）

6、线程 2 写入（count = -1）

7、线程 1 得到 CPU 调度，线程 2 保存上下文暂停

8、线程 1 写入（count = 1）

由于线程 2 的干扰导致这次执行结果本来应该是 0 但是却是 1。示例代码如下：

```java
public class Main {

    static class Counter {
        private int count = 0;

        public void increment() {
            count++;
        }

        public void decrement() {
            count--;
        }

        public void get() {
            System.out.println(count);
        }
    }

    public static void main(String[] args) {

        Counter counter = new Counter();
        new Thread(() -> {
            for (int i = 0; i < 100; ++i) {
                counter.increment();
                try {
                    // 为演示效果设置暂停一会
                    Thread.sleep(1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
        new Thread(() -> {
            for (int i = 0; i < 100; ++i) {
                counter.decrement();
                try {
                    Thread.sleep(1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();

        try {
            // main 线程等待异步线程执行完
            Thread.sleep(200);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        counter.get();
    }
}
```

:::

::: details 内存一致性错误的产生

假设线程 1 加一，由 main 线程读取 count 的值，但是因为 CPU 的调度，main 线程可能先于 线程 1 执行读取，导致和预想的不一致，这就产生了内存一致性错误。

导致内存一致性错误的原因很多，我们只需要知道避免产生内存一致性错误的关键是了解**happens - before 关系**（事前发生），事前发生关系就是指先发生的事件对于后发生的事件是可见的。

我们已知的当前线程调用 `join()` 方法时，join 之前的事件和当前线程 join 中的事件就构成了 happens - before 关系，或者说 join 中的事件 **happens before** join 之前的事件。  

:::

### [同步和锁](./lock)

> 在串行编程模型中，单个线程顺序执行是不会产生错误的，但是多个线程并发执行可能会引入非串行因素导致错误。
>
> 对于共享变量，只要通过同步进行协调，保证一个线程执行完访问，另一个线程才能访问，这样就能避免线程干扰。

### [CAS & AQS](./CAS-AQS)

> 

### [活跃性问题](./liveness)

> 多个线程访问共享资源，会进行竞争获取锁，那么就会产生活跃性问题，比如线程饥饿、活锁、死锁等。

### [对象共享](./sharing)

> 不是所有的操作都必须要同步，有些情况下多线程可以共享访问。

## [线程协调](./thread-coordinate)

> 当两个或多个线程之间需要合作时，就需要进行协调。最常见的协调就是守卫块，即一个线程通过轮询某个含有独占对象的条件，不成立时就释放锁等待，当条件成立时重新获取锁执行。如果不释放锁，那么线程一直占有锁，条件永远不会成立。

## [线程管理](./thread-manage)

> 通过对任务和线程执行的一步步带入，引出线程执行器的概念，进而学习线程池的具体类库。

---

::: danger 参考文献

- 首先通过 [廖雪峰的 Java 教程](https://www.liaoxuefeng.com/wiki/1252599548343744/1255943750561472) 对 Java 并发编程类库有个简单认识
- 结合 Oracle 官方 Java 教程 [Java 并发章节](https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html) 以及源码注释深入学习 Java 并发编程
- 通过《Java 并发编程实战》（Java Concurrency in Practice）这本书详细理解一些概念
- [Java 语言和虚拟机规范](https://docs.oracle.com/javase/specs/index.html) 官方下载链接

:::