---
title: 版本控制工具之 Git
description: 分布式版本控制系统 Git 命令学习
meta:
  - name: keywords
    content: VCS, 版本控制, Git 命令，Git 分支，Git 变基，Git 工作流，Git 最佳实践
tags: ['VCS', '版本控制', 'Git']
prev: ../
next: ./svn
---

## Git 简介

> 本文仅给出部分实践，完整内容请详细阅读 [官方文档中文地址](https://git-scm.com/book/zh/v2) ，其中对 Git 的讲解比较全面。

**Git 的几个特点如下：**

1. 开源的分布式版本控制系统，高效、简单、完全分布式。
2. 本地执行操作，发挥离线的优势——快。
3. 每次提交更新，或在 Git 中保存项目状态时，Git 主要对当时的全部文件制作一个快照并保存这个快照的索引。为了高效，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件快照。（其它大部分版本控制系统是保存文件变更列表，只知道变更，看不出具体有什么差异）

**Git 文件的四种状态：**

​		新创建（untracked）、已修改（modified）、已暂存（staged）、已提交（commited），对应三个工作区域：工作区、暂存区、本地仓库。

**Git 基本工作流程如下：**

![Git 分布式工作流程之集中式工作流图](https://pycrab.github.io/KeepJava/assets/media/tools-git-flow.png)

**Git 的安装：**

- 直接在官网下载对应操作系统的包进行安装。

  ```shell
  # 打开 Git Bash 查看版本
  git --version
  ```

## Git 基础

Git 命令及其参数可以通过命令行来查看，查询所有命令手册 `git help`，针对一个具体命令的帮助手册如 `git add -h`

### 配置

- 首先熟悉下 Git 的配置文件，Git 默认会有三种权限的配置：系统配置、用户配置、仓库配置，最小级别会依次覆盖高级别的配置。我们可以使用 `git config ` 命令来查询和配置：

  ```shell
  # 列出所有配置文件及位置
  git config --list --show-origin
  
  # 列出所有配置文件的合集（可能会重复，会使用最后一个）
  git config --list
  
  # 列出仓库配置
  git config --list --local
  
  # 列出用户配置
  git config --list --global
  
  # 列出系统配置（不常用）
  git config --list --system
  
  # 查询某一项配置
  git config user.name
  ```

- 初次使用 Git 需要配置用户信息用于提交文件，需要配置用户名和邮箱：

  ```shell
  # 设置全局用户配置
  git config --global user.name xxx
  git config --global user.email xxx@qq.com
  
  # 也可以针对项目设置，使用企业邮箱而不是个人邮箱
  git config --local user.name xxx
  git config --local user.email xxx@qq.com
  ```

### 起别名

为了更简单地使用一些命令，我们可以起一些简短的别名来使用，比如：

- 查看最后一条提交记录

  ```shell
  # 设置别名
  git config --global alias.last 'log -1 head'
  
  # 使用
  git last
  ```

- 撤销暂存

  ```shell
  # 设置别名
  git config --global alias.unstage 'restore -S'
  
  # 使用
  git unstage a.txt
  ```

### 工作区域

要使用 Git 管理项目代码首先要建立一个仓库，有两种方式：

- 初始化一个本地仓库

  ```shell
  # 初始化本地仓库（默认将当前文件夹作为工作区域，也可指定dictionary目录作为工作区域）
  git init [dictionary]
  ```

- 从远程仓库导入

  ```shell
  # clone 远程仓库（默认以项目名作为工作区域，也可以指定以newProjectName作为工作区域）
  git clone xxx.git [newProjectName]
  ```

本地仓库中的文件不一定全部都要提交，我们可以创建一个忽略提交的文件，让 Git 不提交其中声明的文件：

- 创建 .gitignore 文件

  ```shell
  # 在项目根目录下
  echo *.log > .gitignore
  ```

  GitHub开源 [.gitignore 文件模板](https://github.com/github/gitignore) 可以直接使用。

### 工作树状态

- **查看状态**

  ```shell
  # 状态详细信息
  git status
  
  # 状态简要信息（--short）
  # 简要信息中，红色字符表示未暂存，绿色表示已暂存。?? 表示未跟踪文件，M 表示已修改，MM 表示暂存后又修改未暂存，A 表示新跟踪的文件，AM 表示新跟踪的又修改了未暂存，D 表示已删除
  git status -s
  
  # 查看尚未暂存的文件变更（工作区中）
  git diff
  
  # 查看已暂存的文件变更（暂存区中，同--cached）
  git diff --staged
  ```

- **查看提交历史记录**

  ```shell
  # 按提交时间倒序排列，依次展示每次提交的 SHA-1 校验和、作者的名字和电子邮件地址、提交时间以及提交说明。
  git log
  
  # 查看统计信息
  ## 展示每个文件变更统计和所有文件统计
  git log --stat
  ## 只展示所有文件的统计
  git log --shortstat
  
  # 查看详细信息，查看每次提交的差异
  git log -p
  ## 该命令等价于 show 命令
  
  # 查看最新一次提交记录的详细信息，可以指定具体的提交号来查看某次提交
  git show [SHA-1]
  
  # 查看简要信息，只显示SHA-1校验和、提交说明
  git log --oneline
  
  # 展示分支合并树形图 --graph 参数
  
  # 美化输出实践
  git log --pretty=format:'%Cgreen%h%Creset - %C(yellow)%cd %C(white)%s %C(bold blue)<%an> %C(dim cyan)<%ce>' --date=format:'%Y-%m-%d %H:%M:%S'
  
  # 输出过滤参数
  过滤数量 -n ，比如查询 5 条 -5 
  过滤作者 --author=
  过滤日期 --before=2020-10-01 --after=2020-10-01
  过滤提交说明 --grep=
  不显示合并提交 --no-merges
  ```

  参考 [格式化输出选项](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2#pretty_format)、 [格式化输出颜色](https://www.cnblogs.com/bellkosmos/p/5923439.html)，效果如下：

  ![美化输出](https://pycrab.github.io/KeepJava/assets/media/tools-git-log-pretty.png)

### 记录文件变更

- **跟踪命令**

  ```shell
  # 跟踪文件，将工作区中的文件放到暂存区（文件名）
  git add xx.java yy.java
  
  # 跟踪文件，将工作区中的文件放到暂存区（相对路径，这里 . 表示当前目录下的所有文件）
  git add .
  
  # 跟踪文件，将工作区所有变更的文件放到暂存区
  git add -A 或者 git add --all
  ```

- **提交命令**

  ```shell
  # 提交文件，将暂存区内的所有文件提交到本地仓库（message 为提交信息）
  git commit -m "message"
  
  # 跳过暂存区，直接将工作区中的文件提交到本地仓库
  git commit -a -m "message"
  
  # --author="username <mail>" 可以指定提交作者信息
  ```

### 远程仓库

远程仓库我们都会起个别名来替代 URL 地址，默认为 origin。

- **添加远程仓库**

  ```shell
  # 方式一：clone 远程仓库，会自动建立默认 master 分支的本地仓库，默认仓库名为 origin
  git clone [-o <shortname> -b <branch>] xxx.git
  
  # 方式二：初始化好本地仓库后，关联远程仓库
  git init
  git remote add <shortname> <url>
  ```

- **重命名远程仓库**

  ```shell
  git remote rename shortname newname
  ```

- **删除本地仓库与远程仓库的关联**

  ```shell
  git remote remove newname
  ```

- **查看远程仓库信息**

  ```shell
  # 查看别名
  git remote
  
  # 查看别名和地址
  git remote -v
  
  # 查看仓库和分支信息
  git remote show newname
  ```

- **推送和拉取（同步）**

  ```shell
  # 抓取最新代码
  git fetch <remote-name> <remote-branch>:<local-branch>
  
  # 拉取并合并最新代码
  git pull <remote-name> <remote-branch>:<local-branch>
  
  # 推送到远程分支
  git push <remote-name> <local-branch>:<remote-name>/<remote-branch>
  ```

### 打标签

- **查看标签**

  ```shell
  # 列出v1.0前缀的标签
  git tag -l "v1.0*"
  
  # 查看某个标签
  git show v1.0
  ```

- **创建标签**

  ```shell
  # 创建轻量标签
  git tag v1.1
  
  # 创建说明标签
  git tag -a v1.2 -m "version 1.2"
  
  # 给某次提交打标签
  git tag -a v1.3 9fce021
  ```

- **共享标签**

  ```shell
  # 标签需要手动推送到远程仓库
  git push <remote-name> <tagname>
  
  # 推送所有标签到远程
  git push <remote-name> --tags
  ```

- **删除标签**

  ```shell
  # 删除本地标签
  git tag -d v1.3
  
  # 直接删除远程仓库标签
  git push <remote-name> --delete <tagname>
  
  # 本地删除后推送到远程仓库
  git push <remote-name> :refs/tags/<tagname>
  ```

- **检出标签**

  ```shell
  # 仅查看
  git checkout v1.0
  
  # 需要修改
  git checkout -b branchV1.0 v1.0
  ```

## Git 分支

​		为什么需要分支？分支使得我们可以从开发主线上抽离出来工作，从而不影响主线开发。为了真正理解 Git 处理分支的方式，我们需要了解一下 Git 是如何保存数据的。执行以下命令：

```shell
# 新建 a.txt 文件
git add a.txt
git commit -m "first commit"
git push origin master:origin/master

# 新建 b.txt 文件，并修改 a.txt 文件
git add b.txt a.txt
git commit -m "second commit"

# 打标签
git tag -a v1.0 -m "标签信息" 
```

让我们通过下图看一下 Git 内部原理：

![Git 内部原理之对象关系图](https://pycrab.github.io/KeepJava/assets/media/tools-git-internal.png)

​		当使用 `git add` 进行暂存 / 跟踪操作时，首先会为每一个文件计算校验和（SHA-1 哈希算法），然后会把当前版本的文件快照保存到 Git 仓库中 （Git 使用 *blob* 对象来保存它们），最终将校验和加入到暂存区域等待提交。

​		当使用 `git commit` 进行提交操作时，Git 会先计算暂存区的校验和， 然后在 Git 仓库中将校验和保存为树对象，树对象拥有指向数据对象的指针。随后，Git 便会创建一个提交对象， 它除了包含作者的姓名和邮箱、提交说明以及指向它的父提交对象的指针外，还包含指向树对象的指针。

::: tip 总结

可以看到，每个提交对象（除了第一次提交）都有一个指针指向上一次的提交对象。

而 Git 的分支，其实本质是就是指向提交对象的可变指针。每次提交后，当前分支的指针都会移动并指向最新的提交。

:::

​		由于每个工作区域只能有一个活跃的分支，如果有多个分支的话，我们怎么知道当前活跃分支是哪一个分支呢？很简单，Git 有一个特殊的指针名叫 HEAD，它指向当前活跃分支，所以它也可以称为当前分支的别名。当 Git 初始化仓库时，默认初始化一个 master 分支，HEAD 指针就指向 master 分支。

### 分支命令

- **查看分支**

  ```shell
  # 查看本地分支，* 号代表 HEAD 当前指向的分支
  git branch
  
  # 查看所有分支，包括远程分支
  git branch -a
  
  # 查看本地分支及其最后一次提交记录
  git branch -v
  
  # 查看本地分支及跟踪分支，以及和跟踪分支的差距（落后 behind，领先 ahead），运行此命令需要先 `git fetch --all` 来抓取所有远程仓库
  git branch -vv
  ```

- **创建分支**

  ```shell
  # 创建分支（但不切换当前分支），默认指向最新提交
  git branch <branch-name>
  ```

- **切换分支**

  ```shell
  # 切换已存在分支
  git checkout <branch-name>
  
  # 创建并切换分支，此时 HEAD 也指向切换的分支
  git checkout -b <branch-name>
  
  # 创建/重置并切换分支
  git checkout -B <branch-name>
  
  # 切换分支并绑定远程分支，默认会绑定远程同名分支，这里可以指定本地分支别名
  git checkout <branch-name> <remote-name>/<remote-branch-name>
  
  # 修改当前分支绑定的远程分支
  git branch -u <remote-name>/<remote-branch-name>
  # 或者
  git branch --set-upstream-to=<remote-name>/<remote-branch-name>
  ```

- **删除分支**

  ```shell
  # 删除本地分支（强制不保存删除需使用 -D 参数）
  git branch -d <branch-name>
  
  # 删除远程分支
  git push origin --delete <branch-name>
  ```
  
- **合并分支**

  ```bash
  # 切换到要合并的分支 dev
  git checkout dev
  
  # 将 dev 合并到 master 分支
  git merge master
  ```

### 整合分支

当我们克隆远程仓库并开发后，当前分支树上会有两个标识，一个 branchName 表示本地当前分支所指向提交，如 master；一个 remoteName / branchName 表示远程分支所指向的提交，如 origin/master。

当在多个开发分支上进行提交，那么在仓库主分支上就产生了分叉，我们需要进行合并或者变基操作使得主分支提交不分叉。

- **合并 merge**

  - 如果开发分支 dev 的直接祖先正好是 master 分支指向的提交，那么可以进行快速合并（master 分支和 dev 分支都指向最新提交）
  - 如果开发分支 dev 的直接祖先不是 master 分支指向的提交，即产生了分叉，那么 merge 合并命令会将 dev 分支的提交以及分支共同直接祖先进行三方自动合并，然后生成一个新的快照并提交，同时 master 分支和 dev 分支都指向最新提交
  - 如果分叉处修改了同一个文件产生了冲突，那么 Git 无法完全执行默认的自动合并，Git 会暂停等待用户手动决定如何合并冲突的文件，合并完后需要将合并的文件保存到暂存区，这时 Git 会标识冲突已解决，并产生一条新的提交记录进行提交

- **变基 rebase**

  rebase 变基命令 `git rebase master` 会以指定分支 master 作为基础，将当前分支与共同祖先的提交对比，提取当前分支的修改保存为临时文件，然后根据临时文件创建一次提交指向指定基础分支 master 上。

  - `git rebase master dev` 在master 分支上将 dev 分支变基到 master 上
  - `git rebase --onto master feature1 feature2` 在 master 分支上将 feature2 有但 feature1 没有的提交变基到 master 上

  执行变基后，master 分支往往会落后 dev，需要执行一次 `git merge dev` 进行快速合并。

::: danger 警告

变基会将并行的开发提交记录转变为串行的提交记录，使得提交记录更简洁。

只对提交到本地的修改进行变基，不要对推送到远程的提交进行变基！！！

:::

### 分支开发工作流

- 长期分支
- 主题分支

## Git 工具

这里仅列出经常使用的工具命令，更多工具请参考 [Git 工具](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%80%89%E6%8B%A9%E4%BF%AE%E8%AE%A2%E7%89%88%E6%9C%AC) 原文。

### 凭证存储

如果使用 SSH 连接远程仓库，则可以安全传输数据，配置密钥登录步骤：

- 本机生成密钥 `ssh-keygen -t rsa -C "mail@qq.com"`，默认会保存在用户目录下的 `~/.ssh` 目录中
- 复制 ssh 目录下的公钥 `id_rsa_pub` 中的内容配置到 Git 远程仓库中

如果本地已经存在密钥，而我们需要给项目单独生成密钥，则需要以下步骤：

- 本机生成密钥 `ssh-keygen -t rsa -C "mail@qq.com`，但是注意在交互时第一步要指定保存该密钥的文件夹，比如 `~/.ssh/github/`，防止覆盖本机已有密钥

- 在 `.ssh` 目录下新建 config 文件 `touch config` （如果不存在），并写入配置：

  ```bash
  # 本地仓库配置的远程仓库域名（git remote）
  Host github.com
  
  	# 远程仓库域名
  	HostName github.com
  
  	# 指定远程端口，默认 22
  	Port 22
  
  	# 指定 git 提交时使用该配置
  	User git
  
  	# 指定密钥目录
  	IdentityFile ~/.ssh/github
  
  	# 
  	IdentitiesOnly yes
  ```

但是如果使用 HTTP 协议来传输，则需要每次都输入账号和密码。我们可以选择存储 HTTP 凭证：

- 存储在内存中，15分钟过期 `git config --global credential.helper cache`
- 明文存储在硬盘中，永不过期 `git config --global credential.helper store`

::: warning 常见问题

有时候我们修改了远程 Git 仓库的账号密码，本地仓库进行推拉操作时会提示连接被拒绝 `connection refused` 或者拒绝访问 `Access Denied`，这时需要清空一下本地存储的凭证信息

`git config --global --unset credential.helper`

:::

### 临时保存文件

```shell
# 保存所有的文件（非保存到暂存区，不影响切换分支等操作）
git stash

# 取出最后一次保存的文件
git stash pop
```

### 修改提交

```shell
# 修补提交，比如刚提交完，需要修改提交信息或者将漏提交的补上，流程如下：
git commit -m "not complete"
git add last
git commit --amend [--no-edit]

# 修改最近一次提交作者信息
git commit --amend --author="username <email>"

# 修改最新三条提交信息(edit 模式交互式，配合 git commit --amend 可以修改作者信息) / 排序提交历史（:m+n） / 合并提交(f 模式)
git rebase -i HEAD~3

# 远程仓库合并提交（容易挨打，轻易不要使用）
git rebase -i head~5 --root
```

### 版本回退

```shell
# 本地分支回退到某个提交
git reset --hard commit_id
```

### 撤销更改

```shell
# 对已跟踪但是未放到暂存区的文件，撤销更改
git restore a.txt

# 将暂存区的文件，移到工作区，撤销暂存状态
git restore -S a.txt 或者 git restore --staged a.txt

# 将暂存区的文件，移到工作区，撤销暂存状态
git reset head a.txt

# 撤销对一个文件的全部修改，重置到上次提交的样子
git checkout -- a.txt

# 撤销本地仓库全部文件更改
git fetch --all
git reset --hard origin/master
```

### 删除文件

```shell
# -r 表示递归文件夹

# 重命名已跟踪的文件
git mv a.txt b.txt
# 以上重命名相当于以下三个操作
mv a.txt b.txt
git rm a.txt
git add b.txt

# 如果删除的是已 commit 提交过的文件，都可以通过 restore 命令恢复；
# 如果删除的是未提交过
## 如果在暂存区中
### 使用 --cached 参数可以恢复到工作区
git rm [-r] --cached a.txt

### 使用 -f 参数会永久删除，不可恢复
git rm [-r] -f a.txt
## 如果已跟踪并且在工作区中，即状态为 AM，这时候就没办法了，只能 -f 永久删除，因为恢复会冲突，没有其它操作了

# 以上删除相当于以下两个命令
rm [-f][-r] a.txt
git add a.txt
```

### 子模块

[官方文档](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97) Git 子模块允许将一个 Git 仓库作为另一个 Git 仓库的子目录，同时还保持各仓库独立提交。使用子模块会创建一个 .gitmodules 文件，该文件会受版本控制需要提交，同时会根据 .gitmodules 创建一个以子模块命名的目录，该目录不受版本控制。

**子模块添加与移除**

```bash
# 在工作目录添加子模块，然后提交
git submodule add remote-url

# 在工作目录移除子模块，然后提交
git rm -rf 子模块目录名
```

**在主项目上工作**

主项目默认跟踪子模块的 maser 分支，也可以指定分支，比如指定 DbConnector 子模块的分支为 stable 并提交子模块配置文件：

`git config -f .gitmodules submodule.DbConnector.branch stable`，如果只在本地使用，不推送到远程，则不用  `-f .gitmodules` 选项

```shell
# 直接将项目及嵌套子模块全部克隆，同时会初始化子模块目录
git clone --recursive remote-url

# 初始化以子模块命名的空目录
git submodule init

# 抓取当前项目最新数据并初始化子模块目录（如果还没克隆则直接将子模块克隆到本地）
git submodule update

# 如果远程新增了子模块，本地需要初始化新子模块的目录，使用 --recursive 选项进行递归嵌套子模块
 git submodule update --init
 
# 如果别人修改了子模块，需要拉取子模块最新代码（或者进入子模块目录手动拉取最新代码）
git submodule update --remote

# 如果远程修改了子模块的 URL 地址，这会导致本地更新子模块失败，需要更新配置
git submodule sync --recursive
```

::: warning 提示

使用 `git pull` 命令仅仅是拉取了最新更新，但是主项目并不采用子模块的最新更新，需要使用 `git submodule update` 来更新对子模块的引用

- 可以使用 `git pull --recurse-submodules` 合并两个命令
- 也可以配置 `git pull` 默认更新子模块 `git config submodule.recurse true`

配置 `git config status.submodulesummary 1` 可以直接在主项目中查看子模块的更新摘要 status

使用 `git log -p --submodule` 可以查看子模块更新摘要

:::

**批量操作 foreach**

```shell
# 保存所有子模块进度
git submodule foreach 'git stash'
# 所有子模块新建分支并切换
git submodule foreach 'git checkout -b featureA'
```

## Git 工作流程

- 在 Git 代码仓库托管平台注册账户
- 组长分配仓库权限便可看到项目，或者自己创建项目
- 拉取项目仓库代码，可以配置 SSH 或者设置本地保存 HTTP 凭据
- 配置仓库提交用户信息
- 分支开发工作流

## 本文小结

​		这篇文章对 Git 官网文档的长篇大论作了简要总结，仅仅介绍了 Git 使用过程中必知的知识点和一些进阶操作，也可作为常用命令的查询手册。现在各种 IDE 开发工具都内置了 Git 插件及工具，比命令行方式操作更简单，推荐使用。当遇到更多问题 IDE 难以解决时，可查看官方文档，通过命令行的智能提示来进行解决。