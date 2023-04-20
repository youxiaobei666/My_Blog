# node 基础\_fs 文件系统模块

## 1. 写入内容到文本文件里

:::tip
Node.js 文件系统（`fs` 模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 `fs.readFile() `和同步的 `fs.readFileSync()`。
异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。
建议大家使用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。
:::

导入模块，使用 `writeFile` 方法————异步写入

:::tip
`writeFile` 接收 3 个参数，分别为：

文件路径：string

内容：string

回调函数：function(err){ } ,其中 `err` 为写入错误
:::

**writeFileSync**

～ 使用 `writeFileSync` 方法————同步写入

:::tip
`writeFileSync` 接收 2 个参数，分别为：

文件路径：string

内容：string
:::

**createWriteStream**

～ 流式写入

:::tip

1. 创建流式写入实例，传入路径为参数

2. const ins = fs.`createWriteStream`(文件路径)

3. 通过 `ins.write(内容) `写入

4. 关闭：`ins.close()`

:::

**appendFileSync**

~ 追加内容

1. 同步追加：通过 fs.`appendFileSync`(文件路径, 内容)

2. 异步追加：通过 fs.`writeFile` 函数第四个参数实现（见代码）

```js
const fs = require("fs"); // 导入 file system 模块

// 异步写入文件
fs.writeFile("./files/01.txt", "被异步写入的内容", (err) => {
  if (err) {
    console.log(err.message); // 输出错误信息
    return;
  } else {
    console.log("成功写入文件./files/01.text");
  }
});

// 同步写入文件
fs.writeFileSync("./files/02.txt", "被同步写入的内容");

// 流式写入 fs.createWriteScream
const ws = fs.createWriteStream("./files/03.txt"); // 创建流式写入实例，传入路径为参数
ws.write("鹅鹅鹅\r\n"); // 写入
ws.write("曲项向天歌\r\n");
ws.write("白毛浮绿水\r\n");
ws.write("红掌拨清波\r\n");

ws.close(); // 关闭流

// 异步追加写入  \r\n 表示换行
fs.appendFile("./files/01.txt", "\r\n这是在01.txt文件内追加的内容", (err) => {
  if (err) {
    console.log("追加失败！");
  } else {
    console.log("追加成功！");
  }
});

// 同步追加
fs.appendFileSync("./files/02.txt", "\r\n这是在02.txt文件内同步追加的内容");

// 使用fs.writeFile 实现异步追加写入
fs.writeFile(
  "./files/01.txt",
  "\r\n被使用fs.writeFile写入的内容",
  { flag: "a" },
  (err) => {
    if (err) {
      console.log(err.message); // 输出错误信息
      return;
    } else {
      console.log("成功写入文件./files/01.text");
    }
  }
);
```

## 2. 从文本文件中读取内容

**～异步读取 readFile**

fs.`readFile`(文件路径，回调函数)

回调函数：参数\*2 （err，data）, data 为 读取的内容

读取的内容：读取的格式为 `buffer`，buffer.toString 转为 utf-8 字符

**～同步读取 readFileSync： 只接收一个路径参数，值用变/常量接收**

**～流式读取 ReadStream**

:::tip

1. const ins = fs.createReadStream(文件路径)

2. ins.on("data",回调函数)

回调函数：接收一个读取块 `chunk` 参数

3. ins.close(回调函数）

:::

```js
const fs = require("fs");

// 异步读取
fs.readFile("./files/03.txt", (err, data) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(data.toString()); // buffer.toString 转为utf-8 字符
  }
});

// 同步读取 readFileSync
const date2 = fs.readFileSync("./files/03.txt");
console.log(date2.toString());

/**
 * 流式读取
 */
const rs = fs.createReadStream("./files/img1.jpg");

// 读取
rs.on("data", (chunk) => {
  console.log(chunk.length);
});

// 结束
rs.close(() => {
  console.log("读取结束");
});
```

## 3. 路径问题、path 模块

绝对路径和相对路径的问题，如果把 node 执行的终端目录修改至上级目录，就会出现错误，建议使用绝对路径 \_\_dirname，或者使用 `path` 模块

```js
/**
 * 绝对路径和相对路径的问题
 */
const fs = require("fs");

// 相对路径
fs.writeFileSync("./index.html", "index"); // 在当前文件同级目录下新建文件
/**
 * 如果把node执行的终端目录修改至上级目录，就会出现错误
 * Error: Cannot find module '/Users/jiangchuanyou/Desktop/node/path.js'
 */

// 建议使用绝对路径 __dirname
console.log(__dirname); // Users/jiangchuanyou/Desktop/node/fs

// 使用绝对路径拼接相对的路径
fs.writeFileSync(__dirname + "/index.html", "拼接路径"); // 无需加符号：.

// 建议使用 path 模块
const path = require("path");
fs.writeFileSync(path.join(__dirname, "/index.html"), "path模块");
```

## 4. 读取文件信息

:::tip
fs.`stat` 查看文件资源信息

资源信息是回调函数中的第二个参数 `info`

一般需要判断是不是文件夹或者是文件，`info.isFile()` 函数判断是不是文件，`info.isDirectory() `判断是不是文件夹
:::

```js
/**
 * 查看文件资源信息
 */
const fs = require("fs");

fs.stat("./files/img1.jpg", (err, info) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(info); // 文件信息 dev: 16777234,
    // 判断是否为文件夹
    console.log(info.isFile()); // 是，返回true
    console.log(info.isDirectory()); // 不是，返回false
  }
});
```

## 5. 文件夹操作

:::tip
文件夹操作：创建、重命名、读取

普通创建：`fs.mkdir()`

递归创建： 配置`{ recursive: true }`实现递归

`fs.readdir()` 读取文件夹：读取的数据在第二个型参

添加递归强制删除含有子文件夹的文件夹：`fs.rm`(path, { recursive: true, force: true })

:::

```js
/**
 * 文件夹操作：创建、重命名、读取
 */
const fs = require("fs");

// 创建
fs.mkdir("./files_03", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("创建成功");
  }
});

// 递归创建 配置{ recursive: true }实现递归
fs.mkdir("./files_04/子文件夹1/子文件夹二", { recursive: true }, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("递归创建成功");
  }
});

// 读取文件夹,读取的数据在第二个型参
fs.readdir("./files", (err, files) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(files); // 读取结果
  }
});

// 删除
fs.rmdir("./files/要被删除的", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("删除成功");
  }
});

// 递归删除
fs.rmdir("./files/files_05", (err) => {
  if (err) {
    console.log(err.message); // 报错：directory not empty, rmdir './files/files_05'
  } else {
    console.log("删除成功");
  }
});

// 一般不让删除有子文件夹的文件夹
// 添加递归强制删除：fs.rm(path, { recursive: true, force: true })
fs.rmdir("./files/files_05", { recursive: true, force: true }, (err) => {
  if (err) {
    console.log(err.message); // 报错：directory not empty, rmdir './files/files_05'
  } else {
    console.log("删除成功");
  }
});
```

## 6. 删除文件

```js
/**
 * 删除文件
 */
const fs = require("fs");

// 方法一
fs.rm("./files/files_02/垃圾文件1", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("删除成功");
  }
}); // fs.rm 在 node 14.4 版本以上支持

// 方法二
fs.unlink("./files/files_02/垃圾文件2", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("删除成功");
  }
});
```

## 7. 复制文件

1. 第一种方式：流式复制，边读取边复制效率更高

2. 第二种方式：先读取，再复制，效率低

```js
/**
 * 案例:
 *      复制文件,
 *      第一种方式：流式复制，边读取边复制效率更高
 *      第二种方式：先读取，再复制，效率低
 * ps:  process.memoryUsage() 查看内存使用
 */
const fs = require("fs");

/**
 * 方法一
 */
// 1.读取流
const rs = fs.createReadStream("./files/img1.jpg");
// 2.写入流
const ws = fs.createWriteStream("./files/img2.jpg");
// 3.读取
rs.on("data", (chunk) => {
  // 4.把读取到的内容，同时写入
  ws.write(chunk, (err) => {
    if (err) {
      console.log("写入错误" + err.message);
    }
  });
});
// 5.结束
rs.on("end", () => {
  console.log("读取结束\r\n方法一使用内存如下");
  console.log(process.memoryUsage());
});

/**
 * 方法二
 */

const data2 = fs.readFileSync("./files/img1.jpg"); // 得到读取的数据
// 把读取的数据写入
fs.writeFile("./files/img3.jpg", data2, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("方法二内存使用:\r\n");
    console.log(process.memoryUsage());
  }
});
```

## 8. 更改文件路径和文件名、批量重命名

:::tip
`fs.rename` 更改文件路径，和文件名，批量重命名

小案例：

需求：1.你是谁.text -> 1\_你是谁.txt
:::

```js
/**
 * fs.rename 更改文件路径，和文件名，批量重命名
 **/
const fs = require("fs");

// 重命名
fs.rename("./files/03.txt", "./files/一首诗.txt", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("重命名成功");
  }
});

// 移动
fs.rename("./files/一首诗.txt", "./files/files_02/移动了这首诗.txt", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("移动成功");
  }
});

/**
 * 批量重命名
 * 需求：1.你是谁.text -> 1_你是谁.txt
 */

// 读取文件夹内容
const innerFiles = fs.readdirSync("./files_03");
// 输出一个数组
console.log(innerFiles); // [ '1.你是谁.txt', '2.事实上.txt', '3.宿舍.txt' ]
// 分离数字和中文
const newFiles = innerFiles.forEach((item) => {
  const data = item.split("."); // 分割 ：[ '1', '你是谁', 'txt' ]

  let [number, text, ext] = data; // 获取数字和文字
  // 数字小于10，在前面添加 0
  if (number < 10) {
    number = 0 + number;
  }

  // 合并
  const newName = number + "_" + text + "." + ext;

  // 写入
  fs.renameSync(`./files_03/${item}`, newName);
});
```
