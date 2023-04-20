# Vue3 入门

## 1. Vue2 -> Vue3 的变化

:::tip

第一点：使用 `Proxy` 进行数据劫持, 而 Vue2 使用 `Object.defineProperty`。defineProperty 的方式在添加和删除对象的 key 时是无法监听到的。

第二点：删除了一些不必要的 API,比如 $on $off 和 $once,移除了 `filter`。

第三点：由 options API 转换为 Composition API ，options API 的痛点：内聚性差，而后者可以把相同类型的代码按照功能放置在一起。而无需在多个 options 里面寻找。

第四点： 代码的复用：由 Vue2 的 `mixins` 在 多个组件中共享逻辑，但是也不够简练，并且存在命名冲突的问题。在 Vue3 中可以使用 `Hook` 函数抽离出可复用的代码。

:::

## 2. 使用 vue3

### 2.1 导入：

- 方式一： CDN 导入（介绍什么是 CDN）
- 方式二： 本地导入

### 2.2 使用：

- 了解 Vue 对象 和其中的 CreateApp 函数（作用：创建 VUE 实例）
  函数需要传递一个参数 （Object）

- 渲染到哪里？
  被定义 id 为 app 的盒子

- 渲染什么内容？
  一个配置对象。里面的 template 属性，值为 字符串，引号里面是 html 标签。还有 data 里面的数据。

- 如何挂载？
  App.mount() 方法，传递 id 为 app 的盒子 id

代码实例：

```html
<div id="app">里面的内容会被替换</div>
<script src="./Vue.js"></script>
<script>
  // app 可以理解为数据源
  const app = {
    template: "<h2>示例</h2>",
  };

  // 使用 Vue 的 CreateApp 的方法,并创建一个 Vue 实例
  const App = Vue.createApp("app");

  // 有了实例之后进行挂载，挂载到哪？ 上面定义id为 app 的盒子内部
  // 使用Vue的 mount 方法挂载实例
  App.mount("#app");
</script>
```

问题 1: 在 app 对象里写 template 是麻烦的：

解决方案：

- 定义 `<template>` 标签，给定一个 id 值。或者一个 div 给定一个 id 值。
- 二者的区别是： 前者的 template 标签本身是不会被渲染的，而后者是会被浏览器渲染的。代码如下：

```html
<body>
  <div id="app">里面的内容会被替换</div>
  <!-- 以下页面结果是：
   这是模版字符串 -->
  <template id="ID">这是{{ message }}</template>
  <!-- 如果使用 div,结果为 ：
        这是{{ message}}
        这是模版字符串
  因为div是会被当作普通元素渲染的
  -->
  <div id="ID">这是{{ message}}</div>
  <script src="./Vue.js"></script>
  <script>
    // app 可以理解为数据源
    const app = {
      template: "#ID",
      // 在 data 里定义数据，在 Vue3 中是一个函数
      data: function () {
        return {
          message: "模版字符串",
        };
      },
    };

    // 使用 Vue 的 CreateApp 的方法,并创建一个 Vue 实例
    const App = Vue.createApp("app");

    // 有了实例之后进行挂载，挂载到哪？ 上面定义id为 app 的盒子内部
    // 使用Vue的 mount 方法挂载实例
    App.mount("#app");
  </script>
</body>
```

## 3. MVVM

MVC 和 `MVVM` 都是一种软件设计模式，Vue 就是 启发与 MVVM

- `M ` 是 model，一般指的是代码的逻辑
- `V ` 是视图，一般指 template DOM 模版
- `VM` 是视图模型，主要作用是绑定数据和监听 DOM 元素的变化。

![img01](/images/Vue3/MVVM01.png)

## 4. mustache 语法

双括号`{{}}`就是 mustache 语法,内部可以写很多语法，最基础的还是把数据渲染到视图或许属性中。

```html
<script>
  ...
  message: 'hello youxiaobei',
  number: 123,
  showThis: true
  ...
  sayHello (str){
    console.log(str)
  }
</script>
<!-- 1 基本使用 -->
<!-- hello youxiaobei + hello youxiaobei -->
<h2>{{message}} + {{message}}</h2>

<!-- 2 计算表达式 -->
<!-- 1230 -->
<h2>{{number*10}}</h2>
<!-- youxiaobei hello -->
<h2>{{message.split('').reverse().join('')}}</h2>

<!-- 3 可直接调用函数 -->
<!-- 你好 -->
<h2>{{sayHello('你好')}}</h2>

<!-- 4 三元运算 -->
<!-- show -->
<h2>{{showThis? 'show' : 'dont show'}}</h2>
```

::: danger
错误的使用方法:

- 赋值
- 带有 if else 的复杂逻辑

:::

## 5. 指令

常用的指令：

- v-once。 只会渲染一次，即使有 mustache
- v-text。innerText
- v-html。 innerHtml
- v-pre。 不希望展示 mustache
- v-cloak。 防抖
- v-bind。动态绑定属性

### v-bind

大多数可以采取省略写法 `:`

**如何动态绑定 class？**

1. 对象法：

class 对象写法，对象里面多个 key，多个 class 结合

```html
<script>
  ...
  object = { name: "youxiaobei", age: "21" };
  sayHello = function(){
    return 'hello'
  }
  ...
</script>

<!-- 1 多类名 -->
<!-- <div class="name age"></div>  -->
<div :class="{name: 'youxiaobei', age: '21'}"></div>

<!-- 2 结合动态类名 -->
<!-- <div class="static name"></div> -->
<div class="static" :class="{name: 'youxiaobei'}"></div>

<!-- 3 直接放入一个对象 -->
<!-- <div class="static name age"></div> -->
<div class="static" :class="object"></div>

<!-- 4 使用函数的返回值，或者 computed 函数返回值 -->
<!-- <div class = "hello"></div> -->
<div :class="sayHello()"></div>
```

2. 数组法

直接给 `v-bind:class` = 赋值一个数组，数组内部可有字符串、对象、甚至三元运算符

```html
<script>
  ...
  name: 'youxiaobei',
  show: false
  ...
</script>
<div :class="['str',name,showThis? 'show', 'dont show']"></div>
```

**如何动态绑定 style?**

:::tip
由于和动态绑定 class 差不多，这里不再描述，需要注意的是 双引号内部是单引号包裹
:::

**如何动态绑定属性？**

```html
<script>
  ...
  value: 'youxiaobei'
  information: {
    name: 'youxiaobei',
    age: '21',
    gender: '男'
  }
  ...
</script>
<!-- 简单用法 -->
<!-- <div name="youxiaobei">value 需要在逻辑中定义</div> -->
<div :[name]="value">value 需要在逻辑中定义</div>

<!-- 对象用法 -->
<!-- <div name="youxiaobei" age='21' gender= '男'>不要再使用 ：缩写，而是使用 v-bind 附一个对象</div> -->
<div v-bind="information">不要再使用 ：缩写，而是使用 v-bind 附一个对象</div>
```

### v-on

用来监听用户交互事件的指令，大多情况可简写为 `@`

v-on 支持修饰符，修饰符相当于对事件进行了一些特殊的处理

这些事件的默认参数是 `$event`，其他更多的参数是被允许传递的。

- .stop 一调用 event.stopPropagation,阻止冒泡。
- .prevent -调用 event.preventDefault0。
- .capture -添加事件侦听器时使用 capture 模式。
- .self- 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- .(keyAlias}一仅当事件是从特定键触发时才触发回调。
- .once - 只触发一次回调。
- .left- 只当点击鼠标左键时触发。
- .right - 只当点击鼠标右键时触发。
- .middle -只当点击鼠标中键时触发。
- .passive - { passive: true }模式添加侦听器

案例：

```html
<button @click.stop="handle($event,'你好')"></button>

<input type="text" @keyup.enter="enterNext" />

<script>
  enterNext () {
    console.log(e.target.value);
  };
</script>
<!-- 输入框的值，在敲回车后显示 -->
```
