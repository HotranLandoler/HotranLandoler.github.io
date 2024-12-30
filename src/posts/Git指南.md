---
title: Git指南
slug: git-guide
pubDate: 2023-01-04
description: 版本控制工具Git使用指南
tags: ["version-control"]
---

- `status`
- `init` 创建 repo
  - 不要在一个 repo 中创建 repo
  - 删除`.git`文件夹来删除 repo
- `add`
  - `add .` 添加所有改动
- `commit` 提交，启动一个文本编辑器
  - `commit -m "message"`
  - 提交应原子化：每个提交关注一个功能\改动\修复
  - Message 使用现在时：“make xx do yy”，如同对代码下达命令
  - `--amend` 修改前一提交
  - `-a` 添加所有改动并提交
- `log` 历史提交
  - `--oneline` 简洁显示
- **.gitignore**
  - `folder/` 忽略文件夹
  - `*.log` 忽略 log 文件
- `diff` 列出所有尚未添加的改动 （与 staging area 比较）
  - `diff HEAD` 列出 HEAD 以来的改动（HEAD 与当前工作目录比较）
  - `--staged` / `--cached` 列出 staging area 和上一次提交之间的改动
  - `diff [HEAD, --staged] [filename]` 指定文件
  - `diff branch1..branch2` 对比两个分支（头部）
  - `diff commit1..commit2`
- `stash` （切换分支前）保存所有未提交（未准备好提交）的改动，先撤销这些改动，保存到他处，后续再恢复
  - `stash pop` 恢复
  - `stash apply` 恢复但不从 stash 移除（需要应用于多个分支时）
  - stash 多次，使用`stash list`查看 stash
    - `stash apply stash@{id}`
    - `stash drop [stash]` 删除
    - `stash clear`
- `rebase` 代替 merge 的一种方式
  - `rebase -i` 修改提交历史
- `reflog show <ref>` 显示某一 ref 的记录，默认 HEAD

  - `reflog master@{2.days.ago}`
  - `reset --hard` 撤销改动后，可查看 reflog，再用`reset --hard [ref]`来恢复

- Config 指令别名
  - `[alias] s = status`

## 工作流

对每个功能单独分支，开发完成后再合并到主分支。

1. 本地建立一个分支 some-feat，针对某一功能做了开发
2. 完成后，将分支推送到 Github： `git push origin some-feat`
3. 对该分支发起一个 pull request 请求合并
4. 和团队成员讨论该分支，同意后 pull request 被接受，然后被合并入主分支。最后删除 some-feat 分支：`git branch -d some-feat`

## 分支

- 默认分支: `master`（Github 为`main`）
- **HEAD**：指向当前分支，当前分支指向最新提交
- `branch` 查看所有分支
  - `branch xx` 基于当前 HEAD 创建新分支 xx（但不会切换到新分支）
  - `-d` 删除分支（非当前分支）
  - `-m` 重命名当前分支
- `switch xx` 切换到分支 xx
  - `-c` 创建分支 xx 并切换
  - 切换前需要提交已做的改动
- `checkout` 切换分支旧方法，能做的比`switch`多
  - `-b` 创建并切换
- `merge` 融合到当前分支
  - Fast forward merge：当前分支没做其他工作，只需赶上目标分支
  - 其他情况：会产生一个 merge commit
  - 解决冲突：进入文件根据指示符修改，或使用 vscode 等工具

## 撤销改动

- `checkout [commit hash]` 查看某一先前提交，回到当时的状态
  - Detached HEAD：HEAD 不再指向分支，转而指向目标提交，此时可以到处看看。切换分支即可重新 attach。此时也可以创建并切换到新分支做出改动
    - `switch -` 撤销，回到先前的分支
  - 相对引用：`HEAD~2` HEAD 的前数第 2 个提交
  - `checkout HEAD [filename]` 撤销上次提交以来的文件改动（**尚未添加**）
    - `checkout -- [filename]`
- `restore [filename]` 等同于`checkout HEAD [filename]`
  - `restore --source HEAD~1 [filename]` 指定 source 为前一个提交
    - 再执行`restore [filename]` 可回到最近的提交
  - `restore --staged [filename]` 将**已添加**的改动从 staging 移除
- `reset [commit-hash]` 删除目标提交之后的提交，但改动还在
  - `reset --hard [commit]` 删除提交和改动
- `revert [commit]` 撤销并产生一个新提交（在**团队合作**中这样做更好）

## 远程库

- `remote` 查看现有远程库

  - `-v` 更多信息

  - `remote add [name] [url] ` 添加远程库

  - `remote rename [old] [new]`

  - `remote remove [name]`

- `push [remote] [localbranch]`

  - `push origin master` 将本地 master 分支推送到 origin
  - `push [remote] [localbranch]:[remotebranch]` 推送到不同分支
  - `-u origin master` 设置好上游，下次只需执行`push`

- Remote tracking branch: `origin/[branch]`
- `switch [branch]` 会自动连接远程库的同名分支
- `fetch [remote]` 同步到本地的 remote branch，不影响自己的工作目录。默认为 origin
  - `fetch [remote] [branch]`
- `pull [remote] [branch]` 同步，并将内容 merge 到当前的本地分支
  - `pull` 从 origin 的同名分支同步

## Tag

- 可视为对一个提交的标签
- 语义化版本：

  - 大版本.小版本.补丁
  - 1.0.0 版本代表 public API
  - 补丁：修复 bug，小改动
  - 小版本：新功能，但向下兼容
  - 大版本：大改动

- `tag` 查看现有 tag
  - `tag -l "*beta*"` 使用通配符查找
  - `tag <name> [commit]` 创建轻量级 Tag，默认指向 HEAD
  - `tag -a <name>` 创建 Annotated Tag，添加额外信息
  - `tag -d <name>` 删除 Tag
- `show <tag>` 查看 Tag 信息
- `checkout <tag>` 查看 tag 当时情况（进入 Detached HEAD）
- `diff <tag1> <tag2>` 对比
- 默认 push 不包含 Tag
  - `push origin <tag>` 推送 Tag 到远程库
  - `push origin --tags` 推送所有 Tag
