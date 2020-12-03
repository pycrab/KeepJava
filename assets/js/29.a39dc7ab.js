(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{382:function(a,t,e){"use strict";e.r(t);var v=e(25),s=Object(v.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h2",{attrs:{id:"io-模型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#io-模型"}},[a._v("🎋")]),a._v(" "),e("a",{attrs:{href:"./io-model"}},[a._v("IO 模型")])]),a._v(" "),e("blockquote",[e("p",[a._v("要弄懂 Java IO 类库，先了解下 UNIX 网络编程之五种 IO 模型。")]),a._v(" "),e("p",[a._v("Java IO 类库是对操作系统底层调用的封装，了解了底层的 IO 模型，我们可以更快地理解 Java 是如何从传统的同步阻塞 IO，到 JDK 1.4 新增 New IO，到 JDK 7 新增 New IO 2 一步步演进的。")])]),a._v(" "),e("h2",{attrs:{id:"文件拷贝"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#文件拷贝"}},[a._v("🎋")]),a._v(" "),e("a",{attrs:{href:"./file-copy"}},[a._v("文件拷贝")])]),a._v(" "),e("blockquote",[e("p",[a._v("一起看看操作系统都提供了哪些文件拷贝的方式。后面会学习到 Java IO 类库中如何使用具体的拷贝方式，及在 Java 如何使用零拷贝技术。")])]),a._v(" "),e("h2",{attrs:{id:"java-io-类库"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#java-io-类库"}},[a._v("🎋")]),a._v(" Java IO 类库")]),a._v(" "),e("h3",{attrs:{id:"传统-io"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#传统-io"}},[a._v("🎋")]),a._v(" "),e("a",{attrs:{href:"./io-streams"}},[a._v("传统 IO")])]),a._v(" "),e("blockquote",[e("p",[a._v("JDK 1.4 之前的传统 IO 操作类在 java.io 包中，包括文件 IO；对于 java.net 包中的网络 IO 也属于传统 IO。")]),a._v(" "),e("p",[a._v("传统 IO 使用流传输数据，流只能是是单向传输。")]),a._v(" "),e("p",[a._v("传统 IO 是同步阻塞的。")])]),a._v(" "),e("h3",{attrs:{id:"new-io-jdk-1-4"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#new-io-jdk-1-4"}},[a._v("🎋")]),a._v(" "),e("a",{attrs:{href:"./new-io"}},[a._v("New IO")]),a._v(" "),e("badge",[a._v("JDK 1.4")])],1),a._v(" "),e("blockquote",[e("p",[a._v("JDK 1.4 发布的 Java New IO 操作类在 java.nio 包中。")]),a._v(" "),e("p",[a._v("Java New IO 将流分开，把数据和通道进行解耦，用缓冲区 Buffer 来放置数据，用通道 Channel 来输送数据。")]),a._v(" "),e("p",[a._v("New IO 支持同步阻塞的 Channel，也通过 Selector 支持同步非阻塞的网络 IO 多路复用。Channel 还封装了操作系统通过内存映射和 sendfile 调用来拷贝文件的方式（零拷贝）。")])]),a._v(" "),e("h3",{attrs:{id:"new-io-2-jdk-7"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#new-io-2-jdk-7"}},[a._v("🎋")]),a._v(" "),e("a",{attrs:{href:"./new-io2"}},[a._v("New IO 2")]),a._v(" "),e("badge",[a._v("JDK 7")])],1),a._v(" "),e("blockquote",[e("p",[a._v("JDK 7 发布的 New IO 2，在 java.io 包（java.nio.file 包）中新增了异步 IO 操作类。")]),a._v(" "),e("p",[a._v("New IO 2 提供了异步文件读写和网络通信的能力，是真正的异步非阻塞 IO （AIO）。")])]),a._v(" "),e("h2",{attrs:{id:"流和通道转换"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#流和通道转换"}},[a._v("🎋")]),a._v(" 流和通道转换")]),a._v(" "),e("details",{staticClass:"custom-block details"},[e("summary",[a._v("Channels 类是流和通道的合集，它提供了静态方法在流和通道之间转换")]),a._v(" "),e("ul",[e("li",[a._v("newInputStream(ReadableByteChannel ch)")]),a._v(" "),e("li",[a._v("newOutputStream(WritableByteChannel ch)")]),a._v(" "),e("li",[a._v("newReader(ReadableByteChannel ch, Charset charset)")]),a._v(" "),e("li",[a._v("newWriter(WritableByteChannel ch, Charset charset)")]),a._v(" "),e("li",[a._v("newChannel(InputStream in)")]),a._v(" "),e("li",[a._v("newChannel(OutputStream out)")]),a._v(" "),e("li",[a._v("newInputStream(AsynchronousByteChannel ch) "),e("badge",[a._v("JDK 7")])],1),a._v(" "),e("li",[a._v("newOutputStream(AsynchronousByteChannel ch) "),e("badge",[a._v("JDK 7")])],1)])]),a._v(" "),e("h2",{attrs:{id:"文件-io-类库"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#文件-io-类库"}},[a._v("🎋")]),a._v(" "),e("a",{attrs:{href:"./file-io"}},[a._v("文件 IO 类库")])]),a._v(" "),e("blockquote",[e("p",[a._v("Java 提供了访问磁盘文件的类，有 JDK 7 之前的 java.io.File 类和 JDK 7 重新设计新增的 java.nio.file 包中的 Files 类和 Path 类。")])]),a._v(" "),e("h2",{attrs:{id:"网络-io-设计模式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#网络-io-设计模式"}},[a._v("🎋")]),a._v(" 网络 IO 设计模式")]),a._v(" "),e("details",{staticClass:"custom-block details"},[e("summary",[a._v("传统网络 IO 模式")]),a._v(" "),e("p",[a._v("一个客户端连接会启动一个线程处理，线程太多会占用大量资源；")]),a._v(" "),e("p",[a._v("使用线程池来优化，从线程池取空闲线程来处理，处理完后返还给线程池，使得线程可以重用；")]),a._v(" "),e("p",[a._v("但是如果是长连接，那么会导致长时间占用资源，导致新来的不可用，所以同步阻塞 IO 适合大量短连接应用。")])]),a._v(" "),e("details",{staticClass:"custom-block details"},[e("summary",[a._v("高性能的 Reactor 设计模式")]),a._v(" "),e("p",[a._v("每个客户端连接都注册感兴趣的事件到一个单独的 select 线程中，由这个 select 线程去轮询每个客户端注册的事件是否发生，当有事件发生时，告知客户端可以执行 IO，让客户端执行对应的事件（可以通过采用多线程或者线程池的方式优化）。这是典型的 IO 多路复用的实现。")])]),a._v(" "),e("details",{staticClass:"custom-block details"},[e("summary",[a._v("高性能的 Proactor 设计模式")]),a._v(" "),e("p",[a._v("每个客户端连接都注册感兴趣的事件到一个单独的 select 线程中，由这个 select 线程去轮询每个客户端注册的事件是否发生，当有事件发生时，操作系统内核去执行相应的 IO 操作，完成后通知客户端已经完成。这是典型的异步 IO 的实现。")])])])}),[],!1,null,null,null);t.default=s.exports}}]);