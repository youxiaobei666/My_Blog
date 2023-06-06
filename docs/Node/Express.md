# Express

## 下载

```
$ npm install express --save
```

## 1. 基本结构

:::tip
注意点：app.get 指定了 get 方法，如果是 app.all 就是指定了所有的请求方法（例如：post delete 都是包含的），而 app.get('/') 里面访问的是根路径，如果访问别的路径：例如/home ,是没有结果的，这里和 vueRouter 很像，路径要指定响应，不然就应该是响应 404 页面。
:::

```js
// app.js

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(8080, () => {
  console.log("服务开启在 8080 端口");
});
```

## 2. 获取请求参数

分为原生的 http 方式，和 express 方式

```js
// app.js
const express = require("express");
const app = express();

/**
 * 获取请求参数的方法有两种，1、原生http 的 ，2、express 专属的
 */
app.get("/home", (req, res) => {
  // 1.原生 http
  console.log(req.url); // 获取请求的路径 /home?query ....
  console.log(req.method); // 获取请求的方法，GET ,实际上这里已经指定了是 get (app.get )
  console.log(req.httpVersion); // 获取 http 版本
  console.log(req.headers); // 获取请求头 1.1

  //2. express
  console.log(req.query); // 获取查询字符串 ?query='查询字符串' { query: "'查询字符串'" }
  console.log(req.get("host")); // 获取某个指定的请求头 localhost:8080

  res.send("响应体");
});

app.listen(8080, () => {
  console.log("服务开启");
});
```

## 3. 获取路由携带参数

:::tip
注意点：冒号开头的是参数，通过 req.params.参数名 获取，而后面的 问号开头的 ?query=查询条件，是属于查询，而不是参数，查询通过 req.query 获取，返回结果是一个对象。
:::

```js
//app.js

const express = require("express");

const app = express();

// 获取请求时携带的id参数, http://localhost:8080/home:12345
// 注意请求时是一定要有参数不然不会响应
app.get("/home:id", (req, res) => {
  res.send("你的请求参数为" + req.params.id); // 12345
});

// 默认 1314
app.get("/home", (req, res) => {
  // 没有参数重定向
  res.redirect("http://localhost:8080/home:1314");
});

app.listen(8080, () => {
  console.log("服务开启在 8080 端口");
});
```

## 4. 响应

```js
// app.js
const express = require("express");
const app = express();

app.get("/home", (req, res) => {
  // 1. http 兼容
  res.statusCode = 200;
  res.statusMessage = "xxx"; // 在响应码之后
  res.setHeader("header", "id header");
  res.write("响应体");
  res.end("xxx");

  // 2. express 的响应
  res.status(500); // 状态码
  res.set("xxx", "yyy"); // 设置一个 xxx 响应头
  res.send("express 的 send 方法不会乱码"); // 响应体
  res.status(300).set("xxx", "yyy").send("连贯的操作");

  // 3. 其他的功能
  res.redirect("http://youxiaobei.top"); // 重定向
  res.download("./文件名"); // 下载响应，启动下载
  res.json(); // 响应 JSON
  res.sendFile(__dirname + "/某个文件路径"); // 响应文件内容
});

app.listen(8080, () => {
  console.log("服务开启");
});
```

### 跨域

在 Node.js 中，我们可以通过设置响应头来允许跨域请求。下面是设置跨域响应头的步骤：

在需要进行跨域响应的路由（接口）中添加如下代码。

```javascript
res.header("Access-Control-Allow-Origin", "*");
res.header(
  "Access-Control-Allow-Headers",
  "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
);
res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
```

其中，`Access-Control-Allow-Origin `表示允许跨域请求的源地址，使用 "" 表示允许所有源地址的请求。如果只想允许特定的源地址进行请求，可以将 "" 替换成具体的源地址。

`Access-Control-Allow-Headers` 表示允许跨域请求携带的额外请求头字段。

`Access-Control-Allow-Methods` 表示允许跨域请求的 `HTTP` 方法，包括 `PUT、POST、GET、DELETE` 和 `OPTIONS` 等。

对于前端发送的 `OPTIONS` 请求，需要在相应路由（接口）中添加以下代码，以允许预检请求。

```javascript
if (req.method === "OPTIONS") {
  res.sendStatus(200);
}
```

完整的示例代码如下：

```javascript
const express = require("express");

const app = express();

// 设置跨域响应头
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
```

## 5. 全局和路由中间件

全局和路由的中间件，附两个案例:

```js
const express = require("express");
const app = express();
const fs = require("fs");

/**
 * 中间件本身就是就是一个函数，接收三个参数，req,res ,next
 * 他的作用就是简化操作和代码
 * 一般分为两个类型，全局和路由中间件
 * 1. 全局
 * 每一个请求到服务端之后都会执行全局中间件函数
 * 2. 路由中间件
 * 在每一个请求值得路由的请求发生后执行的中间件函数
 */

// 定义全局中间件，实现功能每次有访问就记录 ip 和 请求路径 （全局中间件的案例）
const GlobalMV = (req, res, next) => {
  // 获取 ip 和路径
  let { hostname, url } = req;
  // 存储数据
  fs.appendFileSync("./access.log", `${hostname}  ${url} \r\n`);
  next(); // 执行之后的函数
};

// 定义路由中间件，实现权限认证（路由中间件的案例）
const roterMV = (req, res, next) => {
  // 根据查询参数password确定密码权限  http://localhost:8080/home?password=001223
  if (req.query.password === "001223") {
    console.log("密码正确");
    next(); // 执行之后的函数
  } else {
    res.send("密码错误");
  }
};

// 全局中间件，需要 use 注册
app.use(GlobalMV);

// 局部中间件
app.get("/home", roterMV, (req, res) => {
  res.send("响应体");
});

app.listen(8080, () => {
  console.log("服务开启");
});
```

## 6. 静态资源中间件

静态资源和路由规则如果同时匹配：例如：public 下有一个 index.html,而路由也有一个 app.get('/index.html') ,那么就和代码顺序有关，谁先匹配就响应谁，js 代码从上而下，左往右。

一般路由响应动态的资源，比如新闻和日报，但是像 js css 代码 图片视频 都是静态资源，用静态资源中间件比较合适。

```js
/**
 * 之前我们响应客户端都是先读文件再返回用户文件，这是很不方便，
 * 我们采用静态资源中间件后可以简化很多
 * express.static('路径')
 */

const express = require("express");
const app = express();

// 注册static目录为静态资源中间件
const staticMV = express.static("./static");
app.use(staticMV);

// 启动服务，可直接访问静态资源
app.listen(8080, () => {
  console.log("服务启动");
});
```

## 7. bodyParser 中间件

body-parser 是一个获取请求体的插件，安装和使用点击链接。

案例：获取用户登陆用户名（user name）和 密码（password）。首先这是一个 post ,在用户点击登陆按钮时浏览器要发起 post 请求，我们要获取到用户名和密码。

请求时携带的参数如下:

![img01](/images/Node/Express01.png)

代码如下：

```js
/**
 * 获取请求体的中间件，bodyParser, 把请求的参数解析好，添加到 req.body 对象上
 * npm i body-parser 下载插件
 */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// 解析 string 格式的
app.use(bodyParser.urlencoded({ extended: false })); // 全局使用

// 解析 json 格式的
app.use(bodyParser.json());

// 返回一个表格提交，实现post
app.get("/login", (req, res) => {
  res.send(
    "<h2>登陆</h2><form method='post' action='/login'><input text='用户名' name='username'></input><input text='密码' name='password'></input><button>登陆</button></form>"
  );
});

app.post("/login", (req, res) => {
  // 获取请求体，body-parser 插件会添加一个 req.body 对象
  res.send(req.body);
});

app.listen(8080, () => {
  console.log("服务开启");
});
```

## 8. 防盗链中间件

为了防止别的服务器盗用自己服务器的资源 ,我们要检测请求头中的 host name 是否为我们的服务器地址 ip，这其实是一个全局中间件

代码如下：

```js
const express = require("express");
const app = express();
/**
 * 为了防止别的服务器盗用自己服务器的资源
 * 检测 请求头中的 hostname 是否为我们的服务器地址ip
 * 这其实是一个全局中间件
 */

const TextMV = (req, res, next) => {
  // 获取 hostname
  const hostname = req.hostname;
  // 判断是否为自己的主机地址
  if (hostname !== "127.0.0.1") {
    res.status(404);
    res.send("404 NOT FOUND");
    return;
  }
  next();
};

app.get("*", TextMV, (req, res) => {
  res.send("获取了资源哦");
});

app.listen(8080, () => {
  console.log("服务开启在 8080 端口");
});
```

## 9. 路由模块化

我们使用路由时难免会遇到很多访问，有 get 请求 home,也有 post 请求，有前台的、后台的，当路由太多的时候难免会遇到摸不清头脑的情况，我们需要使用 路由模块化 的思想。第一步分离路由，把一类的路由分离到单独的文件中：我们需要使用 express 中的 Router 方法，创建实例后再创建路由规则，最后导出 router 路由对象。代码如下：

```js
// router.js

/**
 * 路由模块化，把路由规则放在独立的文件中，然后 require 导入使用
 */

const express = require("express"); // 导入express

// 创建路由对象，使用 express.Router() 方法
const router = express.Router();

// 创建路由规则
router.get("/router", (req, res) => {
  res.send("你访问了分离路由模块");
});

// module.exports 暴露出路由对象router
module.exports = router;
```

导入使用，在 app.js 文件中。使用 require 方法导入，然后使用 app.use 方法使用上：

```js
// app.js

const express = require("express");
const app = express();

/**
 * 导入路由模块，然后 app.use() 使用
 */

const router = require("./routerModule");

// 使用
app.use(router);

app.listen(8080, () => {
  console.log("服务开启在 8080 端口");
});
```

## 10. 模版引擎 EJS

模版引擎是分离 用户界面（HTML） 和 业务数据(JS) 的一种技术, 他是一个高效的 javascript 模版引擎。

下载：`npm i ejs --save`

### 10.1 用法：

```js
/**
 * 模版引擎是分离 用户界面（HTML） 和 业务数据(JS) 的一种技术
 * 他是一个高效的 javascript 模版引擎，https://ejs.bootcss.com/
 * 下载：npm i ejs --save
 *      类似之前我们使用的 ${} 模版字符串加强版
 */

// 1. 导入
const ejs = require("ejs");

// 2. 定义一个变量，后面使用
const str = "这是一个变量哦";

// 3. 使用 EJS 的渲染,介绍：
// <%= 某一个变量,需要在render 加入第二个对象参数 %>
let result = ejs.render("介绍：<%= str %>", { str: str });

console.log(result); //介绍：这是一个变量哦
```

到这我们并没有实现所谓的 html 和 js 分离，接下来，我们新建一个 html 文件，在里面写入如下内容：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EJS</title>
  </head>
  <body>
    <!-- 我们在里面写模版语法 -->
    <h2><%= str %></h2>
  </body>
</html>
```

然后再导入使用：

```js
const express = require("express");
const fs = require("fs");
const app = express();

// 1. 导入
const ejs = require("ejs");

// 2. 定义一个变量，后面使用
const str = "这是一个变量哦";

// 3. 读取html 文件 ~用 toString() 方法 buffer 转字符串
const html = fs.readFileSync("./index.html").toString();

// 4. 使用 EJS 的渲染
let result = ejs.render(html, { str: str });

// 5. 把 html 响应给客户端
app.get("/html", (req, res) => {
  res.send(result);
});

// 开启服务
app.listen(8080, () => {
  console.log("服务开启");
});
```

更多模版功能：比如基本的 js 代码也是可以写在模版里的，代码如下：

```html
<body>
  渲染一个数组：
  <ul>
    <% arr.forEach((item)=> { %>
    <li><%= item %></li>
    <% }) %>
  </ul>
</body>
```

```js
...
// 2. 定义一个变量，后面使用
const arr = [1, 2, 3, 4, 5];

...

// 4. 使用 EJS 的渲染
let result = ejs.render(html, { arr: arr });

...

```

结果如下：

![img02](/images/Node/Express02.png)

### 10.2 标签含义

- <% '脚本' 标签，用于流程控制，无输出。
- <%\_ 删除其前面的空格符
- <%= 输出数据到模板（输出是转义 HTML 标签）
- <%- 输出非转义的数据到模板
- <%# 注释标签，不执行、不输出内容
- <%% 输出字符串 '<%'
- %> 一般结束标签
- -%> 删除紧随其后的换行符
- \_%> 将结束标签后面的空格符删除

### 10.3 自定义分隔符

10.3.1 单个模版文件，使用 delimiter 参数，代码如下：

```js
let user = ["李", "华"];

ejs.render('<?= users.join(" | "); ?>', { users: users }, { delimiter: "?" });
```

10.3.2 全局使用，在 ejs 上添加对象，代码如下：

```js
ejs.delimiter = "$";

ejs.render('<$= users.join(" | "); $>', { users: users });
```

### 10.4 布局（Layouts）

EJS 并未对块（blocks）提供专门的支持，但是可以通过 包含页眉和页脚来实现布局，代码如下：

```html
<%- include('header'); -%>
<h1>Title</h1>
<p>My page</p>
<%- include('footer'); -%>
```
