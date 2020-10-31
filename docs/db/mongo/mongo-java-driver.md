---
title: mongo java driver 类库
description: mongo java driver 类库
meta:
  - name: keywords
    content: MongoDB, mongo-java-driver
tags: ['MongoDB', 'mongo-java-driver']
prev: ./
next: 
---

引入 Maven 依赖：

```xml
<dependency>
  <groupId>org.mongodb</groupId>
  <artifactId>mongo-java-driver</artifactId>
  <version>3.12.7</version>
</dependency>
```

主要的类有：MongoClient、MongoDatabase、MongoCollection、Bson、Document。

## 连接及认证

### 创建连接

MongoClient 类内部维护了一个连接池，通过如下方法创建连接，他们提供了默认的配置（如默认 localhost，默认端口 27017，默认 readPreference = primary，写关注点为 WriteConcern.ACKNOWLEDGED）。

```java
MongoClient mongoClient1 = new MongoClient();
MongoClient mongoClient2 = new MongoClient("localhost");
MongoClient mongoClient3 = new MongoClient("localhost", 27017);
MongoClient mongoClient4 = new MongoClient("localhost", MongoClientOptions.builder().build());
MongoClient mongoClient5 = new MongoClient(new ServerAddress("localhost"));
MongoClient mongoClient6 = new MongoClient(Arrays.asList(new ServerAddress("localhost"), new ServerAddress("localhost")));
MongoClient mongoClient7 = new MongoClient(new ServerAddress("localhost"), MongoClientOptions.builder().build());
```

### 修改认证

MongoClientOptions 类使用 Buidler 生成器创建不可变的配置，来配置连接。比如设置 SSL 认证：

`MongoClientOptions.builder().sslEnabled(**true**).build();`

## 数据库

### 检索数据库

从连接检索数据库  `MongoDatabase database = mongoClient.getDatabase("dbName");`，如果该数据库不存在，则在第一次向该数据库中存储数据时自动创建。

检出数据库时，可以指定不同的选项：

- `withCodecRegistry(CodecRegistry codecRegistry)`
- `withReadPreference(ReadPreference readPreference)`
- `withWriteConcern(WriteConcern writeConcern)`
- `withReadConcern(ReadConcern readConcern)`

### 删除数据库

`drop()` 方法。

## 集合

### 检索集合

MongoDatabase 类提供了检索集合的方法 `getCollection(String collectionName)`，如果该集合不存在，则在第一次向该集合中存储数据时自动创建。

如果需要指定选项，则需要显示创建一个集合：`createCollection(String collectionName, CreateCollectionOptions createCollectionOptions)`。

CreateCollectionOptions 类提供了如下等选项：

- `new CreateCollectionOptions().capped(true).sizeInBytes(0x100000))` 设置上限为 1 M
- `validationOptions(final ValidationOptions validationOptions)` 对文档添加验证规则

ValidationOptions 类提供的 `validator(@Nullable final Bson validator)` 方法可以对 Bson 文档进行验证，比如：

```java
ValidationOptions collOptions = new ValidationOptions().validator(Filters.or(Filters.exists("email"), Filters.exists("phone")));
database.createCollection("contacts", new CreateCollectionOptions().validationOptions(collOptions));
```

### 删除集合

drop() 方法。

## 文档

### 增删改

MongoCollection 类提供了对文档进行增删改查及替换的方法：

- 单个插入 `insertOne(TDocument document)` 及批量插入 `insertMany(List<? extends TDocument> documents)`
- 单个删除 `deleteOne(Bson filter)` 及批量删除 `deleteMany(Bson filter)`
- 修改一个 `updateOne(Bson filter, Bson update)` 及修改多个 `updateMany(Bson filter, Bson update)`
- 如果修改的属性过多，则可以直接替换文档 `replaceOne(Bson filter, TDocument replacement)`
- 查找并删除 `findOneAndDelete(Bson filter)`
- 查找并替换 `findOneAndReplace(Bson filter, TDocument replacement)`
- 查找并更新 `findOneAndUpdate(Bson filter, Bson update)`

MongoCollection 类提供了迭代器进行文档查询。

### 过滤

find() 方法返回一个迭代器，可以进行遍历、排序等操作。

```java
menuCollection
    .find(and(
        lte("createTime", new Date(end)),
        gte("createTime", new Date(start))
    ))
    .forEach((Consumer<? super Document>) document -> {
        if ("py".equals(document.get("remark"))) {
            menuCollection.updateOne(eq("id", document.get("id")), combine(set("remark", "xxx")));
        }
    });
```

### 去重

```java
StringBuilder builder = new StringBuilder();

menuCollection
    .distinct("sortNum", Integer.class)
    .forEach((Consumer<? super Integer>) d -> builder.append(d).append("<br>"));
```

### 聚合

管道

```java
StringBuilder builder = new StringBuilder();

menuCollection
    .aggregate(Arrays.asList(
        Aggregates.group("$type", Accumulators.sum("total", 1)),
        Aggregates.sort(Sorts.descending("total")),
        Aggregates.project(Projections.fields(
            Projections.excludeId(),
            Projections.include("type"),
            Projections.computed("总计", "$total"),
            Projections.computed("类型", "$_id")
        ))
    ))
    .forEach((Consumer<? super Document>) d -> {
        d.put("类型", sysDictDataService.getDataNameByType(d.getString("类型")));
        builder.append(d.toJson()).append("<br>");
    });
```

### 聚集

```java
StringBuilder builder = new StringBuilder();

menuCollection
    .find(and(
        ne("remark", "test"),
        ne("remark", null),
        in("sortNum", 0, 1, 2)
    ))
    .projection(Projections.fields(
        Projections.include("id", "type", "label", "sortNum"),
        Projections.excludeId()
    ))
    .sort(Sorts.descending("sortNum"))
    .forEach((Consumer<? super Document>) d -> builder.append(d.toJson()).append("<br>"));
return builder.toString();
```

## 索引

MongoCollection 类提供了创建索引和删除索引的方法：

- 创建索引 `createIndex(Bson keys)`
- 删除索引 `dropIndex(String indexName)`

```java
menuCollection.createIndex(Indexes.ascending("type"));
menuCollection
    .createIndex(Indexes.compoundIndex(
        Indexes.ascending("sortNum", "type"),
        Indexes.descending("createTime", new IndexOptions().unique(true).toString())
    ));
```

