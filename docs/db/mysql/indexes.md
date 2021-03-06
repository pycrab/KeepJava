---
title: MySQL 数据库索引
description: MySQL 数据库索引
meta:
  - name: keywords
    content: MySQL 数据库，索引
tags: []
prev: 
next: 
---

> 主流5.6版本及以后

## 为什么要创建索引

MySQL官方对索引的定义为：索引（Index）是帮助MySQL**高效获取数据**的数据结构。

- 使用索引的优点如下：
  - 减少IO访问次数，使用索引最多需要三次左右IO即可获取到数据
  - 缩小每次扫描的数据量，避免内存加载用不到的块
  - 使用覆盖索引，将随机IO变成顺序IO，加快查询效率
  - 索引有序存储，避免排序和临时表，减少内存消耗
- 使用索引的缺点：
  - 耗费创建和维护的时间
  - 耗费物理空间

## B+Tree索引原理

### 查询算法演进

参考[查询算法及索引实现原理](https://developer.aliyun.com/article/65126)

1、为什么使用**B+Tree索引**而不使用Hash索引？

​		**B+Tree索引**是一种平衡多路搜索树，检索时需要从根节点到叶子节点逐级查找，时间复杂度是O(logN)，而且叶子节点添加了顺序访问指针，非常适合排序和范围查询。

​		而**Hash索引**是哈希表，能够在O(1)时间内快速精确找到，但是对排序和范围查找不友好，需要全表扫描，还有可能出现哈希碰撞问题，因此不常用。

2、B+Tree和B-Tree的区别？

- B-Tree的所有节点既存键key也存数据data；而B+Tree只有叶子节点既存key又存data，其他节点只存key
- B-Tree对每个节点进行二分查找，找到直接返回data；而B+Tree每次都是从根节点逐级查找到叶子节点，然后返回叶子节点的data
- 数据库中使用的B+Tree进行了优化，叶子节点添加了单向的顺序访问指针，范围查找时找到开始的叶子然后顺序访问相邻的叶子即可。

### 最左匹配原则

​		MySQL可以对一列建立索引，也可以对多列按照顺序建立联合索引。最左匹配原则指的是，where查询条件中，会根据索引一直向右进行精确查找，如果中断或者不匹配，或遇到这几个范围查询（in，>，<，between，like 开头为%等）查找后就不继续匹配了。

​		比如我建立一个联合索引（a, b, c），那么最左匹配的意思是，查询a，或者ab，或者abc可以匹配该索引，其他的比如b，bc，c则不符合匹配规则，无法命中索引。

### B+Tree索引分类

> 在InnoDB存储引擎中，B+Tree索引分为聚集索引和非聚集索引。而在MyISAM存储引擎中，只有非聚集索引。

​		先通过一个常识来理解，我们查询汉语字典的时候，往往有两种方式，一种是根据拼音目录查找，一种是根据部首目录查找。因为汉语字典是按照拼音顺序组织的，所以根据拼音可以顺序查找，而根据部首是跳跃查找（因为相同部首的不一定在相邻的页，按部首排序的汉字对拼音来说是乱序的）。在这里拼音目录就相当于聚集索引，部首目录就相当于非聚集索引。

​		当我们查表（查询字典）时，通常根据聚集索引（按拼音）或者非聚集索引（按部首）精确查找或者范围查找，要比全表扫描（随机翻看字典）快的多。

#### 聚集索引

> 叶子节点存储的是行记录和主键列的B+Tree，叫做聚集索引。
>
> 聚集索引有且只有一个，聚集索引对应的列唯一且非空，能够唯一标识一条记录。InnoDB存储引擎会根据聚集索引按照顺序存储行记录，所以其实InnoDB表存储的数据文件本身就是索引文件。

- 聚集索引是有序的，进行精确查找和范围查找非常快。

- 聚集索引的声明：
  - 如果表声明了主键，则在主键列上建立聚集索引；
  - 如果没有主键，则会选择表中第一个唯一非空的列作为聚集索引；
  - 否则，InnoDB引擎会为每行数据添加一个rowId作为聚集索引。
- 具体选择哪一列作为聚集索引，需要慎重考虑。

#### 非聚集索引

> 叶子节点存储的是索引列和主键列的B+Tree，叫非聚集索引。

- 非聚集索引又可以细分为以下几种：

  - 普通索引

    为了加快查询或排序速度在列上建立的索引，由关键字key或者index定义。

  - 唯一索引

    具有唯一性的列建立的索引叫唯一索引，保证插入数据的唯一性，由关键字unique定义。

    唯一索引和聚集索引的不同在于叶子节点存储的数据和能否为空。

  - 外键索引

    如果为外键字段定义了外键约束条件，MySQL会自动建立外键索引去管理外键约束。

  - 联合索引

    在多个列上建立一个联合索引，MySQL会根据最左匹配原则进行查询。

    建立联合索引覆盖要查询的列是避免回表的一种方式（覆盖索引）。

  - 全文索引

    全文索引主要是为了检索大文本数据中的关键字的信息，是目前搜索引擎数据库使用的一种技术。

    5.6版本及以后InnoDB存储引擎也支持。

  - 主键索引

    在InnoDB存储引擎中指的就是聚集索引，在MyISAM存储引擎中指的是在主键列上建立的索引。

## 索引失效的因素

> 如何才能使用索引，并且确实能命中索引，而不是全表扫描？导致索引失效的因素有以下：

- 数据表存储引擎不支持该索引

- 没有遵守最左匹配原则

  - LIKE关键字匹配字符串的第一个字符为任意值%等
  - 遇到范围查询，后面的不走索引
  - 对于联合索引，第一个就没命中，不符合最左匹配原则

- 索引列参与计算、使用函数、类型转换

  由于索引中存储的是列原始数据，不可能在查询的时候去全表重新计算，因此不走索引。

  可以改为计算/转换另一边的数据；或者建立函数索引。

  - 字符串类型却传入数字类型比较

    默认会把字符串类型转为数字类型（从第一个字符截取到第一个非数字字符）。

    数字应该加引号。

  - 日期类型和时间戳比较（待测试）

- 当查询优化器判断全表扫描（扫描全部的聚集索引）比使用索引所需的成本更少时，可能会执行全表扫描

  比如查询大量的数据时，列没有建立索引导致回表，从而进行大量随机IO

  - 如果查询的列只包含非聚集索引列（或者也含有主键列），则直接从叶子节点中返回数据即可，但是如果查询的列包含索引列之外的列，则需要根据叶子节点中的主键列进行二次查询，到聚集索引中查询需要的数据，这就叫做回表。

## SQL调优

SQL调优一方面是根据经验，一方面是遵守规范，[MySQL官方指南](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)专门有一节告诉我们如何优化性能。这里仅列出几个常规操作。

### 基于业务逻辑的优化

- 批量操作优于循环单条操作

- SQL不要掺杂过多的业务处理

  复杂SQL会导致CPU大量计算。

### 基于连接的SQL调优

- 如果有连接，应该不使用连接通过执行计划，看哪个表应该作为驱动表
- 小表驱动大表，上一个结果集作为驱动表遍历查询下一个被驱动表，减少循环总次数
- 优先优化内层Nested Loop循环，内存循环执行次数最多，行数越少性能越高
- ![](https://pycrab.github.io/KeepJava/assets/media/db-mysql-indexes-joinprocess.png)
- ![image-20200917215300631](https://pycrab.github.io/KeepJava/assets/media/db-mysql-indexes-nlj.png)
- ![image-20200917215314237](https://pycrab.github.io/KeepJava/assets/media/db-mysql-indexes-drive.png)

### 基于索引的SQL调优

- 建立索引

  - 主键列、外键列、连接列、排序列、分组列按情况建立索引

  - 对区分度比较高的列建立索引，或者区分度低但是访问不均匀的列建立索引

    区分度 = select count ( distinct col) / count ( * )，区分度越高，过滤后的行数越少

  - 尽量扩展索引，而不是新建索引，联合索引比多个普通索引快

    在and连接条件中，如果是普通索引只会命中其中一个。

  - 联合索引也遵从区分度高的列在前，能够过滤掉更多的行

    要综合考虑该表的所有查询方式，评估覆盖尽可能多的情况。

  - 尽量使用覆盖索引，减少回表

  - 冗余索引或从不使用的索引及时删除

    比如索引( a, b )和索引( a )同时存在，( a )就是冗余索引，MySQL 5.7 版本后，可以通过查询 sys 库的 `schema_redundant_indexes` 表来查看冗余索引

  - 索引不宜过多，多了会影响插入和删除性能

  - 索引不宜过长，太长会增大索引文件的大小和维护开销

    - 主键索引尽可能小（非聚集索引叶子都会存储主键）

    - 对特殊字段建立前缀索引

      用列的前缀代替整个列作为索引的key，当前缀长度合适时，区分度接近于全列索引。

      但是前缀索引不能用于排序列、分组列，也不能用作覆盖索引。

- 命中索引

  - 遵守最左匹配原则，区分度高的在前，范围查询放在最后

    等值查询=和范围查询in可以乱序，MySQL的查询优化器可以优化成索引可识别的形式

    但是最好区分度高的在前，减少优化器重新编译。

  - 索引列不要参与运算、使用函数，避免自动类型转换

  - 范围查询指定最值（待测试）

    由于B+Tree索引结构添加了单向的顺序访问指针，提高了区间访问的性能。

  - 查询优化器弃用索引，这时需要强制使用索引（待查询资料验证）

- 不命中索引

  - 查询数据量超过40%，或者其他特殊情况，可能全表扫描更快

### 基于空间的SQL调优

- 减少临时表的创建和销毁

  参考[MySQL高性能优化建议](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247485117&idx=1&sn=92361755b7c3de488b415ec4c5f46d73&chksm=cea24976f9d5c060babe50c3747616cce63df5d50947903a262704988143c2eeb4069ae45420&token=79317275&lang=zh_CN#rd)

  - 避免使用大数据量的子查询

    优化为连接join操作。

  - 避免同时关联连接join多个表

    有可能导致服务器内存溢出。

  - 明显不会重复时使用union　all而不是union

    union会生成临时表去重

- 针对大表优化

  参考[大表优化](https://snailclimb.gitee.io/javaguide/#/docs/database/MySQL?id=%e5%a4%a7%e8%a1%a8%e4%bc%98%e5%8c%96)

  - 查询时一定限定范围

  - 读写分离
    主库写，从库读

  - 垂直分区

    按列拆分表，甚至放到单独的库做分库。

    - 优点：可以使得列数据变小，在查询时减少读取的Block数，减少I/O次数。此外，垂直分区可以简化表的结构，易于维护。
    - 缺点：主键会出现冗余，需要管理冗余列，并会引起Join操作，可以通过在应用层进行Join来解决。此外，垂直分区会让事务变得更加复杂。

  - 水平分区

    按某种策略将数据分散到不同的表或者库中。

    - 客户端代理
    - 中间件代理

### 基于使用频度的SQL调优

- 建立视图
- 建立存储过程

## 附录

### MySQL存储引擎支持索引

[官方文档](https://dev.mysql.com/doc/refman/8.0/en/storage-engines.html)支持的索引类型如下：

![](https://pycrab.github.io/KeepJava/assets/media/db-mysql-index-01.png)

![](https://pycrab.github.io/KeepJava/assets/media/db-mysql-index-02.png)

​		InnoDB中的哈希索引我们无法手动创建，因为它是存储引擎为了加速索引寻址而自动创建的索引，相当于索引的索引，key值是索引的键值，value 是索引记录页面的位置。

### 索引操作示例



### 查看执行计划

### 测试索引命中
