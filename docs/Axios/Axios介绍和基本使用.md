# Axios 介绍和基本使用

## 1. Axios 是什么?

### 1.1 介绍

axios 是一个基于 `promise` 的，可以作用于 `node.js` 环境 和浏览器环境中。在服务端它使用原生 node.js `http` 模块, 而在客户端 (浏览端) 则使用 `XMLHttpRequests`。

### 1.2 特性

- 在浏览器端使用 XMLHttpRequests
- 在 node 中使用了原生的 http 模块
- 支持 promise API
- 可拦截响应 response 和请求 request
- 转换请求和响应的数据
- abort 方法取消请求
- 自动转换 JSON

### 1.3 与 Ajax 的区别

:::tip
Ajax
Ajax 是 Asynchronous JavaScript and XML 的缩写，异步的 JavaScript 和 XML. Ajax 描述了一种主要使用脚本操作 HTTP 的 Web 应用架构，Ajax 应用的主要特点是使用脚本操纵 HTTP 和 Web 服务器进行数据交换，不会导致页面重载。

Ajax 机制：通过创建 XMLHttpRequest 对象与服务器进行数据交互，向服务器发送请求，接受服务器的响应。

简单来说：AJAX 是与服务器交换数据并更新部分网页的，在不重新加载整个页面的情况下。Ajax = 异步 JavaScript 和 XML

Axios 是通过 promise 实现对 ajax 技术的一种封装，就像 jQuery 实现 ajax 封装一样
:::

## 2. 安装

```
$ npm install axios
$ yarn add axios
```

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## 3. 用法

为了在 CommonJS 中使用 require（） 导入时获得 TypeScript 类型推断（智能感知/自动完成），请使用以下方法：

```js
const axios = require("axios").default;

// axios.<method> 能够提供自动完成和参数类型推断功能
```

### 3.1 发起请求

```js
const axios = require("axios");

// 向给定ID的用户发起请求
axios
  .get("/user?ID=12345")
  .then(function (response) {
    // 处理成功情况
    console.log(response);
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .finally(function () {
    // 总是会执行
  });

// 上述请求也可以按以下方式完成（可选）
axios
  .get("/user", {
    params: {
      ID: 12345,
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // 总是会执行
  });

// 支持async/await用法
// 此写法是 Es6 语法 ，IE 和旧版浏览器不支持
async function getUser() {
  try {
    const response = await axios.get("/user?ID=12345");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

### 3.2 并发请求

定义多个请求的方法，方法中返回 axios.get(url), 然后使用 Promise.all([]).then 获取所有数据，在数组中执行定义好的函数

```js
function getUserAccount() {
  return axios.get("/user/12345");
}

function getUserPermissions() {
  return axios.get("/user/12345/permissions");
}

Promise.all([getUserAccount(), getUserPermissions()]).then(function (results) {
  const acct = results[0];
  const perm = results[1];
});
```

### 3.3 传递配置

可以向 axios 传递相关配置来创建请求，axios(config)

```js
// 发起一个post请求
axios({
  method: "post",
  url: "/user/12345",
  data: {
    firstName: "Fred",
    lastName: "Flintstone",
  },
});
```

```js
// 在 node.js 用GET请求获取远程图片
axios({
  method: "get",
  url: "http://bit.ly/2mTM3nY",
  responseType: "stream",
}).then(function (response) {
  response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"));
});
```

请求方式别名

- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.options(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])

## 4. 请求配置详解

这些是创建请求时可以用的配置选项。只有 url 是必需的。如果没有指定 method，请求将默认使用 GET 方法。

```js
{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认值

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
  // 你可以修改请求头。
  transformRequest: [function (data, headers) {
    // 对发送的 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对接收的 data 进行任意转换处理

    return data;
  }],

  // 自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是与请求一起发送的 URL 参数
  // 必须是一个简单对象或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer`是可选方法，主要用于序列化`params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求体被发送的数据
  // 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
  // 在没有设置 `transformRequest` 时，则必须是以下类型之一:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属: FormData, File, Blob
  // - Node 专属: Stream, Buffer
  data: {
    firstName: 'Fred'
  },

  // 发送请求体数据的可选语法
  // 请求方式 post
  // 只有 value 会被发送，key 则不会
  data: 'Country=Brasil&City=Belo Horizonte',

  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 1000, // 默认值是 `0` (永不超时)

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，这使测试更加容易。
  // 返回一个 promise 并提供一个有效的响应 （参见 lib/adapters/README.md）。
  adapter: function (config) {
    /* ... */
  },

  // `auth` HTTP Basic Auth
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 表示浏览器将要响应的数据类型
  // 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
  // 浏览器专属：'blob'
  responseType: 'json', // 默认值

  // `responseEncoding` 表示用于解码响应的编码 (Node.js 专属)
  // 注意：忽略 `responseType` 的值为 'stream'，或者是客户端请求
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // 默认值

  // `xsrfCookieName` 是 xsrf token 的值，被用作 cookie 的名称
  xsrfCookieName: 'XSRF-TOKEN', // 默认值

  // `xsrfHeaderName` 是带有 xsrf token 值的http 请求头名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认值

  // `onUploadProgress` 允许为上传处理进度事件
  // 浏览器专属
  onUploadProgress: function (progressEvent) {
    // 处理原生进度事件
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  // 浏览器专属
  onDownloadProgress: function (progressEvent) {
    // 处理原生进度事件
  },

  // `maxContentLength` 定义了node.js中允许的HTTP响应内容的最大字节数
  maxContentLength: 2000,

  // `maxBodyLength`（仅Node）定义允许的http请求内容的最大字节数
  maxBodyLength: 2000,

  // `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
  // 则promise 将会 resolved，否则是 rejected。
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认值
  },

  // `maxRedirects` 定义了在node.js中要遵循的最大重定向数。
  // 如果设置为0，则不会进行重定向
  maxRedirects: 5, // 默认值

  // `socketPath` 定义了在node.js中使用的UNIX套接字。
  // e.g. '/var/run/docker.sock' 发送请求到 docker 守护进程。
  // 只能指定 `socketPath` 或 `proxy` 。
  // 若都指定，这使用 `socketPath` 。
  socketPath: null, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // `proxy` 定义了代理服务器的主机名，端口和协议。
  // 您可以使用常规的`http_proxy` 和 `https_proxy` 环境变量。
  // 使用 `false` 可以禁用代理功能，同时环境变量也会被忽略。
  // `auth`表示应使用HTTP Basic auth连接到代理，并且提供凭据。
  // 这将设置一个 `Proxy-Authorization` 请求头，它会覆盖 `headers` 中已存在的自定义 `Proxy-Authorization` 请求头。
  // 如果代理服务器使用 HTTPS，则必须设置 protocol 为`https`
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // see https://axios-http.com/zh/docs/cancellation
  cancelToken: new CancelToken(function (cancel) {
  }),

  // `decompress` indicates whether or not the response body should be decompressed
  // automatically. If set to `true` will also remove the 'content-encoding' header
  // from the responses objects of all decompressed responses
  // - Node only (XHR cannot turn off decompression)
  decompress: true // 默认值

}
```

## 5. 响应结构

一个请求的响应包含以下信息。

```js
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 是服务器响应头
  // 所有的 header 名称都是小写，而且可以使用方括号语法访问
  // 例如: `response.headers['content-type']`
  headers: {},

  // `config` 是 `axios` 请求的配置信息
  config: {},

  // `request` 是生成此响应的请求
  // 在node.js中它是最后一个ClientRequest实例 (in redirects)，
  // 在浏览器中则是 XMLHttpRequest 实例
  request: {}
}
```

当使用 then 时，您将接收如下响应:

```js
axios.get("/user/12345").then(function (response) {
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.headers);
  console.log(response.config);
});
```

## 6. 默认配置，作用于每个请求

指定默认配置，它将作用于每个请求。

### 6.1 全局 axios 默认值

```js
//  BASE URL
axios.defaults.baseURL = "https://api.example.com";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
```

### 6.2 自定义实例的默认值，修改默认值

```js
// 创建实例时配置默认值
const instance = axios.create({
  baseURL: "https://api.example.com",
});

// 创建实例后修改默认值
instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
```

### 6.3 配置的优先级

配置将会按优先级进行合并。它的顺序是：在 lib/defaults.js 中找到的库默认值，然后是实例的 defaults 属性，最后是请求的 config 参数。后面的优先级要高于前面的。下面有一个例子。

```js
// 使用库提供的默认配置创建实例
// 此时超时配置的默认值是 `0`
const instance = axios.create();

// 重写库的超时默认值
// 现在，所有使用此实例的请求都将等待2.5秒，然后才会超时
instance.defaults.timeout = 2500;

// 重写此请求的超时时间，因为该请求需要很长时间
instance.get("/longRequest", {
  timeout: 5000,
});
```

## 7. 拦截器

在请求或响应被 then 或 catch 处理前拦截它们。

```js
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
```

移除拦截器

```js
const myInterceptor = axios.interceptors.request.use(function () {
  /*...*/
});
axios.interceptors.request.eject(myInterceptor);
```

可以给自定义的 axios 实例添加拦截器。

```js
const instance = axios.create();
instance.interceptors.request.use(function () {
  /*...*/
});
```

## 8. 错误处理

```js
axios.get("/user/12345").catch(function (error) {
  if (error.response) {
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
    // 而在node.js中是 http.ClientRequest 的实例
    console.log(error.request);
  } else {
    // 发送请求时出了点问题
    console.log("Error", error.message);
  }
  console.log(error.config);
});
```

使用 validateStatus 配置选项，可以自定义抛出错误的 HTTP code。

```js
axios.get("/user/12345", {
  validateStatus: function (status) {
    return status < 500; // 处理状态码小于500的情况
  },
});
```

使用 toJSON 可以获取更多关于 HTTP 错误的信息。

```js
axios.get("/user/12345").catch(function (error) {
  console.log(error.toJSON());
});
```

## 9. 取消请求 AbortController

以 fetch API 方式—— AbortController 取消请求：

```js
const controller = new AbortController();

axios
  .get("/foo/bar", {
    signal: controller.signal,
  })
  .then(function (response) {
    //...
  });
// 取消请求
controller.abort();
```

## 10. 请求体编码

默认情况下，axios 将 JavaScript 对象序列化为 JSON 。 要以 application/x-www-form-urlencoded 格式发送数据，您可以使用以下选项之一。

:::tip

1. Post 请求的两种编码格式：application/x-www-form-urlencoded 和 multipart/form-data
2. application/x-www-form-urlencoded 是浏览器默认的编码格式。对于 Get 请求，是将参数转换?key=value&key=value 格式
3. 我们使用表单上传文件时，必须让 `<form>` 表单的 enctype 等于 multipart/form-data。

:::

### 10.1 浏览器

在浏览器中，可以使用 URLSearchParams API，如下所示：

```js
const params = new URLSearchParams();
params.append("param1", "value1");
params.append("param2", "value2");
axios.post("/foo", params);
```

使用 qs 库编码数据

```js
const qs = require("qs");
axios.post("/foo", qs.stringify({ bar: 123 }));
```

或者用另一种方式 (ES6),

```js
import qs from "qs";
const data = { bar: 123 };
const options = {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: qs.stringify(data),
  url,
};
axios(options);
```

### 10.2 Node.js

Query string
在 node.js 中， 可以使用 querystring 模块，如下所示:

```js
const querystring = require("querystring");
axios.post("http://something.com/", querystring.stringify({ foo: "bar" }));
```

或者从'url module'中使用'URLSearchParams'，如下所示:

```js
const url = require("url");
const params = new url.URLSearchParams({ foo: "bar" });
axios.post("http://something.com/", params.toString());
```

Form data
在 node.js, 您可以使用 form-data 库，如下所示:

```js
const FormData = require("form-data");

const form = new FormData();
form.append("my_field", "my value");
form.append("my_buffer", new Buffer(10));
form.append("my_file", fs.createReadStream("/foo/bar.jpg"));

axios.post("https://example.com", form, { headers: form.getHeaders() });
```

或者, 使用一个拦截器:

```js
axios.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    Object.assign(config.headers, config.data.getHeaders());
  }
  return config;
});
```
