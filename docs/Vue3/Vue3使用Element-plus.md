# Vue3 使用 Element-plus

:::tip
element-ui 是配合 vue2 使用，element-plus 是配置 vue3 使用的
:::

## 1. 安装

### 1.1 包管理器的方式

如果是使用 webpack 或者 vite 打包工具新建的项目

```
# NPM
npm install element-plus --save

# Yarn
yarn add element-plus
```

### 1.2 浏览器直接导入

直接通过浏览器的 HTML 标签导入 Element Plus，然后就可以使用全局变量 `ElementPlus`

```html
<head>
  <!-- 导入样式 -->
  <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
  <!-- 导入 Vue 3 -->
  <script src="//unpkg.com/vue@3"></script>
  <!-- 导入组件库 -->
  <script src="//unpkg.com/element-plus"></script>
</head>
```

## 2. 导入使用

### 2.1 导入全部组件且注册所有的图标

```ts
// 导入 element-plus
import ElementPlus from "element-plus";
// 导入 element-plus 样式
import "element-plus/dist/index.css";
// 导入 element-plus 图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
```

声明使用 ElementPlus 全局变量

```ts
// 使用router\vuex\element-plus并挂载
app.use(ElementPlus).use(router).use(store).mount("#app");
```

项目完整的 main.js 文件

```ts
// 导入 vue 和 createApp 方法
import App from "./App.vue";
import { createApp } from "vue";
// 导入路由表
import router from "../router/index";
// 导入 vuex
import store from "../store/index";
// 导入 element-plus
import ElementPlus from "element-plus";
// 导入 element-plus 样式
import "element-plus/dist/index.css";
// 导入 element-plus 图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 导入全局样式
import "@/styles/index.scss";
// 创建 vue 实例
const app = createApp(App);
// 使用router\vuex\element-plus并挂载
app.use(ElementPlus).use(router).use(store).mount("#app");
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
```

### 2.2 按需导入

完成这个功能需要插件的支持

1. 安装插件

```
npm install -D unplugin-vue-components unplugin-auto-import
```

2. 在 webpack.config.js 里添加如下配置

```js
// webpack.config.js
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
};
```

如果使用的是 vite

```ts
// vite.config.ts
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
```

## 3. elemetn-plus 图标的使用

### 安装

1. 包管理器方式

```
# NPM
npm install @element-plus/icons-vue
# Yarn
yarn add @element-plus/icons-vue
# pnpm
pnpm install @element-plus/icons-vue
```

2. 标签导入

通过浏览器的 HTML 标签导入，使用全局变量 ElementPlusIconsVue。

```html
<script src="//unpkg.com/@element-plus/icons-vue"></script>
//unpkg
<script src="//cdn.jsdelivr.net/npm/@element-plus/icons-vue"></script>
//jsDelivr
```

3. 使用方式

以标签的形式直接使用

```html
<el-icon><Plus /></el-icon>
<el-icon><Minus /></el-icon>
<el-icon><CirclePlus /></el-icon>
<el-icon><Search /></el-icon>
```
