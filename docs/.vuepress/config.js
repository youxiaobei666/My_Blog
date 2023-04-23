module.exports = {
  title: "游小北前端",
  description: "游小北的个人博客", // meta
  // 顶部
  head: [["link", { rel: "icon", href: "/icon.ico" }]],
  // 主题
  themeConfig: {
    smoothScroll: true,
    logo: "/logo.png",
    // 导航栏
    nav: [
      { text: "主页", link: "/" },
      // vue2
      {
        text: "Vue2",
        items: [
          {
            text: "Vue2过滤器filter",
            link: "/Vue2/vue2过滤器filter.md",
          },
          {
            text: "Vue2计算属性computed",
            link: "/Vue2/vue2计算属性computed.md",
          },
          {
            text: "Vue2侦听器watch的概念与使用",
            link: "/Vue2/vue2侦听器watch的概念与使用.md",
          },
          {
            text: "Vue2中的props属性",
            link: "/Vue2/Vue2中的props属性.md",
          },
          {
            text: "Vue2中ref两种用法",
            link: "/Vue2/Vue2中ref两种用法.md",
          },
          {
            text: "vue2中使用axios发送请求",
            link: "/Vue2/Vue2中使用axios发送请求.md",
          },
          {
            text: "Vue2组件的注册与使用",
            link: "/Vue2/Vue2组件的注册与使用.md",
          },
          {
            text: "Vue2学生签到管理系统案例",
            link: "/Vue2/vue2学生签到管理系统案例.md",
          },
        ],
      },
      // vue3
      {
        text: "Vue3",
        items: [
          {
            text: "Vue3入门",
            link: "/Vue3/Vue3入门.md",
          },
          {
            text: "Vue3进阶",
            link: "/Vue3/Vue3进阶.md",
          },
          {
            text: "Vue+Element-Plus路由模式",
            link: "/Vue3/Vue+Element-Plus路由模式.md",
          },
          {
            text: "Vue3_El_i18n国际化",
            link: "/Vue3/Vue3_El_i18n国际化.md",
          },
          {
            text: "Vue3使用Element-plus",
            link: "/Vue3/Vue3使用Element-plus.md",
          },
          {
            text: "Vue3 + Bootstrap4 完成表单验证",
            link: "/Vue3/Vue3+Bootstrap4完成表单验证.md",
          },
          {
            text: "diff 算法",
            link: "/Vue3/diff算法.md",
          },
          {
            text: "响应式原理",
            link: "/Vue3/响应式原理.md",
          },
          {
            text: "梳理知识点",
            link: "/Vue3/梳理知识点.md",
          },
        ],
      },
      // node
      {
        text: "Node",
        items: [
          {
            text: "node基础_fs文件系统模块",
            link: "/Node/node基础_fs文件系统模块.md",
          },
          {
            text: "原生 http 和 Express + Mysql",
            link: "/Node/原生http和express+mysql.md",
          },
          {
            text: "Express 框架",
            link: "/Node/Express.md",
          },
          {
            text: "脚手架 Express-generator",
            link: "/Node/脚手架Express-generator.md",
          },
        ],
      },
      // webpack
      { text: "Webpack", link: "/Webpack/index.md" },
      // axios
      { text: "Axios", link: "/Axios/Axios介绍和基本使用.md" },
      // TS
      {
        text: "Typescript",
        items: [
          {
            text: "Typescript类型",
            link: "/TS/Typescript类型.md",
          },
        ],
      },
      //JS
      {
        text: "Javascript",
        items: [
          {
            text: "V8引擎编译Javascript的过程",
            link: "/JS/V8引擎编译Javascript的过程.md",
          },
          {
            text: "JavaScript的内存_作用域_闭包",
            link: "/JS/JavaScript的内存_作用域_闭包.md",
          },
          {
            text: "对象操作definePropoty",
            link: "/JS/对象操作definePropoty.md",
          },
          {
            text: "JavaScript的this指向",
            link: "/JS/JavaScript的this指向.md",
          },
          {
            text: "JS对象原型和构造函数",
            link: "/JS/JS对象原型和构造函数.md",
          },
          {
            text: "JS数组方法合集",
            link: "/JS/数组方法.md",
          },
          {
            text: "面试基本问题",
            link: "/JS/面试基本问题.md",
          },
        ],
      },
      // Git
      { text: "Git", link: "/Git/index.md" },
      // 项目
      {
        text: "项目-GitHub",
        link: "https://github.com/youxiaobei666?tab=repositories",
      },
    ],
    sidebar: "auto",
  },
};
