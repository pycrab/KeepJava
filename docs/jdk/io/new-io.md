---
title: Java New IO 类库
description: Java New IO 类库
meta:
  - name: keywords
    content: Java New IO 类库
tags: ['Java New IO 类库']
prev: ./
next: ./new-io2
---

## 缓冲区 Buffer

缓冲区是基本类型（除了 boolean 类型）的元素的线性序列，数据的读写都是对缓冲区的操作。以下缓冲区都是抽象类：

![缓冲区类图.png](https://pycrab.github.io/KeepJava/assets/media/jdk-io-new-io-buffer1.png)

缓冲区除了放置基本元素，还有四个控制读写的属性：

- capacity，缓冲区的总容量
- limit，缓冲区内可以操作的数据的总量
- position，当前读写的位置，默认是 0
- mark，标记位置，用来多次读取数据时重置 position，默认是 -1

缓冲区通过这四个位置属性来控制读写，其中，它们是严格遵守 mark <= position <= limit <= capacity 的，并且 position >= 0。

缓冲区提供的方法，部分支持链式调用，如下：

- 创建缓冲区

  ```java
  // 在 Java 堆内存中创建缓冲区
  // 第一种：通过 allocate 静态方法创建空缓冲区，其中，capacity 会被初始化为指定大小，limit 初始化为 capacity 大小，position 初始化为 0，mark 未定义。每个位置的值都初始化为 0
  final IntBuffer intBuffer = IntBuffer.allocate(100); // pos=0 lim=100 cap=100
  
  // 第二种：通过 wrap 静态方法根据数组创建缓冲区，其中，capacity 和 limit 会初始化为数组大小，position 初始化为 0，mark 未定义。
  final CharBuffer charBuffer = CharBuffer.wrap(new char[]{'a', 'b', 'c', 'd'}); // pos=0 lim=4 cap=4
  
  // 在本机内存直接创建缓冲区，在该缓冲区中，JVM 尽最大努力直接调用操作系统底层 IO 进行读写，而不复制到中间缓冲区。
  // 第一种：通过 allocateDirect 静态方法直接创建空缓冲区
  final ByteBuffer byteBuffer = ByteBuffer.allocateDirect(10); // pos=0 lim=10 cap=10
  
  // 第二种：通过 FileChannel 的 map 方法将文件直接映射到内存区域 MappedByteBuffer
  
  // 通过 asReadOnlyBuffer() 方法将缓冲区可以标记为只读缓冲区
  ```

- 读写缓冲区，当进行读写操作时，position 会往后移动直到最大为 limit。对缓冲区的读写都是按队列先进先出，是单向的。

  ```java
  // 通过 get() 方法及其重载方法读
  get();
  get(int[]);
  
  // 通过 put() 方法及其重载方法写
  intBuffer.put(1).put(2);
  
  // 需要注意的是，对指定下标进行读写时，position 是不变的。
  // 如果下标位置不可用，则会抛出 IndexOutOfBoundsException 异常；如果对只读缓冲区写入，会抛出 ReadOnlyBufferException 异常。比如:
  intBuffer.get(5);
  intBuffer.put(5, 1);
  ```

- 属性重置方法

  ```java
  // 转为写模式（清空操作）：初始化缓冲区，将 position 置为 0，limit 置为 capacity，mark 置为 -1
  intBuffer.clear();
  
  // 转为读模式：将 position 置为 0，limit 置为 position，mark 置为 -1
  intBuffer.flip();
  
  // 倒带操作：将 position 置为 0，mark 置为 -1
  intBuffer.rewind();
  ```

- 标记 / 重置缓冲区

  ```java
  // 标记当前位置，将 mark 置为 position
  intBuffer.mark();
  
  // 回到标记的位置，将 position 置为 mark
  intBuffer.reset();
  
  // 注意，一定先 mark 标记后才能 reset，否则会报 InvalidMarkException 异常，因为 mark 默认 -1
  ```

- 转换缓冲区

  ```java
  // ByteBuffer 提供了 asXXX 方法可以转换为 其它类型的缓冲区，如 asCharBuffer()
  ```

## 通道 Channel

 通道是用来连接内存和磁盘文件（或外部设备、网络、程序）的。它主要有四个抽象类：

![通道 Channel 类图.png](https://pycrab.github.io/KeepJava/assets/media/jdk-io-new-io-channel1.png)

### 文件 IO 通道

文件通道 FileChannel 是用于读写、映射和操作文件的通道。有三个类提供了打开文件通道的 getChannel() 方法，分别是：

- 打开读取通道：FileInputStream

- 打开写入通道：FileOutputStream

- 打开随机访问通道：RandomAccessFile

  - 根据随机访问文件的模式 Mode，可以指定是可读 r、可读写 rw、读写并将文件内容更改同步到磁盘 rwd、读写并将文件内容及元数据的更改同步到磁盘 rws。

FileChannel 类本身提供了 `open(Path path, OpenOption... options)` 方法根据文件 Path 打开一个文件通道，使用 options 指定文件通道类型。

FileChannel 提供的方法如下：

- 传统文件读写

  - 从文件读出数据并读入缓冲区 `read(ByteBuffer dst)`

  - 从缓冲区读出数据并写入文件 `write(ByteBuffer src)`

    使用通道和缓冲区进行一次文件传统读写的示例如下：

    ```java
    final FileChannel inChannel = new FileInputStream("test.txt").getChannel();
    final FileChannel outChannel = new FileOutputStream("task.txt").getChannel();
    final ByteBuffer buffer = ByteBuffer.allocate(1024);
    while (inChannel.read(buffer) != -1) {
        buffer.flip(); // 初始化为读模式
        outChannel.write(buffer);
        buffer.clear(); // 初始化为写模式
    }
    buffer.clear();
    inChannel.close();
    ```

- 基于 sendfile 系统调用的文件拷贝

  - 将当前通道内的文件写入目的通道 `transferTo(long position, long count, WritableByteChannel target)`
  - 将源通道的数据读入当前文件通道 `transferFrom(ReadableByteChannel src, long position, long count)`

- 基于 mmap 内存映射的文件拷贝

  - `map(MapMode mode, long position, long size)` 方法将文件从 position 位置开始的 size 大小的块映射为内存区域。适用于大文件读操作，如 MD5 校验。

### 网络 IO 通道

通过上面的 Channel 继承类图我们可以看到，DatagramChannel、SocketChannel 和 ServerSocketChannel 都继承了 SelectableChannel，这三个通道同时也实现了 NetworkChannel 接口，所以说网络 IO 就是依靠这三个通道通信。它们是：

- 用于 UDP 网络 IO 的数据报通道 DatagramChannel
- 用于  TCP 网络 IO 的面向流的客户端通道 SocketChannel 和面向流的服务端通道 ServerSocketChannel

打开网络 IO 通道的方式有：

- 通道的 `open()` 方法
- SelectorProvider 类提供的静态方法，它等同于通道的 `open()` 方法
  - `openDatagramChannel()`
  - `openSocketChannel()`
  - `openServerSocketChannel()`
- 传统流的 `getChannel()` 方法
  - DatagramSocket #getChannel()
  - Socket #getChannel()
  - ServerSocket #getChannel()

SelectableChannel 抽象类提供了 `configureBlocking(boolean block)` 方法开启非阻塞模式，使用非阻塞的多路复用更有效（需要在注册之前开启）。

::: warning 关闭通道

关闭通道使用 `close()` 方法，关闭后不能操作，否则会抛异常 ClosedChannelException。

:::

## 选择器 Selector

选择器 Selector 是 SelectableChannel 的多路复用器，也就是说选择器 Selector 只用于以上三种网络通信。如何使用选择器呢？

1、首先，开启一个选择器

有两种方式：

- Selector 类的静态方法 `open()`

- SelectorProvider 类实例的 `openSelector()` 方法

2、将通道注册到选择器上

SelectableChannel 抽象类提供了 `register(Selector sel, int ops, Object att)` 方法将通道注册到选择器上，该注册方法需要提供要注册的选择器、目标操作、和一个附加对象（可为 null）。其中，目标操作 ops 主要有四类：

- *SelectionKey.OP_READ*，通道已准备好进行读取
- *SelectionKey.OP_WRITE*，通道已准备好进行写入
- *SelectionKey.OP_CONNECT*，通道已准备好进行连接
- *SelectionKey.OP_ACCEPT*，通道已准备好接受其它连接

3、选择器轮询，获取满足目标操作的 SelectionKey 的合集

调用 Selector 的 `selectedKeys()`方法可以获得已就绪的通道的 SelectionKey 集合。

Selector 选择器持有代表已注册通道的选择键 SelectionKey 的三种集合，并提供方法来获取：

- keys set ：所有 SelectionKey 的集合，只有键失效和通道关闭才会从此集合删除，通过 `keys()` 方法获取
- selected-key set ：检测就绪的 SelectionKey 的集合，通过 `selectedKeys()` 方法获取
- cancelled-key set ：SelectionKey 已取消但是对应的通道未关闭的 SelectionKey 的集合，无法获取

4、通过 SelectionKey 获得对应的通道，进行 IO 操作

register 注册方法会返回注册好的 SelectionKey 对象，该对象有以下方法来探测通道及状态：

- 获取通道 `channel()`
- 对应通道是否可读 `isReadable()`
- 对应通道是否可写 `isWritable()`
- 对应通道是否已连接 `isConnectable()`
- 对应通道是否准备好接受新的 socket 连接 `isAcceptable()`

::: tip IO 多路复用

当已注册的通道满足目标操作时，Selector 选择器通过轮询会获得目标操作的 SelectionKey 选择键集合，通过选择键就可以获得对应的通道，进而执行通道的 IO 操作。

:::

## 管道 Pipe

传统 IO 中使用管道流进行线程之间的 IO 通信，Java New IO 提供了 Pipe 类进行线程间的通信。

Pipe 管道提供了一对单向的通道，一个是可写的 Pipe.SinkChannel 通道，一个是可读的 Pipe.SourceChannel 通道。

创建一个管道使用 `open()` 方法，获取通道通过管道实例的 `sink()` 方法和 `source()` 方法。

---

::: danger 参考文献

- 博客园 rickiyang [零拷贝(Zero-copy) 浅析及其应用](https://www.cnblogs.com/rickiyang/p/13265043.html)
- 知乎专栏 美团技术团队 [Java NIO 浅析](https://zhuanlan.zhihu.com/p/23488863)

:::