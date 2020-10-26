---
title: 项目构建工具之 Maven
description: 项目构建工具之 Maven
meta:
  - name: keywords
    content: 项目构建工具, Maven
tags: ['项目构建工具', 'Maven']
prev: 
next:
---

## Maven 安装

- [下载地址](https://maven.apache.org/download.cgi)
  - 解压 `tar -zxvf maven-xxx-bin.tar.gz `
  - 移动 `sudo mv maven-xxx /opt`

- 配置环境变量（Windows 下类似）

  - 首先需要保证已配置好 JAVA_HOME 环境变量

    ```bash
    JAVA_HOME=/opt/openjdk-15
    export PATH=$JAVA_HOME/bin:$PATH
    ```

  - 然后添加 Maven 环境变量 `sudo vim /etc/profile`

    ```bash
    export PATH=/opt/apache-maven-3.6.3/bin:$PATH
    ```

  - 执行 `source /etc/profile` 使环境变量生效

- 测试 `mvn -v`