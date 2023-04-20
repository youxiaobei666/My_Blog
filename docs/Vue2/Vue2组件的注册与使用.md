# Vue2 组件的注册与使用

## 1. 什么是 Vue 组件

### 1.1 定义:

组件是 `Vue` 是一个可以重复使用的 Vue 实例, 它拥有独一无二的组件名称,它可以扩展 `HTML` 元素,以组件名称的方式作为自定义的 HTML 标签。
因为组件是可复用的 Vue 实例, 所以它们与` new Vue()` 接收相同的选项
例如 `data`, `computed、watch、methods` 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。 把一些公共的模块抽取来,然后写成单独的的工具组件或者页面,在需要的页面中就直接引入即可。

### 1.2 父子关系

组件在封装好之后不存在父子关系，彼此相互独立，在嵌套使用时才存在父子关系。

![img01](/images/Vue2/component01.png)

## 2. Vue 组件使用（注册方式）

### 2.1 局部注册（私有组件注册）

> 通过 component 节点注册的是私有子组件

**在父组件文件中：**

1. 引入组件 语法如下：

import '组件对象' from 'URL'

2. 导出组件 语法如下：

export default { }

3. 代码演示：

```javascript
import hello from './components/hello.vue'

    // export default {} 是固定写法 为了导出App组件
    export default {
      //此处定义了私有组件！
      components: { hello },
```

### 2.2 全局注册

1. 在 main.js 文件中，引入 import '组件对象' from '文件路径'

2. 组件注册：Vue.component ('组件名'，'组件对象' )

```javascript
import Vue from 'vue'

import App from './App.vue'
//导入全局组件 world.vue
import world from '@/components/world.vue'
//注册 world.vue 组件
Vue.component('world', {
    //可直接缩写为 world
    'world': world
})

//-------以下为此全局组件（world.vue）的代码---------

<template>
    <div id="world">
        world vue.js
    </div>
</template>

<script>
export default {
    name: 'world'
}
</script>
```

3. 效果

![img02](/images/Vue2/component02.png)

## 3. 使用组件的步骤

1. 在 App.vue（即父组件） 中 script 标签中 使用 import 语法导入需要的组件

代码示例：

```javascript
import hello from "@/component/hello.vue";
```

2. 接着使用 component 节点注册组件
   代码示例：

```javascript
export default {
    data{},
    component: {
        // 'hello':hello简写为hello
        hello
    }
}
```

3. 以标签形式使用注册好的组件
   代码示例：

```html
<template>
  <div id="box">
    <hello></hello>
  </div>
</template>
```

**感谢阅读！**

以下为 App.vue、main.js 和 html 的完整代码

```html
<template>
  <div id="app">
    <button id="post" v-on:click="post">{{message1}}</button>
    <button id="get" @click="get">{{message2}}</button>
    <hello></hello>
    <world></world>
  </div>
</template>

<script>
  //此处导入局部组件
  import hello from "./components/hello.vue";
  import World from "./components/world.vue";

  // export default {} 是固定写法 为了导出App组件
  export default {
    //此处定义了私有组件！
    components: { hello, World },

    // 导出的App组件名使用 name:'xxx' 定义
    name: "App",

    // 在Vue组件中，data不能和以前一样一以对象的形式，
    // 而应该使用函数的形式，在 return 中可以定义数据
    // 属性之间用逗号隔开
    data() {
      return {
        message1: "发送post请求",
        message2: "发送get请求",
      };
    },

    methods: {
      post() {
        console.log("发送了post请求");
      },
      get() {
        console.log("发送了get请求");
      },
    },
  };
</script>

<style lang="less">
  button {
    display: block;
    margin-top: 10px;
  }
</style>
```

```javascript
import Vue from "vue";

import App from "./App.vue";
//导入全局组件 world.vue
import world from "@/components/world.vue";
//注册 world.vue 组件
Vue.component("world", {
  //可直接缩写为 world
  world: world,
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

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
    <world></world>
  </body>
</html>
```
