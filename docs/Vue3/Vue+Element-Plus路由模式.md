# Vue + Element-Plus 路由模式

:::tip
使用 `element-plus` 里的 `el-menu` 菜单组件，配置里面 `el-menu-item` 标签的 `index` 项，配置为 路由路径，就无须使用 router.push 方法来跳转路由
:::

:::warning
注意：在 el-menu 标签使用  **:router=true**  来开启路由模式 就可以做到路由跳转
:::

## 1. 导入 element-Plus,导入 el-menu

代码如下：

```ts
// 导入 element
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 注册 所有的 el 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

......

app.use(ElementPlus).mount('#app');
```

:::tip

1. 在 el-menu 中设置属性 router = " true " 开启路由模式

2. 在 el-menu-item 中配置你想跳转到的路径 index

3. `<el-menu-item class="elsubmenu" index="/home/userinfo/id">`

:::

HTML 如下：

```html
<template>
  <el-menu
    :default-openeds="actveIndex"
    default-active="2"
    :background-color="menubg"
    :text-color="textbg"
    class="el-menu-vertical-demo"
    router="true"
  >
    <el-sub-menu class="elsubmenu">
      <template #title>
        <el-icon>
          <User></User>
        </el-icon>
        <span>{{ $t('msg.menu_userinfo') }}</span>
      </template>
      <el-menu-item class="elsubmenu" index="/home/userinfo/id">
        <el-icon><Postcard></Postcard></el-icon>
        <span>{{ $t('msg.menu_id') }}: {{ store.state.userInfo.id }}</span>
      </el-menu-item>
    </el-sub-menu>
    <!-- 系统菜单 -->
    <el-menu-item index="/home/sysmenu">
      <el-icon><menu></menu></el-icon>
      <span>{{ $t('msg.menu_system_menu') }}</span>
    </el-menu-item>
    <el-menu-item index="/home/chats">
      <el-icon><ChatDotSquare></ChatDotSquare></el-icon>
      <span>{{ $t('msg.menu_chats_center') }}</span>
    </el-menu-item>
  </el-menu>
</template>
```

## 2. 配置路由表

路由表如下：

注意：`RouteRecordRaw `是 ts 类型。采用的是路由懒加载的模式

```ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login", // 默认往登录页跳转，存在token直接去往主页
  },
  {
    path: "/login",
    component: () => import("@/views/login/Login.vue"), // 路由懒加载 no need name
  },
  {
    path: "/home",
    component: () => import("@/views/home/Home.vue"),
    children: [
      {
        path: "userinfo",
        component: () => import("@/components/menu/userinfo.vue"),
        children: [
          {
            path: "id",
            component: () => import("@/components/menu/userinfo/id.vue"),
          },
          {
            path: "name",
            component: () => import("@/components/menu/userinfo/name.vue"),
          },
          {
            path: "city",
            component: () => import("@/components/menu/userinfo/city.vue"),
          },
          {
            path: "hobby",
            component: () => import("@/components/menu/userinfo/hobby.vue"),
          },
        ],
      },
      {
        path: "sysmenu",
        component: () => import("@/components/menu/sysmenu.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
```
