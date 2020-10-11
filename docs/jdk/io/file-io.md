---
title: Java 文件 IO
description: 文件 IO
meta:
  - name: keywords
    content: 文件 IO
tags: ['文件 IO']
prev: ./
next: 
---

## File 类

java.io 包中的 File 类，它提供了操作文件和目录的方法，但是不能读写文件。常用方法有：

- 创建文件对象`File(String pathname)`
- 判断文件是否存在`exists()`
- 判断是否是文件`isFile()`
- 判断是否是目录`isDirectory()`
- 返回文件或目录名`getName()`
- 返回绝对路径`getAbsolutePath()`
- 返回文件列表`listFiles()`
- 根据当前路径创建文件目录`mkdirs()`
- 原子操作，检查文件是否存在，不存在创建新文件`createNewFile()`
- 删除文件，删除目录时目录下必须为空`delete()`
- 转换为 Path 对象`toPath()`

## Files 类

java.nio.file 包将文件和路径分开，即 Files 类与 Path 类，两者一起提供了操作文件、目录和其它类型文件的方法，它增强了文件操作，可以打开文件流进行读写操作，对 File 类方法调用失败不会抛出具体异常等缺点进行改进，IO 操作是安全的。

- 文件路径 Path
  - 创建路径对象`of(String first, String... more)`
- 文件操作 Files
  - 判断文件是否存在`exists(Path path, LinkOption... options)`
  - 判断两个路径是否是同一个文件`isSameFile(Path path, Path path2)`
  - 判断是否是常规文件`isRegularFile(Path path, LinkOption... options)`
  - 判断是否是符号链接`isSymbolicLink(Path path)`
  - 判断是否是文件目录`isDirectory(Path path, LinkOption... options)`
  - 读取文件所有内容（注意仅用于小文件，防止内存耗尽）
    - `readAllBytes(Path path)`
    - `readString(Path path, Charset cs)`
    - `readAllLines(Path path, Charset cs)`
  - 写文件
    - `write(Path path, byte[] bytes, OpenOption... options)`
    - `writeString(Path path, CharSequence csq, Charset cs, OpenOption... options)`
  - 打开文件流
    - `newInputStream(Path path, OpenOption... options)`
    - `newOutputStream(Path path, OpenOption... options)`
  - 创建文件，可以添加参数，选择何时销毁的钩子
    - `createFile(Path path, FileAttribute<?>... attrs)`
    - `createTempFile(Path dir, String prefix, String suffix, FileAttribute<?>... attrs)`
  - 删除文件
    - `delete(Path path)`
    - `deleteIfExists(Path path)`

