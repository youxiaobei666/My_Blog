# 准备工作

## 安装 git

:::tip
mac 电脑自带 git
:::

## 打开终端,拿到本地的公钥

执行如下命令：下面引号内步填写你自己的 注册 github 的邮箱

```
ssh-keygen -t rsa -C "your_email@youremail.com"
```

输出说明 公共 key 在 /User/jiangchuanyou/.ssh/id_rsa_pub 目录下；

终端操作：

```
// 在根目录～下
cd .ssh

// 查看文件
ls

// 进入id_rsa.pub
vi id_rsa.pub

// 复制文件后 按 Esc 再输入 :q 退出
```

## 在 github 创建 ssh 密钥

看图：
![img01](/images/Git/Github生产ssh密钥.png)

把你本地的公钥复制到如下，然后点击生成。
![img02](/images/Git/github网站生成ssh截图.png)
