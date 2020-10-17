---
title: Java IO
description: Java IO
meta:
  - name: keywords
    content: Java IO
tags: ['Java IO']
prev: ../collection/
next: ../concurrency/
---

## [IO 模型](./io-model)

> 要弄懂 Java IO 类库，先了解下 UNIX 网络编程之五种 IO 模型。
>
> Java IO 类库是对操作系统底层调用的封装，了解了底层的 IO 模型，我们可以更快地理解 Java 是如何从传统的同步阻塞 IO，到 JDK 1.4 新增 New IO，到 JDK 7 新增 New IO 2 一步步演进的。

## [文件拷贝](./file-copy)

> 一起看看操作系统都提供了哪些文件拷贝的方式。后面会学习到 Java IO 类库中如何使用具体的拷贝方式，及在 Java 如何使用零拷贝技术。
>

## Java IO 类库

### [传统 IO](./io-streams)

> JDK 1.4 之前的传统 IO 操作类在 java.io 包中，包括文件 IO；对于 java.net 包中的网络 IO 也属于传统 IO。
>
> 传统 IO 使用流传输数据，流只能是是单向传输。
>
> 传统 IO 是同步阻塞的。
>

### [New IO](./new-io) <badge>JDK 1.4</badge>

> JDK 1.4 发布的 Java New IO 操作类在 java.nio 包中。
>
> Java New IO 将流分开，把数据和通道进行解耦，用缓冲区 Buffer 来放置数据，用通道 Channel 来输送数据。
>
> New IO 支持同步阻塞的 Channel，也通过 Selector 支持同步非阻塞的网络 IO 多路复用。Channel 还封装了操作系统通过内存映射和 sendfile 调用来拷贝文件的方式（零拷贝）。
>

### [New IO 2](./new-io2) <badge>JDK 7</badge>

> JDK 7 发布的 New IO 2，在 java.io 包（java.nio.file 包）中新增了异步 IO 操作类。
>
> New IO 2 提供了异步文件读写和网络通信的能力，是真正的异步非阻塞 IO （AIO）。 

## 流和通道转换

::: details Channels 类是流和通道的合集，它提供了静态方法在流和通道之间转换

- newInputStream(ReadableByteChannel ch)
- newOutputStream(WritableByteChannel ch)
- newReader(ReadableByteChannel ch, Charset charset)
- newWriter(WritableByteChannel ch, Charset charset)
- newChannel(InputStream in)
- newChannel(OutputStream out)
- newInputStream(AsynchronousByteChannel ch) <badge>JDK 7</badge>
- newOutputStream(AsynchronousByteChannel ch) <badge>JDK 7</badge>

:::

## [文件 IO 类库](./file-io)

> Java 提供了访问磁盘文件的类，有 JDK 7 之前的 java.io.File 类和 JDK 7 重新设计新增的 java.nio.file 包中的 Files 类和 Path 类。

## 网络 IO 设计模式

::: details 传统网络 IO 模式

一个客户端连接会启动一个线程处理，线程太多会占用大量资源；

使用线程池来优化，从线程池取空闲线程来处理，处理完后返还给线程池，使得线程可以重用；

但是如果是长连接，那么会导致长时间占用资源，导致新来的不可用，所以同步阻塞 IO 适合大量短连接应用。

:::



::: details 高性能的 Reactor 设计模式

每个客户端连接都注册感兴趣的事件到一个单独的 select 线程中，由这个 select 线程去轮询每个客户端注册的事件是否发生，当有事件发生时，告知客户端可以执行 IO，让客户端执行对应的事件（可以通过采用多线程或者线程池的方式优化）。这是典型的 IO 多路复用的实现。

:::



::: details 高性能的 Proactor 设计模式

每个客户端连接都注册感兴趣的事件到一个单独的 select 线程中，由这个 select 线程去轮询每个客户端注册的事件是否发生，当有事件发生时，操作系统内核去执行相应的 IO 操作，完成后通知客户端已经完成。这是典型的异步 IO 的实现。

:::