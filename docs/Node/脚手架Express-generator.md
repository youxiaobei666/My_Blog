# 脚手架 Express-generator

## 1. 基本介绍

Express-generator 脚手架，可以快速创建一个 express 应用项目，官网：
[Express application generator](http://expressjs.com/en/starter/generator.html#express-application-generator)

### 1.1 下载：全局安装

```
npm install -g express-generator
```

### 1.2 创建一个 express-ejs 项目：

```
express -e
```

创建好后下载依赖：

```
npm install
```

### 1.3 项目目录（不包含依赖）：

```
.
├── app.js
├── bin
│ └── www
├── package.json
├── public
│ ├── images
│ ├── javascripts
│ └── stylesheets
│ └── style.css
├── routes
│ ├── index.js
│ └── users.js
└── views
├── error.pug
├── index.pug
└── layout.pug
```

### 1.4 运行

```
npm run start 或者
npm start
```

### 1.5 如何访问项目？从哪里得知端口？

我们来到 bin/www 文件中：

![img01](/images/Node/express_jenerator01.png)

## 2. 文件介绍：

### 2.1 app.js

这个文件中并不包含端口而且也不是直接用 node 去运行这个文件，我们会把这个文件导出给 www 文件使用，里面导入路由和一些依赖，还有路由的导入以及匹配页面，再包含处理错误的 404 页面。详细看代码注释：

```js
var createError = require("http-errors"); // 创建错误模块
var express = require("express");
var path = require("path"); // 路径模块
var cookieParser = require("cookie-parser"); // 请求体解析插件
var logger = require("morgan"); // 请求体解析插件

// 导入两个路由规则
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// 设置视图引擎
app.set("views", path.join(__dirname, "views")); // ejs 文件都在 views 文件夹里
app.set("view engine", "ejs"); // ejs

app.use(logger("dev")); // 日志
app.use(express.json()); // 来处理post 请求参数的,post的请求参数有两种,一种是表单方式,另外一种弄是json形式的.
app.use(express.urlencoded({ extended: false })); // 表单方式请求体解析
app.use(cookieParser()); // cookie 解析
app.use(express.static(path.join(__dirname, "public"))); // 静态资源目录

app.use("/", indexRouter); // 匹配到 '/'路径 使用 index 路由
app.use("/users", usersRouter); // 匹配到 '/user'路径 使用 user 路由

// 404 错误
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function (err, req, res, next) {
  // 设置本地变量，仅在开发过程提供错误
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // 渲染错误页面
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app; // 导出给 www 文件使用
```

### 2.2 www 文件

:::tip
WWW 是环球信息网的缩写，(亦作“Web”、“WWW”、“'W3'”，英文全称为“World Wide Web”)，中文名字为“万维网”，"环球网"等，常简称为 Web。
:::

这个文件也是一个 js 文件,在 bin 文件夹中 ,里面导入 app.js 文件，和一些依赖。

主要用于设置端口和开启服务，并处理服务器错误。详细看代码注释：

```js
#!/usr/bin/env node

/**
 * 依赖
 */

var app = require("../app");
var debug = require("debug")("11-express:server");
var http = require("http");

/**
 * 从环境中获取端口并存储在 Express 中。
 */

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port); // 设置端口号

/**
 * 创建服务
 */

var server = http.createServer(app); // app.js 在这被创建服务

/**
 * 在所有网络接口上监听提供的端口。
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * 将端口规范化为数字、字符串或 false。
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // 命名管道
    return val;
  }

  if (port >= 0) {
    // 端口数字
    return port;
  }

  return false;
}

/**
 * HTTP 服务器“错误”事件的事件侦听器。
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // 使用友好的消息处理特定的侦听错误
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * HTTP 服务器“侦听”事件的事件侦听器。
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
```

### 2.3 ejs 文件

这个文件是 html 模版,渲染对应的结构响应给用户，统一放在 views （视图） 文件夹中。

其中一个 ejs 文件

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <!-- 导入样式 -->
    <link rel="stylesheet" href="/stylesheets/style.css" />
  </head>
  <body>
    <h1><%= title %></h1>
    <!-- title 参数在 路由规则里面传入-->
    <p>Welcome to <%= title %></p>
  </body>
</html>
```

返回给用户，在 router / index.js 文件里

```js
var express = require("express");
var router = express.Router();

/* 主页 */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
```

### 2.4 public 静态资源文件夹

在 public 文件夹里放置静态资源，例如：js、css、图片视频等，通过静态资源中间件给用户展示，在 app.js 中实现：

```js
app.use(express.static(path.join(__dirname, "public"))); // 静态资源目录
```

像 js 、css 也可以导入到其他文件中使用。
