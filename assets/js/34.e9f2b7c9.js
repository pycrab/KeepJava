(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{387:function(t,s,a){"use strict";a.r(s);var n=a(25),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"缓冲区-buffer"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓冲区-buffer"}},[t._v("🎋")]),t._v(" 缓冲区 Buffer")]),t._v(" "),a("p",[t._v("缓冲区是基本类型（除了 boolean 类型）的元素的线性序列，数据的读写都是对缓冲区的操作。以下缓冲区都是抽象类：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://pycrab.github.io/KeepJava/assets/media/jdk-io-new-io-buffer1.png",alt:"缓冲区类图.png"}})]),t._v(" "),a("p",[t._v("缓冲区除了放置基本元素，还有四个控制读写的属性：")]),t._v(" "),a("ul",[a("li",[t._v("capacity，缓冲区的总容量")]),t._v(" "),a("li",[t._v("limit，缓冲区内可以操作的数据的总量")]),t._v(" "),a("li",[t._v("position，当前读写的位置，默认是 0")]),t._v(" "),a("li",[t._v("mark，标记位置，用来多次读取数据时重置 position，默认是 -1")])]),t._v(" "),a("p",[t._v("缓冲区通过这四个位置属性来控制读写，其中，它们是严格遵守 mark <= position <= limit <= capacity 的，并且 position >= 0。")]),t._v(" "),a("p",[t._v("缓冲区提供的方法，部分支持链式调用，如下：")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("创建缓冲区")]),t._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在 Java 堆内存中创建缓冲区")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 第一种：通过 allocate 静态方法创建空缓冲区，其中，capacity 会被初始化为指定大小，limit 初始化为 capacity 大小，position 初始化为 0，mark 未定义。每个位置的值都初始化为 0")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("IntBuffer")]),t._v(" intBuffer "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("IntBuffer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("allocate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// pos=0 lim=100 cap=100")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 第二种：通过 wrap 静态方法根据数组创建缓冲区，其中，capacity 和 limit 会初始化为数组大小，position 初始化为 0，mark 未定义。")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("CharBuffer")]),t._v(" charBuffer "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("CharBuffer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("wrap")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("char")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'b'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'c'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'d'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// pos=0 lim=4 cap=4")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在本机内存直接创建缓冲区，在该缓冲区中，JVM 尽最大努力直接调用操作系统底层 IO 进行读写，而不复制到中间缓冲区。")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 第一种：通过 allocateDirect 静态方法直接创建空缓冲区")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ByteBuffer")]),t._v(" byteBuffer "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ByteBuffer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("allocateDirect")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// pos=0 lim=10 cap=10")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 第二种：通过 FileChannel 的 map 方法将文件直接映射到内存区域 MappedByteBuffer")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 通过 asReadOnlyBuffer() 方法将缓冲区可以标记为只读缓冲区")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br")])])]),t._v(" "),a("li",[a("p",[t._v("读写缓冲区，当进行读写操作时，position 会往后移动直到最大为 limit。对缓冲区的读写都是按队列先进先出，是单向的。")]),t._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 通过 get() 方法及其重载方法读")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 通过 put() 方法及其重载方法写")]),t._v("\nintBuffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("put")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("put")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 需要注意的是，对指定下标进行读写时，position 是不变的。")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果下标位置不可用，则会抛出 IndexOutOfBoundsException 异常；如果对只读缓冲区写入，会抛出 ReadOnlyBufferException 异常。比如:")]),t._v("\nintBuffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nintBuffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("put")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br")])])]),t._v(" "),a("li",[a("p",[t._v("属性重置方法")]),t._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 转为写模式（清空操作）：初始化缓冲区，将 position 置为 0，limit 置为 capacity，mark 置为 -1")]),t._v("\nintBuffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("clear")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 转为读模式：将 position 置为 0，limit 置为 position，mark 置为 -1")]),t._v("\nintBuffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("flip")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 倒带操作：将 position 置为 0，mark 置为 -1")]),t._v("\nintBuffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rewind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br")])])]),t._v(" "),a("li",[a("p",[t._v("标记 / 重置缓冲区")]),t._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 标记当前位置，将 mark 置为 position")]),t._v("\nintBuffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mark")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 回到标记的位置，将 position 置为 mark")]),t._v("\nintBuffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("reset")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 注意，一定先 mark 标记后才能 reset，否则会报 InvalidMarkException 异常，因为 mark 默认 -1")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br")])])]),t._v(" "),a("li",[a("p",[t._v("转换缓冲区")]),t._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ByteBuffer 提供了 asXXX 方法可以转换为 其它类型的缓冲区，如 asCharBuffer()")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])])])]),t._v(" "),a("h2",{attrs:{id:"通道-channel"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#通道-channel"}},[t._v("🎋")]),t._v(" 通道 Channel")]),t._v(" "),a("p",[t._v("通道是用来连接内存和磁盘文件（或外部设备、网络、程序）的。它主要有四个抽象类：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://pycrab.github.io/KeepJava/assets/media/jdk-io-new-io-channel1.png",alt:"通道 Channel 类图.png"}})]),t._v(" "),a("h3",{attrs:{id:"文件-io-通道"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文件-io-通道"}},[t._v("🎋")]),t._v(" 文件 IO 通道")]),t._v(" "),a("p",[t._v("文件通道 FileChannel 是用于读写、映射和操作文件的通道。有三个类提供了打开文件通道的 getChannel() 方法，分别是：")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("打开读取通道：FileInputStream")])]),t._v(" "),a("li",[a("p",[t._v("打开写入通道：FileOutputStream")])]),t._v(" "),a("li",[a("p",[t._v("打开随机访问通道：RandomAccessFile")]),t._v(" "),a("ul",[a("li",[t._v("根据随机访问文件的模式 Mode，可以指定是可读 r、可读写 rw、读写并将文件内容更改同步到磁盘 rwd、读写并将文件内容及元数据的更改同步到磁盘 rws。")])])])]),t._v(" "),a("p",[t._v("FileChannel 类本身提供了 "),a("code",[t._v("open(Path path, OpenOption... options)")]),t._v(" 方法根据文件 Path 打开一个文件通道，使用 options 指定文件通道类型。")]),t._v(" "),a("p",[t._v("FileChannel 提供的方法如下：")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("传统文件读写")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("从文件读出数据并读入缓冲区 "),a("code",[t._v("read(ByteBuffer dst)")])])]),t._v(" "),a("li",[a("p",[t._v("从缓冲区读出数据并写入文件 "),a("code",[t._v("write(ByteBuffer src)")])]),t._v(" "),a("p",[t._v("使用通道和缓冲区进行一次文件传统读写的示例如下：")]),t._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FileChannel")]),t._v(" inChannel "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FileInputStream")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test.txt"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getChannel")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FileChannel")]),t._v(" outChannel "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FileOutputStream")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"task.txt"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getChannel")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ByteBuffer")]),t._v(" buffer "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ByteBuffer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("allocate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1024")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("inChannel"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("read")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("buffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    buffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("flip")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 初始化为读模式")]),t._v("\n    outChannel"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("write")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("buffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    buffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("clear")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 初始化为写模式")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nbuffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("clear")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ninChannel"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("close")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br")])])])])]),t._v(" "),a("li",[a("p",[t._v("基于 sendfile 系统调用的文件拷贝")]),t._v(" "),a("ul",[a("li",[t._v("将当前通道内的文件写入目的通道 "),a("code",[t._v("transferTo(long position, long count, WritableByteChannel target)")])]),t._v(" "),a("li",[t._v("将源通道的数据读入当前文件通道 "),a("code",[t._v("transferFrom(ReadableByteChannel src, long position, long count)")])])])]),t._v(" "),a("li",[a("p",[t._v("基于 mmap 内存映射的文件拷贝")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("map(MapMode mode, long position, long size)")]),t._v(" 方法将文件从 position 位置开始的 size 大小的块映射为内存区域。适用于大文件读操作，如 MD5 校验。")])])])]),t._v(" "),a("h3",{attrs:{id:"网络-io-通道"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#网络-io-通道"}},[t._v("🎋")]),t._v(" 网络 IO 通道")]),t._v(" "),a("p",[t._v("通过上面的 Channel 继承类图我们可以看到，DatagramChannel、SocketChannel 和 ServerSocketChannel 都继承了 SelectableChannel，这三个通道同时也实现了 NetworkChannel 接口，所以说网络 IO 就是依靠这三个通道通信。它们是：")]),t._v(" "),a("ul",[a("li",[t._v("用于 UDP 网络 IO 的数据报通道 DatagramChannel")]),t._v(" "),a("li",[t._v("用于  TCP 网络 IO 的面向流的客户端通道 SocketChannel 和面向流的服务端通道 ServerSocketChannel")])]),t._v(" "),a("p",[t._v("打开网络 IO 通道的方式有：")]),t._v(" "),a("ul",[a("li",[t._v("通道的 "),a("code",[t._v("open()")]),t._v(" 方法")]),t._v(" "),a("li",[t._v("SelectorProvider 类提供的静态方法，它等同于通道的 "),a("code",[t._v("open()")]),t._v(" 方法\n"),a("ul",[a("li",[a("code",[t._v("openDatagramChannel()")])]),t._v(" "),a("li",[a("code",[t._v("openSocketChannel()")])]),t._v(" "),a("li",[a("code",[t._v("openServerSocketChannel()")])])])]),t._v(" "),a("li",[t._v("传统流的 "),a("code",[t._v("getChannel()")]),t._v(" 方法\n"),a("ul",[a("li",[t._v("DatagramSocket #getChannel()")]),t._v(" "),a("li",[t._v("Socket #getChannel()")]),t._v(" "),a("li",[t._v("ServerSocket #getChannel()")])])])]),t._v(" "),a("p",[t._v("SelectableChannel 抽象类提供了 "),a("code",[t._v("configureBlocking(boolean block)")]),t._v(" 方法开启非阻塞模式，使用非阻塞的多路复用更有效（需要在注册之前开启）。")]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("关闭通道")]),t._v(" "),a("p",[t._v("关闭通道使用 "),a("code",[t._v("close()")]),t._v(" 方法，关闭后不能操作，否则会抛异常 ClosedChannelException。")])]),t._v(" "),a("h2",{attrs:{id:"选择器-selector"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#选择器-selector"}},[t._v("🎋")]),t._v(" 选择器 Selector")]),t._v(" "),a("p",[t._v("选择器 Selector 是 SelectableChannel 的多路复用器，也就是说选择器 Selector 只用于以上三种网络通信。如何使用选择器呢？")]),t._v(" "),a("p",[t._v("1、首先，开启一个选择器")]),t._v(" "),a("p",[t._v("有两种方式：")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("Selector 类的静态方法 "),a("code",[t._v("open()")])])]),t._v(" "),a("li",[a("p",[t._v("SelectorProvider 类实例的 "),a("code",[t._v("openSelector()")]),t._v(" 方法")])])]),t._v(" "),a("p",[t._v("2、将通道注册到选择器上")]),t._v(" "),a("p",[t._v("SelectableChannel 抽象类提供了 "),a("code",[t._v("register(Selector sel, int ops, Object att)")]),t._v(" 方法将通道注册到选择器上，该注册方法需要提供要注册的选择器、目标操作、和一个附加对象（可为 null）。其中，目标操作 ops 主要有四类：")]),t._v(" "),a("ul",[a("li",[a("em",[t._v("SelectionKey.OP_READ")]),t._v("，通道已准备好进行读取")]),t._v(" "),a("li",[a("em",[t._v("SelectionKey.OP_WRITE")]),t._v("，通道已准备好进行写入")]),t._v(" "),a("li",[a("em",[t._v("SelectionKey.OP_CONNECT")]),t._v("，通道已准备好进行连接")]),t._v(" "),a("li",[a("em",[t._v("SelectionKey.OP_ACCEPT")]),t._v("，通道已准备好接受其它连接")])]),t._v(" "),a("p",[t._v("3、选择器轮询，获取满足目标操作的 SelectionKey 的合集")]),t._v(" "),a("p",[t._v("调用 Selector 的 "),a("code",[t._v("selectedKeys()")]),t._v("方法可以获得已就绪的通道的 SelectionKey 集合。")]),t._v(" "),a("p",[t._v("Selector 选择器持有代表已注册通道的选择键 SelectionKey 的三种集合，并提供方法来获取：")]),t._v(" "),a("ul",[a("li",[t._v("keys set ：所有 SelectionKey 的集合，只有键失效和通道关闭才会从此集合删除，通过 "),a("code",[t._v("keys()")]),t._v(" 方法获取")]),t._v(" "),a("li",[t._v("selected-key set ：检测就绪的 SelectionKey 的集合，通过 "),a("code",[t._v("selectedKeys()")]),t._v(" 方法获取")]),t._v(" "),a("li",[t._v("cancelled-key set ：SelectionKey 已取消但是对应的通道未关闭的 SelectionKey 的集合，无法获取")])]),t._v(" "),a("p",[t._v("4、通过 SelectionKey 获得对应的通道，进行 IO 操作")]),t._v(" "),a("p",[t._v("register 注册方法会返回注册好的 SelectionKey 对象，该对象有以下方法来探测通道及状态：")]),t._v(" "),a("ul",[a("li",[t._v("获取通道 "),a("code",[t._v("channel()")])]),t._v(" "),a("li",[t._v("对应通道是否可读 "),a("code",[t._v("isReadable()")])]),t._v(" "),a("li",[t._v("对应通道是否可写 "),a("code",[t._v("isWritable()")])]),t._v(" "),a("li",[t._v("对应通道是否已连接 "),a("code",[t._v("isConnectable()")])]),t._v(" "),a("li",[t._v("对应通道是否准备好接受新的 socket 连接 "),a("code",[t._v("isAcceptable()")])])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("IO 多路复用")]),t._v(" "),a("p",[t._v("当已注册的通道满足目标操作时，Selector 选择器通过轮询会获得目标操作的 SelectionKey 选择键集合，通过选择键就可以获得对应的通道，进而执行通道的 IO 操作。")])]),t._v(" "),a("h2",{attrs:{id:"管道-pipe"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#管道-pipe"}},[t._v("🎋")]),t._v(" 管道 Pipe")]),t._v(" "),a("p",[t._v("传统 IO 中使用管道流进行线程之间的 IO 通信，Java New IO 提供了 Pipe 类进行线程间的通信。")]),t._v(" "),a("p",[t._v("Pipe 管道提供了一对单向的通道，一个是可写的 Pipe.SinkChannel 通道，一个是可读的 Pipe.SourceChannel 通道。")]),t._v(" "),a("p",[t._v("创建一个管道使用 "),a("code",[t._v("open()")]),t._v(" 方法，获取通道通过管道实例的 "),a("code",[t._v("sink()")]),t._v(" 方法和 "),a("code",[t._v("source()")]),t._v(" 方法。")]),t._v(" "),a("hr"),t._v(" "),a("div",{staticClass:"custom-block danger"},[a("p",{staticClass:"custom-block-title"},[t._v("参考文献")]),t._v(" "),a("ul",[a("li",[t._v("博客园 rickiyang "),a("a",{attrs:{href:"https://www.cnblogs.com/rickiyang/p/13265043.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("零拷贝(Zero-copy) 浅析及其应用"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("知乎专栏 美团技术团队 "),a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/23488863",target:"_blank",rel:"noopener noreferrer"}},[t._v("Java NIO 浅析"),a("OutboundLink")],1)])])])])}),[],!1,null,null,null);s.default=e.exports}}]);