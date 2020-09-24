---
title: 版本控制工具之 SVN
description: 集中式版本控制系统 SVN 命令学习
meta:
  - name: keywords
    content: VCS, 版本控制, SVN 命令
tags: ['VCS', '版本控制', 'SVN']
prev: ../
next: ./git
---

## SVN 简介

>  [SVN 官网地址](https://subversion.apache.org/)，对于 SVN 本文仅了解一些常用的操作。
>
> 推荐的 SVN Windows客户端工具 [TortoiseSVN](https://tortoisesvn.net/downloads.html)，人称小乌龟，用于将修改提交到服务端
>
> 推荐的 SVN Windows服务端工具 [VisualSVN](https://www.visualsvn.com/downloads/)，用于权限管理、资源管理、版本管理等

SVN，全称 Subversion， 是一个开源的集中式版本控制系统。

​		集中式版本控制系统的特点就是有一个单一的集中管理的服务器，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新。它的缺点很明显，中央服务器单点故障、中心数据库宕机等，都会造成很大的损失。但是为什么Git 这种分布式版本控制系统不能取代它呢？存在就是合理的，SVN 相比 Git 的优势如下：

- SVN 在用户权限方面有更严格的限制，它可以对目录和文件进行权限管理，保证工程师各司其职；而 Git 无法做到读取权限控制，将整个项目clone下来容易泄露数据及历史。
- SVN 更适合大型项目，可以不必检出所有的文件（如果有大文件会很头疼）；Git 更适合小型源代码管理。

## TortoiseSVN 的使用

Windows开始菜单 TortoiseSVN 的安装程序中，打开 Settings 可以进行个性化设置。简要的工作流程：

- 初始化工作区 `checkout`
- 获取远程最新文件 `update`
- 将修改提交到远程 `commit`