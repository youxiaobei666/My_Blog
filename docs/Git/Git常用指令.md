# Git 基础知识

## 1. Git 是什么：

Git 是分布式版本控制系统（Distributed Version Control System，简称 DVCS），分为两种类型的仓库：`本地仓库和远程仓库`

## 2. 基本操作流程：

:::tip
第一步先新建仓库，本地 init ,然后提交分枝

链接仓库：Git remote  add origin 仓库链接 shh

提交代码：git push -u origin main
:::

## 3. Git 图示：

![img01](/images/Git/Git01.png)

## 4. 常用指令

| 指令                                       | scripts                                                                                                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 创建一个文件                               | touch filename                                                                                                                                         |
| Git name                                   | git config —global user.name                                                                                                                           |
| Gti email                                  | git config —global user.emaill                                                                                                                         |
| Git 查看状态                               | git status (查看项目处于什么状态，是否被提交[commit]或者添加[add])或者是本地。1. untracked 是未 add 的本地文件 2. changs to be commit 是即将提交的文件 |
| git 提交 readme                            | git commit -m “此次提交的描述”                                                                                                                         |
| Git 查看日志                               | git log                                                                                                                                                |
| Git log options 选项                       | —all 显示所有分支 —pretty=oneline 提交信息一行显示 —abbrev-commit 简短化输出的信息。--graph 以图像的形式显示                                           |
| 配置别名 alias, 用于输出提交日志的 git log | 新建 .bashrc 文件，配置 alias git-log = ‘ git log —pretty=oneline —all —graph —abbrev-commit’                                                          |
| Git 查看全部操作日志                       | git reflog                                                                                                                                             |
| Git 工作区到缓存区                         | git add . (全部文件) ｜ git add “文件名” （指定文件）                                                                                                  |
| git 不添加（忽略）某些文件                 | 在项目目录新建 .gitigonore 里面配置 _. “后缀名”（例如 _.vscode）                                                                                       |
| 版本控制 reset，后退、前进                 | git reset —hard “ID”, ID 在 log 日志信息里查看                                                                                                         |

## 5. 本地分支 branch 指令

| 指令                   | scripts                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| 查看分支 branch        | git branch                                                            |
| 新建分支               | git branch 分支名                                                     |
| 删除分支               | git branch -d 分支名                                                  |
| 强制删除分支           | git branch -D 分支名                                                  |
| 切换分支 checkout      | git checkout 分支名                                                   |
| 切换并创建 checkout -b | git checkout -b 分支名                                                |
| 把分支合并 merge       | git merge 要合并的分支名 ps: git checkout main \| git merge branch_01 |
| 分支冲突               | 自行删除 《〈《〈 HEAD 主干内容 === === 分支内容 〉》〉》branch       |

### 远程指令

| 指令             | scripts                         |
| ---------------- | ------------------------------- |
| 添加远程连接     | git remote rm origin            |
| 删除远程连接     | git remote rm origin            |
| 查看远程分支     | git branch -a                   |
| 删除某个远程分支 | git push origin --delete 分支名 |

## 6. 分支的企业知识：

:::tip
在实际开发中，企业一般会将 master/main 分支作为生产 production 分支

Develop 分支作为开发分支，在 develop 分支之后 feature 分支作为小分支， feature 可删除，feature 完成一阶段后

一个整体的 develop 分支会作为一个小版本 release 合并 merge 到主分支 main。

还有一些 hotfix 修复 bug 分支
:::

![img02](/images/Git/Git02.png)
