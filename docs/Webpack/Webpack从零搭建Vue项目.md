# Webpack 从零搭建 Vue 项目

## 写在前面

::: tip

1. 我们平时都是使用 `vue-cli` 脚手架快速搭建项目（vue-cli 基于 webpack），可是我们不知道其中的原理与细节，导致我们在遇到一些细节问题无法自己配置解决。

2. 为了让我们能更好的了解 vue-cli 实现过程，我们需要学习使用 `webpack` 从一个 index.html 文件从零开始创建一个完整的项目（包含 `babel`、样式预处理器、`vue`、`webpack` 插件、`dev-server`、`proxy` 代理等.

:::

## 1. webpack 起步

:::tip

1. webpack 是一个开源的前端打包工具。webpack 提供了前端开发缺乏的模块化开发方式，将各种静态资源视为模块，并从它生成优化过的代码。具体功能处理：es6 语法。
2. 要使用 Webpack 前须先安装 Node.js。Webpack 其中一个特性是使用加载器来将资源转化成模块。开发者可以自定义加载器的顺序、格式来因应项目的需求。
3. **具体功能**是处理 es6 语法，处理 css 代码，支持 js 模块化， html/css/js 合并处理，.vue 文件解析。

:::

### 1.1 安装 webpack ：（需要 node 环境）Node.js

终端命令：`npm i webpack -g` ( 全局安装 webpack )

此时注意我们需要再安装一个 `webpack-cli` ，命令：`npm install webpack-cli -g`

执行 `webpack -v` 查看是否安装成功

### 1.2 使用终端命令 webpack

首先打开终端，直接使用命令 'webpack' 就可以进行打包。

打包后的文件会生成一个 dist 文件夹，放在项目根目录下，里面放着一个被打包好的 main.js 文件。main.js 如下：

![img01](/images/Webpack/webpack_vue01.png)

### 1.3 引入使用打包好的文件

在 index.html 文件里引入 dist/main.js

## 2. 了解 webpack 的配置文件

### 2.1 package.json

1. package.json，是一个包含项目名称、打包入口（main）、所需的依赖包的版本的配置文件，我们可以自己在根目录新建，也可以在终端输入 `npm init` ( `npm init -y` 这是一种简单的写法,可以直接生成如下配置文件)

```json
{
  "name": "01_firstknow_webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "serve": "webpack server --config webpack.dev.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.1.3",
    "css-loader": "^6.7.1",
    "less-loader": "^11.1.0",
    "style-loader": "^3.3.1",
    "url-loader": "^4.1.1",
    "webpack-cli": "^4.10.0"
  },
  "devDependencies": {
    "@babel/cli": "^7.19.3",
    "@babel/core": "^7.20.2",
    "@babel/preset-env": "^7.20.2",
    "@vue/compiler-sfc": "^3.2.45",
    "babel-loader": "^9.1.0",
    "babel-preset-env": "^1.7.0",
    "clean-webpack-plugin": "^4.0.0",
    "copy-webpack-plugin": "^11.0.0",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.5.0",
    "vue": "^3.2.36",
    "vue-loader": "^17.0.1",
    "webpack-dev-server": "^4.11.1",
    "webpack-merge": "^5.8.0"
  }
}
```

### 2.2 package-lock.json

lock: 中文是锁的意思，就是锁定依赖包的版本防止后来因为不同的程序员使用不同的版本导致的错误和误会，所以我们需要把它们锁起来，通俗一点就是固定我们依赖包的版本，防止后期因为版本不一样导致的错误。

### 2.3 webpack.config.js

:::tip
webpack.config.js （也可以是 webpack.config.json）文件，webpack 的所有配置都写在里面。

:::

webpack.config.js 文件的书写规则，整个文件内部使用 `module.exports = { 里面书写键值对 }` 导出

## 3. 入口出口（entry、output）

### 3.1 打包入口 （entry）

entry 配置项是用来指定 webpack 打包入口 js 文件的配置，可指定一个路径。此项默认配置为 ' ./src/index.js '，这也是一开始我们新建文件 index.js 并且不能改名的原因。

### 3.2 打包出口 （output）

此项指定一个对象，第一个属性 path 也是指定一个路径，默认是指定根目录下的 dist 文件夹,我们如果要指定需要导入一个路径（ path ）模块

## 4. Loader

### 4.1 先了解 webpack 打包规则

::: tip
没有被依赖的文件（模块）是不会被打包的，比如你随便在 js 文件夹下面新建一个 element.js，这个文件是不会被 webpack 打包的，因为它没有被依赖，不需要自然不是不会打包啦，当然其他的一些静态资源（如图片、视频）会有自己的打包部署方法，后面会讲到。

注意：每次依赖的文件有修改我们都是需要重新打包的，以后使用插件（plugin）解决这个问题，先卖个关子。

`webpack` 作为一个中间人，把一堆文件打包成浏览器可以识别的资源，可以看出 webpack 的强大和重要性。
:::

### 4.2 css-loader、style-loader、less-loader

:::tip
我们先了解什么是 loader ，loader 类似一个转换器（加载器），可以把不同的模块文件转换成对应的文件，例如 typescript 转换为 javascript ，内置图片转为 data_url 等，这里我们用到的是它可以让我们直接在 js 文件里导入 css 文件，可能小伙伴有疑问了，以前使用 css 都是在 < style > 或者是 < link > 导入外部 css 文件，没错，其实 webpack 也是这样的，基本原理的东西并不会改变，loader 就是让你方便导入模块代码提高效率，剩下的交给我们强大的 loader 就行啦。
:::

**第一步**：安装 css-loader ，使用 npm install css-loader -D，这里只需局部安装就行。

:::tip
注意：这里只是下载了一个依赖包哦，我们还没告诉 webpack 要怎么去使用，也就是要去 webpack.config.js 文件里配置一个模块（ module ）规则（ rules ），（为什么是 module ，因为 webpack 也是把 css 当一个 module 去解析的，后面会讲 module 的配置，这里浅浅了解一下，我们主要配置 rules ）。
:::

**第二步**：在 rules 配置是通过选择 ( test ) 出文件类型使用 ( use ) 指定的 loader，配置如下：

```javascript
module: {
    rules: [
        { test: /\.css/, use: "css-loader" } /正则表达式/ ，\.跟一个文件扩展名
    ],
  },
```

**第三步**：注意了，我们之间不是说过，webpack 也是使用最经典原始的方式让 css 生效的，仅仅有个被解析好的 css 代码是没用的，我们要让它生效，就需要一个新的东西（style-loader），让它生成一个 style 标签，这样浏览器才能识别。

**第四步**：安装 style-loader : npm install style-loader -D

**第五步**：配置 rules
:::tip
虽然我们的 js 代码是从上往下、从左到右执行
可是在模块文件里是 从下往上、从右到左执行的
:::
代码如下：

```javascript
module: {
    rules: [
        { test: /\.css/, use: "style-loader" },
// 这是第二个执行的，虽然我们的 js 代码是从上往下执行
// 可是在模块文件里是 从下往上执行的
        { test: /\.css/, use: "css-loader" },
// 这是第一个执行的
    ],
  },
```

**第六步**：​ 我们如果喜欢使用 css 拓展语言 比如 less、sass，那我们依旧是需要使用对应的 loader，相信大家已经知道怎么用了，先下载依赖包： `npm install less-loader -D`

推荐使用一种简易配置写法。

![img02](/images/Webpack/webpack_vue02.png)

### 4.3 file-loader、url-loader （webpack 4）

～ 1. file-loader

:::tip
我们在构建项目时候是需要一些资源的，比如一些图片、视频之类的，我们可以使用 file-loader 发送文件到输出目录（ dist 文件夹 ）。
:::

～～ 1. 安装 file-loader : `npm install file-loader -D`

～～ 2. 在 module 配置里新增一条规则：

```javascript
{
        test: /\.(jpe?g|png|gif)$/i, // 匹配一些图片格式，i 表示忽略大小写
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false // 不使用模块解析的语法，防止图片不显示
              // 一些自定义选项
            }
          }
        ],
        type: 'javascript/auto'
        // file-loader 是 webpack4 的，我们使用的是 webpack5,配置防止资源重复

      }
```

～～ 3. 配置文件名和输出路径：

```javascript
{
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false, // 解决版本问题
              outputPath: 'imgs', // 会在根目录新建一个 img 文件夹
              name: '[hash:6]-[name].[ext]',
              // hash 是 哈希值，：后跟一个数字控制位数
              // name 是原文件名，ext 是扩展名
            }
          }
        ],
        type: 'javascript/auto' // 解决版本问题
      }
```

～ 2.` url-loader`
`url-loader` 具有 `file-loader` 的解析文件的能力，它可以将文件转为 base-64 编码 放在 js 文件里，这样做可以减轻服务器的负担，设置一个分割线（限制：`limit`）。

配置如下：

![img03](/images/Webpack/webpack_vue03.png)

### 4.4 asset-module（资源模块），webpack 5

:::tip
我们一开始使用的是 webpack 4 的 file-loader、url-loader，在 webpack 5 里面有个新的资源模块类型，可以不使用 loader，就可以完成资源的打包
:::

**第一种配置方法**：在 `output` 配置项里新加一项 `assetModuleFilename`

```js
output: {
    // 出口
    path: path.resolve(__dirname, "dist"), // 使用 path 模块，在根目录新建文件夹
    filename: "bundle.js", // 指定打包的 js 文件名
    assetModuleFilename: 'asset/[hash:6]-[name]-[ext]' // 指定文件夹名，和资源各自文件名
  },
```

**第二种配置方法**：

```js
{
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset/resource', // resource 表示为图片等资源
        generator: {
          filename: 'asset/[hash:6]-[name]-[ext]' // asset 指定文件名，后者指定文件名
        }
      }
```

## 5. Babel-loader (Babel)

### 1. 什么是 Babel ？

:::tip
Babel 是一个独立的工具，将 es6 及以上的高级语法，转为 es5，以便兼容那些不支持 es6 以上的浏览器，是一个很强大的 javascript 编译器。
:::

2. 安装和配置预设：

- 安装：`npm install @babel/core @babel/cli -D`
- 这是分别安装了 `Babel` 的核心代码和 Babel 脚手架
- 安装 Babel 预设：`npm install babel-preset-env -D`
- 新建 babel.config.js 配置文件，因为我们安装了预设，所以我们在文件预设就行了

![img04](/images/Webpack/webpack_vue04.png)

在 index.js 里面写入一个箭头函数，然后打包后发现 bundle.js 里面已经变成了普通的语法

## 6. Plugin (插件)

### 6.1. 什么是插件：

:::tip
插件是 webpack 是支柱功能，插件的出现是为了弥补 loader 的不足（比如给 css 代码加浏览器前缀），webpack 本身也提供了很多插件，插件的本质也是一个 具有 apply 方法的 javascript 对象。
:::

### 6.2. 基本使用方法 和 clean-webpack-plugin 插件

6.2.1. 安装：npm install clean-webpack-plugin -D

6.2.2. 在 webpack.config.js 里导入这个依赖，并在 plugins 属性中实例化。

6.2.3. 配置如下：以后就不用每次都自己去删那个 dist 文件夹了。

![img05](/images/Webpack/webpack_vue05.png)

### 6.3. html-webpack-plugin

:::tip
dist 文件夹没有 index.html 文件,可借助 html-webpack.plugin 轻松的解决这个问题
:::

6.3.1. 安装：`npm install html-webpack-plugin -D`

6.3.2. 导入和配置：

```js
const  HtmlWebpackPlugin  = require('html-webpack-plugin')
...
plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin()
  ]
```

可见效果如下：得到了一个简单的 html 文件

![img06](/images/Webpack/webpack_vue06.png)

6.3.3. 拓展：使用 Vue 的 html 模版打包

:::tip
我们虽然得到了一个 html 文件，但是这个文件过于简单，很多东西都没有，比如图标就没有导入。如果我们想指定一个丰富的 html 文件为模版，让 html-webpack-plugin 插件按照这个模版（template）来生成 index.html，我们需要进行配置。
:::

～ 1. 我们用 vue-cli 搭建的项目里的 index.html 文件来做我们的模版：

vue 的 index.html 内容如下，复制替换我们的 index.html

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong
        >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
        properly without JavaScript enabled. Please enable it to
        continue.</strong
      >
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

替换好文件后，我们再去配置如下，传入一个 `template` 属性（指定一个文件路径）：

![img07](/images/Webpack/webpack_vue07.png)

**解决方案**：`DefinePlugin`插件

6.3.4. `DefinePlugin`、copy-webpack-plugin

::: tip

1. DefinePlugin 是一个 webpack 自带的插件，无需额外下载，非常好用，可以将代码中的变量替换为其他值或者表达式。

2. copy-webpack-plugin 是一个复制资源文件的插件，这里用于复制 ico 图标资源，下载：`npm insall copy-webpack-plugin -D`

:::

～ 1. 把我们图标放在 根目录下 public 目录下。我们需要配置 `BASE_URL` 为我们想要的路径，取决于我们把 icon 图标复制在哪了。我们假设放在 dist 文件夹 asset 文件夹下

～ 2. 如下配置：

```js
const  DefinePlugin = require('webpack').DefinePlugin
const  CopyPlugin = require('copy-webpack-plugin')
...
 new CopyPlugin({
      patterns: [
        {
          from: 'public', //复制入口
          to: './asset' // 复制出口
        }
      ]
    }),
    new DefinePlugin({
      BASE_URL: "'./asset/favicon.ico'" // 替换为我们的出口地址
    })
```

## 7. 本地服务（DevServer）

:::tip
我们之前使用的是打包，每次修改了代码都要重新打包，虽然我们可以通过 vscode 插件 liveServer 实现重新打包后更新页面，但是这是不够方便的，我们要的是修改了一行代码，按下保存按钮页面就会自动刷新，我们就需要提到一个新的功能--`DevServer`，它可以提供一个本地服务,可以实现热更新。
:::

## 7.1. 安装和使用：

7.1.1. 安装：

```
npm install webpack-dev-server -D
```

7.2.2. 配置：
这次我们先去 npm 的 package.js 里配置一个脚本：

```js
"scripts": {
    "runpack": "webpack",
    "serve": "webpack server", // webpack server 才是真的开启服务的命令
    "jiaoben" : "webpack server" // 我们可配置一些其他的脚本，使用 npm run '配置的脚本'
  },
```

习惯于 `npm` : npm run runpack 开启服务，也可以直接执行：`webpack server`

7.3.3. 查看终端

![img08](/images/Webpack/webpack_vue08.png)

7.3.4. 自行配置端口号（port）和主机名 （hostname）
要想自己配置主机名和其他的，我们需要在 webpack.config.js 里的 DevServer 配置，如下配置：

![img09](/images/Webpack/webpack_vue09.png)

## 7.2. 热模块替换（HMR）

:::tip
与开启服务不同，热模块替换是改变模块局部的代码页面只会刷新局部，提高效率性能，通过配置 `hot: true` 开启热模块替换服务，配置如下：
:::

7.2.1. 在 index.js 文件里加入，以下是自身模块替换

```js
const foo = (regs) => {
  console.log("我是 es6 语法");
  console.log("替换一次吧");
};
foo();

module.hot.accept(
  //开启自身模块替换
  console.log(`模块替换了`)
);
```

我们改变 foo 函数里面的一些打印，可以发现控制台如下，旧的打印没有被删除掉，说明热模块替换成功。

![img10](/images/Webpack/webpack_vue10.png)

7.2.2. 模块更新，就是导入其他的模块，这里可以导入 ' ./js/element.js '，以后在 element.js 里修改代码也会模块更新。

```js
if (module.hot) {
  // 模块更新
  module.hot.accept("./js/element.js")(console.log(`模块替换了`));
}
```

## 8. 配置文件分离

:::tip
之前我们提到了开发模式（mode），在生产环境（production）下我们不需要打包清除旧的文件夹，那么我们就不需要那个 clean-webpack-plugin 插件，有些配置又是开发（development）和生产都需要，那么我们称之为公共配置（webpack.common.js），所以我们需要把开发模式的配置文件（webpack.dev.js）和生产模式的配置文件（webpack.prod.js）和公共配置（webpack.common.js）拼接（merge）起来，这个过程依赖一个插件（webpack-merge-plugin）。
:::

我们在根目录准备对应的三个文件。

![img11](/images/Webpack/webpack_vue11.png)

然后再去安装一下实现拼接的插件：

`npm install webpack-merge-plugin -D`

在 webpack.prod.js 下：

![img12](/images/Webpack/webpack_vue12.png)

在 webpack.dev.js 下：

![img13](/images/Webpack/webpack_vue13.png)

那么怎么指定配置，我们在 package.js 里配置 node scripts 脚本，使用 `--config` 指定对应的配置文件：

![img14](/images/Webpack/webpack_vue14.png)

## 9. proxy 代理

:::tip
代理（proxy）是用来解决浏览器跨域的问题的，跨域就是一种安全策略，只有当安全协议、主机名、端口都一致才可以访问，很多时候是难以实现的，我们就需要进行代理，通过 webpack 的 proxy 配置项配置：
:::

使用 axios 发起一个请求，先下载安装 axios : `npm install axios` ，然后在 index.js 里写入以下代码：

```js
import axios from "axios"
...
axios.get("http://localhost:9999").then((res)=>{console.log(res);})
```

为了能访问到，我们做如下配置：

修改 " http://localhost:8888 " 为 " /api "，在通过 proxy 代理 " /api " 为 " http://loacalhost:9999 "

![img15](/images/Webpack/webpack_vue15.png)

然后在 index.js 里直接让 axios 访问 ' /api '

可是结局还是不尽人意，我们看一下报错信息可以发现，我们访问的地址是" http://localhost:9999/api ",

我们需要重写路径（pathRewrite）：

```js
 proxy: {
      "/api": {
        target: "http://loacalhost:9999",
        pathRewrite: { "^/api": "" }, //重写 /api 为空
      },
    },
```

## 10. 解析（Resolve）

:::tip
不想写过多的复杂路径时，可以使用 解析（Resolve），配置别名简化工作
:::

添加配置如下：

```js
resolve:{
    modules: ["node_modules"], // 配置依赖包的默认路径，
    alias: {
      "js": path.resolve(__dirname,"./src/js"), //配置样式简单的路径
      "@": path.resolve(__dirname,"./src") // 把 src 这个常用目录修改为 @
    },
    extensions: [".js",".less",".css",".vue"] //配置了这些我们就不写那些后缀名啦
  },
```

## 11. 使用 vue 库，和 .vue 单文件组件

:::tip
vue 是一个非常好用的 javascript 库，现在已经发行了 vue 3，我们可以直接导入使用库文件，也可以使用单文件（SFC）的形式，直接使用库文件会简单一点，我们先来试一下吧。
:::

### 11.1 使用 vue 库：

～ 11.1.1. 安装 vue3

`npm install vue@next `

～ 11.1.2. 导入 createApp 方法创建一个实例

```js
import { createApp } from "vue/dist/vue.esm-bundler.js"; // 导入创建实例方法

const App = createApp({
  template: `<h2>我是通过vue生成的{{ title }}</h2>`, // DOM 模版 {{ 模版字符串 }}
  data() {
    // vue2 写法
    return {
      title: "标题", // 数据
    };
  },
});

App.mount("#app"); //挂载到一个 id 为 app 的 DOM 元素上
```

### 11.2. vue 单文件组件

什么是单文件（`SFC`）?

为了更好地适应复杂的项目，Vue 支持以 `.vue `为扩展名的文件来定义一个完整组件，用以替代使用 `Vue.component`注册组件的方式。那我们就可以使用 webpack 来打包这种组件。

11.2.1 我们先在 src 目录下新建如下文件（App.vue）。

![img16](/images/Webpack/webpack_vue16.png)

11.2.2. 在 index.js 里导入此文件

```js
import { createApp } from 'vue/dist/vue.esm-bundler'
import App from "@/vue/App" //导入
...
createApp(App).mount("#app") // 创建实例并挂载（mount）
```

接下来肯定是报错的，我们的 .vue 单文件肯定需要 loader 去解析的，

安装 loader:

`npm install vue-loader -D`

仅此一个是不够的

我们还需安装一个 vue 单文件解析器：

`npm install @vue/compiler-sfc -D`

然后要记得去 webpack > module > rules 里面去配置：

````js
{
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      }
      ```
````

可是还是会报错，我们查看信息发现它提到了一个插件：`VueLoaderPlugin `

这个插件是 vue 自带的，直接导入并配置就行：

```js
import { VueLoaderPlugin } from "vue-loader/dist/index";
...
plugins: {
    new VueLoaderPlugin()
}
```

总结：

:::tip
我们已经掌握了使用 webpack 打包工具进行项目的预处理，并可以使用 Vue 框架帮助我们构建一个简单的项目。

Vue 还有很多自带的库，比如 vuex、vue-route，我们在这里就不研究这些了，重点是掌握使用 vue-cli 搭建的项目是怎么一个来龙去脉，并且能自己进行一些简单的修改，或许这篇文章不能对你开发项目的能力有明显提高，但是起码你不只是一个只会使用 vue-cli 脚手架的选手啦。

感谢各位浏览到这里，本文很多不足多多指出一起进步！
:::
