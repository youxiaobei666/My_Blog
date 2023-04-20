# Vue3+Bootstrap4 完成表单验证

:::tip
技术栈：vue3 + Bootstrap

难点：封装函数

细节：正则表达式、vue3 声明周期、改变 Bootstrap 类名间接改变样式、ref 和 v-model
:::

预览

![img01](/images/Vue3/vue3_boot01.png)

## 1. 安装使用 Bootstrap

```
// 使用包管理工具下载
// npm install bootstrap
// yarn install bootstrap
```

因为 Bootstrap 是基于 jQuery 实现的，我们还需要安装 jQuery

我们需要在 main.js 文化里导入依赖，导入 jQuery 后再导入 Bootstrap，之后还需要导入 Bootstrap 的 css 和 js 文件。

```js
// 引入jQuery、bootstrap
import $ from "jquery";
import "bootstrap";
// 引入bootstrap样式
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
```

那我们就可以利用 Bootstrap 给 input 设置类名 ' is-valid ' (合法) 和 ' is-invalid ' (不合法) ，

根据判断出的结果来设置不同的（类名）样式

## 2. 实现验证的功能

### 1. 正则表达式：

我们需要为不同的输入表单（用户名、密码、邮箱、手机号）定义一些不同的正则规则：

```js
// 正则规则
let regName = /^[a-zA-Z0-9]{3,9}$/;
let regPassword = /^[a-zA-Z0-9|!|?|.|@|%|]{6,9}$/;
let regEmail = /^[a-zA-Z0-9]{6,14}@[a-z]{3,6}.com$/;
let regPhone = /^1[1|3|5-9]{2}[0-9]{8}$/;
```

简单介绍一下正则表达式，以 regName 为例:

![img02](/images/Vue3/vue3_boot02.png)

## 2. 绑定好数据

1. 调用这个方法需要传入一个正则表达式，和一个节点 element，通过 vue3 的 v-model 绑定输入框内的值，ref 绑定 input 节点本身

```html
<!-- 姓名 -->
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">姓名:</span>
  </div>
  <input
    ref="usernameIpt"
    --
    ref
    绑定节点，
    v-model="username"
    --
    v-model
    绑定节点
    placeholder="请输入您的用户名"
    type="text"
    class="form-control"
    --
    添加新的类名在这就会改变样式的
    aria-label="Username"
    aria-describedby="basic-addon1"
  />
</div>
```

2.  通过 if 判断检测结果是否为 true 来使用 setAttribute 设置不同的样式

:::tip
用 Bootstrap 给 input 设置类名 `is-valid` (合法) 和 `is-invalid` (不合法)

预览合法的样式：is-valid
:::

## 3. 封装一个正则判断并修改样式的方法 regMethods()

1. 函数需要传入一个对应的正则表达式，对应的节点

例如传入 regName 正则表达式，同时传入 usernameIpt 节点。

```js
// 封装正则判断方法
const regMethods = (thisReg, ele) => {
  if (thisReg.test(ele.value.value)) {
    // setAttribute 改变类名 bootstrap改变样式
    ele.value.setAttribute("class", "form-control is-valid");
  } else {
    ele.value.setAttribute("class", "form-control is-invalid");
  }
};
```

2. 传入正则判断

:::tip
我们知道 input 节点有 聚焦 onfocus 和 失焦 onblur 事件，

这里的案例选择的当我们失去焦点时进行判断
:::

所以我们需要封装一个函数 regRun 包含我们每一个需要验证的 input 节点的各自的生效函数，regMethods 需要的两个参数也是在这一步传入的

```js
// 正则生效函数
const regRun = () => {
  // 失焦调用方法 1.用户名
  usernameIpt.value.onblur = () => {
    regMethods(regName, usernameIpt); // 调用判断方法，并传参
  };
  // 2.密码
  passwordIpt.value.onblur = () => {
    regMethods(regPassword, passwordIpt); // 调用判断方法，并传参
  };
  // 3.邮箱
  emailIpt.value.onblur = () => {
    regMethods(regEmail, emailIpt); // 调用判断方法，并传参
  };
  // 4.手机号
  phoneIpt.value.onblur = () => {
    regMethods(regPhone, phoneIpt); // 调用判断方法，并传参
  };
};
```

## 4. 在所有节点都挂载完后再运行此函数，vue 的数据响应会重新判断（重新调用 regRun）

在 vue 的生命周期 onMounted 里运行此函数（regRun），确保所有 DOM 元素都渲染完毕。

```html
<script setup>
   // vue3组合式api

  // 导入依赖 onMounted、ref
  import { onMounted, ref } from "vue";

  ***

  onMounted(() => {
    // 调用正则函数
    regRun();
  });
</script>
```
