---
title: UNIX IO 模型
description: UNIX IO 模型
meta:
  - name: keywords
    content: UNIX IO 模型，Java IO，BIO 阻塞 IO，NIO 非阻塞 IO，IO 多路复用，事件驱动 IO，信号启动 IO，异步IO
tags: ['Java IO', 'UNIX IO 模型', 'BIO 阻塞 IO', 'NIO 非阻塞 IO', 'IO 多路复用', '事件驱动 IO', '信号启动 IO', '异步IO']
prev: ./
next: ./file-copy
---

绝大多数 IO 操作都涉及数据在内核空间和用户空间之间的拷贝，这个过程是由操作系统底层调用来完成。

::: tip 同步与异步，阻塞与非阻塞

传统的 IO 读操作主要分为两步：1、发起 read() 请求直到操作系统内核准备好数据；2、数据从内核空间拷贝到用户空间。

同步与异步指的是第一步数据准备好后，第二步读操作是同步还是异步。

阻塞与非阻塞指的是执行 IO 的线程发起读请求操作后，当前线程继续执行其它操作还是阻塞等待返回。

:::

据此操作系统实现了以下五种 IO 模型：

## BIO : 阻塞 IO

![阻塞 IO 模型.png](https://pycrab.github.io/KeepJava/assets/media/jdk-io-model1.png)

阻塞 IO 模型指的是，应用进程发起 recvfrom 系统调用后，在数据准备阶段和数据拷贝阶段都是阻塞的。

## NIO : 非阻塞 IO

![非阻塞 IO 模型.png](https://pycrab.github.io/KeepJava/assets/media/jdk-io-model2.png)

非阻塞 IO 模型指的是，应用进程发起 recvfrom 系统调用后，内核会立即返回 EWOULDBLOCK，之后应用进程会不断轮询调用 recvfrom，直到状态不为 EWOULDBLOCK 之后，表示数据已经准备好了，然后进行数据拷贝，此阶段数据拷贝仍是阻塞的。

## IO 多路复用

![IO 多路复用模型.png](https://pycrab.github.io/KeepJava/assets/media/jdk-io-model3.png)

多路复用模型指的是，应用进程首先发起 select/poll/epoll 系统调用，将请求注册到一个单独线程中，由这个线程去轮询内核是否准备好数据，准备好之后回调应用进程，应用进程发起 recvfrom 系统调用来进行数据拷贝。该模型轮询的线程和数据拷贝阶段是阻塞的（epoll 系统调用通过事件驱动的方式而不是轮询来判断数据是否准备好，性能更高）。

## 信号驱动 IO

![信号驱动 IO 模型.png](https://pycrab.github.io/KeepJava/assets/media/jdk-io-model4.png)

信号驱动 IO 模型指的是，应用进程首先发起 sigaction 系统调用注册一个信号处理函数，当数据准备好后会生成一个信号通知应用进程发起 recvfrom 调用拷贝数据，拷贝数据阶段应用进程仍是阻塞的。

## AIO : 异步 IO

![异步 IO 模型.png](https://pycrab.github.io/KeepJava/assets/media/jdk-io-model5.png)

异步 IO 模型真正实现了异步非阻塞，应用进程告知内核启动一个操作，内核准备好数据后自动进行数据拷贝，拷贝完成后通知应用进程。

## 对比

>  前四种 IO 模型都是同步的，因为在从内核空间拷贝数据到用户空间的过程中应用进程都是阻塞的，只有异步 IO 模型是异步非阻塞的。

> IO 多路复用类似于非阻塞 IO，只是新启动了一个线程去轮询，解放了应用线程，适用于处理大量线程连接。

> 信号驱动 IO 模型是告知应用进程数据已经准备好了，异步 IO 模型是告知应用进程数据已经拷贝完成了。

::: danger 参考文献

- 《Netty 权威指南》这本书真心不错，推荐阅读。本文图片来源此书。

- 知乎 Wang Young’s Hub [IO模型和基于事件驱动的IO多路复用模式](https://zhuanlan.zhihu.com/p/161357177)

:::