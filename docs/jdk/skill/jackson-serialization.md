---
title: Jackson 反序列化驼峰问题
description: Jackson 反序列化驼峰问题
meta:
  - name: keywords
    content: Jackson 反序列化驼峰问题，Jackson，序列化与反序列化
tags: ['序列化与反序列化', 'Jackson']
prev: ./serialization
next: 
---

## 案例由来

​		最简单的增删改查功能，前端人员调试接口发现插入成功，但是关联查询查不出来，我立马去试了一下，确实查不出来。看看数据表中的记录，相关字段确实为空；表字段设计是经典的驼峰格式 column_id，s_column_id；实体类属性为驼峰格式 sColumnId；第一反应是项目 MyBatis 有没有开启驼峰命名转换，看了眼xml配置，已经开启了 `mybatis.configuration.map-underscore-to-camel-case: true` 驼峰转换。

## DEBUG

​		POST 请求，前端传的 sColumnId，实体类就是接收不到。开启DEBUG分析，看到 column_id 是有值的，但是 s_column_id为 null 。为什么 s_column_id 没有接收到呢？难道两个下划线不能转换为正确的驼峰吗？我倒要看看哪里处理的，虽然不太会 DEBUG 源码，那就一层层进去！请容我慢慢道来。

​		首先，接口接收到的值已经是 null 了，说明是 Spring MVC 已经将请求参数匹配到实体对象的属性了，所以我先在接口上打个断点：

![1.png](https://pycrab.github.io/KeepJava/assets/media/jdk-skill-jackson-debug1.png)

​		可以看到请求已经经过层层过滤进入接口这里，但是我们要的不是这个，点击上图右下角的箭头，展开所有类库，这么多咱也看不懂，大概意思就是经历了线程启动、经过一层层的过滤器、然后到了 MVC 处理请求，到 MVC 这里就是有 Servlet 和 request 的地方了，我们点击左边的方法，右边会出现使用到的变量：

![2.png](https://pycrab.github.io/KeepJava/assets/media/jdk-skill-jackson-debug2.png)

​		从上往下依次点击，发现在 invokeForRequest 时有个 args 参数，展开发现里面正是我们的实体对象：

![3.png](https://pycrab.github.io/KeepJava/assets/media/jdk-skill-jackson-debug3.png)

​		继续往下点击，发现 invokeAndHandle 这里，右边没有这个 args 参数，参数就是从这里做了映射赋值，鼠标定位在 invokeAndHandle 这里，我们在程序定位的代码上打个断点，等下从这里进入：

![4.png](https://pycrab.github.io/KeepJava/assets/media/jdk-skill-jackson-debug4.png)

​		首先点击左边这个正常结束程序的按钮（或者按 F9），然后重新 call 接口，进入断点后，点击右边常用的 DEBUG 操作中第二个按钮进入断点处的方法（或者按 F7），然后点击左边的步进（或者按 F8）一行行朝下走，遇到可疑方法就 F7 进入，发现运行过程中提到了 MappingJackson2HttpMessageConverter，继续往下走，遇到了 _valueDeserializer 参数反序列化器，展开右边的变量 _valueDeserializer，有个 _beanProperties，继续展开，找到了 _hashArea，发现里面正是我们的对象属性：

![5.png](https://pycrab.github.io/KeepJava/assets/media/jdk-skill-jackson-debug5.png)

​		但是看到我们的属性是 scolumnId，也就是在这里没有驼峰，所有继续往下走是不会正确赋值的，也就是说，使用 Jackson 反序列化的时候变成了这样，究竟为啥反序列化没有驼峰，我没有继续探究，但是解决办法已经有了。

## 结论

​		使用 Jackson 在反序列化时有些属性名称是会变的，Jackson 提供了很多注解可以操作反序列化时的属性，我们可以在该属性上添加`@JsonProperty(value = "sColumnId")`来指定反序列化后的名称，或者前端在传参数时就约定传 scolumnId 就好了。

​		通过此次找寻问题，我也学到了 DEBUG 源码的方法，虽然里面的代码逻辑没有弄清楚，但是也是入门了，对于 Jackson 反序列化驼峰有问题，以后有时间再去继续 DEBUG 吧😃！