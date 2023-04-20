# Vue3_El_i18n 国际化

## 1. 安装依赖

```
npm install vue-i18n
```

## 2. 新建 i18n 文件夹

创建 i18n 的配置文件 index.ts

![img01](/images/Vue3/Vue3_i18n_01.png)

## 3. 配置文件

可以分离出 en， zh 到单独的文件

```ts
// 创建语言列表，不同语言的内容
const messages = {
  en: {
    msg: {
      // showeara
      showtext: "hello world",
      // menu
      menu_userinfo: "user infomation",
    },
  },
  zh: {
    msg: {
      // 显示区域
      showtext: "你好世界",
      // 菜单
      menu_userinfo: "用户信息",
    },
  },
};

const locale = "zh"; // 创建本地标识，通过修改它来控制全文的语言环境

import { createI18n } from "vue-i18n"; // 导入createI18n方法

const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale,
  messages, // 这是定义好的语言表
});

export default i18n; // 导出 i18n
```

## 4. 在 main.ts 导入并挂载

```ts
// i18n
import i18n from "@/i18n";

app.use(i18n).mount("#app");
```

## 5. Vue 组件实现

1. 在 html 中使用比较简单使用 $t() 的全局方法就行

2. 在 script 中使用需要导入

```ts
// script 中
const { t } = i18n.global;
const active_text = computed(() => {
  return t("msg.nav_light_color");
});
```

语言切换 vue 组件代码如下：

```html
<template>
  <el-dropdown class="langselect" triggle="click" @command="handleSelect">
    <div class="langbox">
      <span :style="{ color: textcolor }">{{ $t('msg.nav_langselect') }} </span>
      <img class="langicon" src="../../public/lang.png" alt="" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
  import store from "@/store/index";
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { ElMessage } from "element-plus";
  import vars from "@/scss/vars/index.module.scss";

  const language = computed(() => {
    return store.state.language;
  });

  // 文字样式
  // const textbg: any = computed(() => {
  //   store.state.textbg;
  // });
  const textcolor = vars.elpricol;

  // 切换语言的方法
  const i18n = useI18n();
  const handleSelect = function (lang: string) {
    // 切换local
    i18n.locale.value = lang;
    // vuex
    store.commit("setLanguage", lang);
    // 提示
    ElMessage.success("切换成功！");
  };
</script>

<style lang="scss" scoped>
  .langselect {
    .langbox {
      display: flex;
      align-items: center;
      .langicon {
        width: 26px;
        margin-left: 5px;
      }
    }
  }
</style>
```

效果：

![img02](/images/Vue3/Vue3_i18n_02.png)
