---
title: IO Streams
description: IO Streams
meta:
  - name: keywords
    content: IO Streams
tags: ['IO Streams']
prev: ./
next: 
---

## 流的数据类型

Java 在内存中是以**字节**为存储单位的，读写数据也都是一个个字节按顺序读写，所以最基本的流就是字节流，所有与内存的操作最后都会转换为字节流。

java.io 包中主要有四个共两种抽象基类：以字节为单位的字节流和以字符为单位的字符流。我们知道，抽象基类只能被继承，无法实例化对象。

字节流主要用于处理原始数据，比如图像，要处理文档等字符类型要考虑字符流。

### 字节流

![字节流部分继承类.png](https://pycrab.github.io/KeepJava/assets/media/jdk-io-streams-bytes.png)

字节流提供的常用抽象方法如下：

- 输入流
  - read() 方法，每次读取一个字节并以 int 的形式返回值，如果没有字节可读则返回 -1
  - read(byte[]) 方法，每次读取指定个数的字节并放到缓存数组中，返回实际读取的字节数，没有字节可读返回 -1
  - close() 方法，关闭输入流，并释放该流关联的所有系统资源
  - transferTo(OutputStream out) 方法，将此输入流写入到指定输出流，默认使用缓冲区大小为 8M

  ::: warning 阻塞

  输入流在进行读取数据时，会阻塞到读取完成或者抛出异常。

  :::

- 输出流

  - write(int b) 方法，每次输出一个字节
  - flush() 方法，强制将缓冲区的数据输出
  - close() 方法，关闭输出流，并释放该流关联的所有系统资源

### 字符流

![字符流部分继承类.png](https://pycrab.github.io/KeepJava/assets/media/jdk-io-streams-characters.png)

字符流提供的抽象方法和字节流类似。

::: warning 流的关闭

字节流（InputStream、OutputStream）和字符流（Reader、Writer）都实现了 Closeable 接口中的 close() 方法，也就是说，打开的流都需要手动调用 close() 方法关闭，因为垃圾收集器只能回收内存中的对象，无法回收流。

Closeable 接口的 close() 方法可以执行多次，对已经关闭的资源是没有影响的，它是幂等的；而它的父类 AutoCloseable 接口的 close() 方法不是幂等的，多次执行可能产生副作用，所以要求实现 AutoCloseable 接口的类自己实现幂等。

:::

## 流的分类

继承自字节流类和字符流类的类分为以下几种，这里列出一些常见的：

### 节点流

节点流是真正处理数据的流，有以下几种：

#### 内存流

在内存中操作，不需要 close() 关闭的流。

- 字符串流

  StringReader 类读取字符串，StringWriter 类输出字符串。

  ```java
  try (final StringReader stringReader = new StringReader("Hello IO");
       final StringWriter stringWriter = new StringWriter()) {
      int read;
      while ((read = stringReader.read()) != -1) {
          stringWriter.write(read);
      }
      System.out.println(stringWriter.toString());
  } catch (IOException e) {
      e.printStackTrace();
  }
  ```

- 数组缓冲流

  内置缓冲数组的流，包含 ByteArrayInputStream 类、ByteArrayOutputStream 类、CharArrayReader 类、CharArrayWriter 类。

  ```java
  try (final ByteArrayInputStream inputStream = new ByteArrayInputStream(new byte[]{'H', 'E', 'L', 'L', 'O'});
       final ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
       final CharArrayReader reader = new CharArrayReader(new char[]{'你', '好'});
       final CharArrayWriter writer = new CharArrayWriter()) {
      inputStream.transferTo(outputStream);
      reader.transferTo(writer);
      
      System.out.println(outputStream.toString());
      System.out.println(writer.toString());
  } catch (IOException e) {
      e.printStackTrace();
  }
  ```

#### 文件流

文件流用于读写磁盘文件，使用完流需要 close() 关闭。

- 读取磁盘文件，支持指定字符集
  - FileInputStream 类和 FileReader 类
- 写入磁盘文件，支持指定字符集，和选择是否追加在末尾（默认覆盖文件）
  - FileOutputStream 类和 FileWriter 类

```java
try (final FileWriter writer = new FileWriter("test.txt", StandardCharsets.UTF_8, false);
     final FileReader reader = new FileReader("test.txt", StandardCharsets.UTF_8);
     final CharArrayWriter charArrayWriter = new CharArrayWriter()) {
    writer.write("This is the first line." + System.lineSeparator());
    writer.append("这是第二行。");
    writer.flush(); // 注意一定要强制输出缓存中的数据，否则不会立马看到

    reader.transferTo(charArrayWriter);
    System.out.println(charArrayWriter.toString());
} catch (IOException e) {
    e.printStackTrace();
}
```

#### 管道流

PipedOutputStream 类、PipedInputStream 类和 PipedWriter 类、PipedReader 类提供线程之间的通信，输入流和输出流一定成对出现，并且需要 connect() 连接。

```java
public class ThreadSender implements Runnable {

    private final PipedOutputStream outputStream = new PipedOutputStream();

    private String message;

    public ThreadSender(String message) {
        this.message = message;
    }

    @Override
    public void run() {
        try (outputStream) {
            outputStream.write(message.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public PipedOutputStream getOutputStream() {
        return outputStream;
    }
}

public class ThreadReceiver implements Runnable {
    private final PipedInputStream inputStream = new PipedInputStream();

    @Override
    public void run() {
        try (inputStream) {
            byte[] read = new byte[1024];
            while ((inputStream.read(read) != -1)) {
                System.out.println(new String(read));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public PipedInputStream getInputStream() {
        return inputStream;
    }
}

final ThreadSender sender = new ThreadSender("hello");
final ThreadReceiver receiver = new ThreadReceiver();
try {
    sender.getOutputStream().connect(receiver.getInputStream());
    new Thread(sender).start();
    new Thread(receiver).start();
} catch (IOException e) {
    e.printStackTrace();
}
```

---

### 包装流

使用 [装饰器模式]()，包装节点流添加额外的行为，这些流大部分继承自 FilterOutputStream 类：

#### 缓冲流

缓冲流包含 BufferedInputStream 类、BufferedOutputStream 类、BufferedReader 类、BufferedWriter 类。

创建缓冲流时会创建一个内部缓冲数组，通过批量操作，字节流可以减少对底层系统直接调用，字符流可以减少字节和字符之间的转换效率。

关闭缓冲流会使用 CAS 清空缓冲数组。

```java
try (final FileWriter writer = new FileWriter("test.txt", StandardCharsets.UTF_8, false);
     final BufferedReader bufferedReader = new BufferedReader(new FileReader("test.txt", StandardCharsets.UTF_8))) {
    writer.write("This is the first line." + System.lineSeparator());
    writer.append("这是第二行。");
    writer.flush();

    String line;
    while ((line = bufferedReader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

::: warning Flush

输出流实现了 flushable 接口，缓冲流重写了其中的 flush() 方法，调用 flush() 方法可以将缓冲区的内容写入基本流。

缓冲流调用 close() 方法，会先尝试调用 flush() 方法清空缓冲区后关闭流。

如果目的地是磁盘，调用 flush() 方法只能保证写入基本流，不保证已写入磁盘。

:::

#### 数据流

DataInputStream 类和 DataOutputStream 类提供 Java 原始数据类型的处理，数据流支持基本类型和 String 类型的数据，使用浮点数表示货币值，不支持精确浮点值。程序员需保证写入和读出的数据类型一致。

```java
try (final DataOutputStream outputStream = new DataOutputStream(new FileOutputStream("test.txt"));
     final DataInputStream inputStream = new DataInputStream(new FileInputStream("test.txt"))) {
    outputStream.writeBoolean(true);
    outputStream.writeInt(123);
    outputStream.writeUTF("欧克");
    
    System.out.println(inputStream.readBoolean());
    System.out.println(inputStream.readInt());
    System.out.println(inputStream.readUTF());
} catch (IOException e) {
    e.printStackTrace();
}
```

#### 格式化流

PrintStream 类和 PrintWriter 类。针对格式化的输入可以通过 Scanner 类进行包装，从而进行格式化扫描。

#### 回读流

PushbackInputStream 类和 PushbackReader 类。可以将读到（read）的数据放到缓冲队列（unread）中重新读取（read）。

#### Zip 流

![Zip 流继承图.png](https://pycrab.github.io/KeepJava/assets/media/jdk-io-streams-zip.png)

位于 java.util.zip 包中的 ZipInputStream 类和 ZipOutputStream 类可以操作 ZIP 文件。下面演示打包一个文件：

```java
try (final ZipOutputStream outputStream = new ZipOutputStream(new BufferedOutputStream(new FileOutputStream("test.zip")));
     final FileInputStream inputStream = new FileInputStream("test.txt")) {
    // putNextEntry 开启一个文件目录（相对路径）
    outputStream.putNextEntry(new ZipEntry("txt/test.txt"));
    // 写入数据
    outputStream.write(inputStream.readAllBytes());
    // 打包完成关闭目录
    outputStream.closeEntry();
}
```

#### 对象流

ObjectInputStream 类和 ObjectOutputStream 类提供 Java 对象类型和原始数据类型的处理，支持对象的序列化和反序列化。

ObjectOutputStream 类通过 writeObject(Object o) 方法进行序列化对象，ObjectInputStream 类通过 readObject() 方法来反序列化对象。

> 来了解一下 [序列化和反序列化](../skill/serialization) 的知识

```java
try (final ObjectOutputStream outputStream = new ObjectOutputStream(new FileOutputStream("task.txt"));
     final ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream("task.txt"))) {
    outputStream.writeObject(task);

    final Task object = (Task) inputStream.readObject();
    System.out.println(object.toString());
} catch (ClassNotFoundException | IOException e) {
    e.printStackTrace();
}
```

#### 转换流

根据指定字符集将字节流转换为字符流的类：InputStreamReader 和 OutputStreamWriter。

```java
try (final InputStreamReader reader = new InputStreamReader(new FileInputStream("test.txt"), StandardCharsets.UTF_8)) {
    int read;
    while ((read = reader.read()) != -1) {
        System.out.print(Character.toString(read));
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

#### 顺序输入流

SequenceInputStream 类提供按顺序读取多个输入流。

---

### 标准流和控制台

- 标准输入流 System.in （InputStream）
- 标准输出流 System.out 和 System.err （PrintStream）
- 控制台 System.console() （Console），提供真正的字符流



