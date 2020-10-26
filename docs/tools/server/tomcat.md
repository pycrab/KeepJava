---
title: 服务器之 Tomcat
description: 服务器之 Tomcat
meta:
  - name: keywords
    content: 服务器, Tomcat
tags: ['服务器', 'Tomcat']
prev: 
next:
---

## Tomcat 安装

- [下载地址](http://tomcat.apache.org/)
  - 解压 `tar -zxvf apache-tomcat-xx.tar.gz`
  - 移动 `sudo mv apache-tomcat-xx /opt`
- 启动和关闭 Tomcat（需要保证已安装 Java）`cd /opt/apache-tomcat-xx/bin`
  - 启动 `./startup.sh`
  - 关闭 `./shutdown.sh`
- 默认启动 8080 端口，启动后打开 localhost:8080 可以看到 tomcat 猫

## 自定义配置

### 服务器配置

修改 `conf` 目录下的 server.xml 文件。

### 用户配置

修改 `conf` 目录下的 tomcat-users.xml 文件。

## 部署应用

`webapps` 目录自动解压 war包。