# 原生 http 和 express+mysql

## 1. http 开启服务

### 1.1 http 模块

:::tip
使用 http.createServer 开启服务，得到实例后，用 .on 方法接收参数，.listen 方法启动 node 服务，同时设置端口 02_get&post 参数
:::

```js
const http = require("http");

/**
 * 监听客户端请求事件,回调函数接收请求 req 和结果 res 参数
 */
const server = http.createServer((req, res) => {
  console.log("客户端请求了一次");
  const url = req.url; // 请求的地址
  const method = req.method; // 请求的方法
  const responseMessage = `地址是 ${url},方法是 ${method}`; // 响应体

  // 使用 setHeader 方法设置相应头可解决乱码问题
  res.setHeader("Content-type", "text/html; charset=utf-8");

  res.end(responseMessage); // res.end() 回应客户端
});

// 启动服务器
server.listen(8080, () => {
  console.log("服务器启动成功！");
});
```

### 1.2 404 NotFound 案例

:::tip
设置响应头,可解决乱码问题，res.setHeader("Content-type", "text/html; charset=utf-8");
:::

```js
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  const url = req.url;
  // 初始化 content 的值
  var content = "";
  // 根据请求路径，展示不同的页面内容
  if (url === "/" || url === "/index") {
    content = "<h2>首页</h2>";
  } else if (url === "/login") {
    content = "<h2>登陆页</h2>";
  } else {
    content = "<h2>404 NOT FOUND</h2>";
  }

  // 设置响应头,可解决乱码问题
  res.setHeader("Content-type", "text/html; charset=utf-8");
  // 回应客户端
  res.end(content);
});
// 开启服务器
server.listen("8080", () => {
  console.log("服务已开启");
});
```

## 2. express 开启服务

### 2.1 express

:::tip
导入 express 模块，初始化实例，定义中间件后面使用，使用中间件，app.listen（端口，回调）开启服务
:::

```js
// 导入 express 模块
const express = require("express");

// 初始化实例
const app = express();

// app.use((req, res, next) => {
//   const time = Date.now();
//   // 把时间共享给后面的所有路由
//   req.startTime = time;
//   next();
// });

// 定义中间件后面使用
const mv = (req, res, next) => {
  const time = Date.now();
  // 把时间共享给后面的所有路由
  req.startTime = time;
  next();
};

// 根路径 使用中间件
app.get("/", [mv], (req, res) => {
  res.send("Home page." + req.startTime);
});

// user路径 使用中间件
app.get("/user", [mv], (req, res) => {
  res.send("User page." + req.startTime);
});

app.listen(8080, () => {
  console.log("服务已开启");
});
```

### 2.2 mysql 数据库连接

:::tip
使用 mysql2 模块连接数据库，初始化实例，并传入配置对象，配置连接参数，定义一个请求语句 "SELECT \* FROM demo1.userinfo"，使用 query 方法传入参数（语句，回调），结束连接。
:::

```js
/**
 * 使用 mysql2 模块连接数据库
 */

const mysql = require("mysql2");

// 初始化实例，并传入配置对象
const connection = mysql.createConnection({
  // 配置连接参数
  host: "localhost", // 本地
  user: "root", // 用户
  password: "yjc010203.", // 密码
  port: 3306, // 端口
  database: "demo1", // 数据库的名称
});

// 开始连接
connection.connect();

// 定义一个请求语句 "SELECT * FROM demo1.userinfo"
const select_message = "SELECT * FROM demo1.userinfo";
connection.query(select_message, (err, res) => {
  if (err) {
    throw Error("the connect is errow!");
  }
  res = JSON.stringify(res);
  console.log(res);
});

connection.end(); // 结束连接
```

### 2.3 mysql+express

```js
/**
 * 请求
 */
const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "yjc010203.",
  database: "demo1",
});

connection.connect();

let data = "";
connection.query("select * from demo1.userinfo", (err, res) => {
  if (err) {
    throw Error("错误");
  }
  data = JSON.stringify(res); // 存储数据
});

connection.end();

/**
 * 服务端
 */
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.setHeader("Content-type", "text/html;charset=utf-8");
  // * 设置可跨域
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  //   res.header("Access-Control-Allow-Headers", "content-type");
  res.end(data); // 返回数据
});

app.listen(8080, () => {
  console.log("服务开启在 8080 端口");
});
```
