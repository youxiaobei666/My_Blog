# Vue3 源码

## 一. 克隆 clone 源码到本地。

### 注册好 GitHub 账号,生产 ssh 密钥

如何生存 ssh 密钥：见博客 [git 配置 ssh](/Git/Git配置ssh密钥.md)

### 开始克隆

打开本地一个文件夹，用终端打开，然后执行：

```
clone git@github.com:vuejs/core.git
```

地址获取：

![img01](/images/Git/Github_CloneVue.png)

## 二. 利用 debugger 调试 Vue

### 下载依赖

成功拷贝源码后，执行命令下载所需要的依赖

```
npm install / npm i
```

### 打包

:::tip
在打包之前，在 packages.js 文件中配置 sourcemap ，方便在浏览器中调试观察。
:::

随后执行

```
npm run build
```

会在 packages -> vue 生成 dist 文件夹,里面有 vue.global.js 文件， 导出 Vue 对象

### index.html 引入 Vue

在 packages -> vue -> examples 下新建文件夹,在新建文件夹下新建 index.html

内部代码如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>youxiaobei</title>
  </head>
  <body>
    <div id="app"></div>
    <template id="modle"> 模版 </template>
    <!-- 引入 vue -->
    <script src="../../dist/vue.global.js"></script>
    <script>
      // 会在这里开始调试
      debugger;
      Vue.createApp({
        template: "#modle",
      }).mount("#app");
    </script>
  </body>
</html>
```

### 浏览器中调试

![img02](/images/Vue3/浏览器调试vue源码.png)

## 三. methods 函数中的 this 是什么？

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>youxiaobei</title>
  </head>
  <body>
    <div id="app"></div>
    <template id="modle">
      <span>{{message}}</span>
      <button @click="showThis">按钮</button>
    </template>
    <script src="../../dist/vue.global.js"></script>
    <script>
      debugger;
      Vue.createApp({
        template: "#modle",

        data: () => {
          return {
            message: "hello world",
          };
        },
        methods: {
          showThis() {
            console.log(this); // proxy,里面包含 data 中的数据,和 methods 里定义的方法
          },
        },
      }).mount("#app");
    </script>
  </body>
</html>
```

点击按钮后，我们发现输出一个 Proxy, 里面包含 data 中的数据,和 methods 里定义的方法

所以我们才可以使用 `this` 来修改数据

::: warning
不得使用箭头函数定义 methods 里的函数
:::

如果使用箭头函数输出 `this`

```js
methods: {
  showThis: () => {
    console.log(this); // window
  };
}
```

结果为 window

因为箭头函数并不会绑定 this。 有关 this ，见博文: [this 指向详解](/JS/JavaScript的this指向.md)

**那正常函数定义又是怎么输出 Proxy 的呢？**

在源码(删减)中可以看见 Vue3 中解析了 methods 里面的函数，并且使用 `bind` 方法把 this 绑定了 Proxy

```js
if (methods) {
    // 遍历 methods 里定义的每一个函数
    for (const key in methods) {
      const methodHandler = (methods as MethodOptions)[key]
      if (isFunction(methodHandler)) {
        if (__DEV__) {
         ...
          })
        } else {
          // 绑定 this 为 publicThis, proxy 是 instans.proxy
          ctx[key] = methodHandler.bind(publicThis)
        }
        if (__DEV__) {
          checkDuplicateProperties!(OptionTypes.METHODS, key)
        }
      } else if (__DEV__) {
       ...
      }
    }
  }
```

:::tip
在 Vue2 中输出的是 `Vue 实例`, 因为使用的是 `new` 构造出来的，接收 new 的实例对象就是 this 指向的对象，即 Vue 实例。
:::
