# Vue2 中的 props 属性

## 1. 什么是 props 

props 用于组件的传值，他的工作就是为了接受外面传过来的数据，是一个配置项，与 `data、el、ref` 是一个级别的。

## 2. props 的使用

1. 先准备子组件 Text1.vue ，一个父组件 app.vue ，在 App.vue 中导入两个子组件

2. 在 App.vue  中 导入 text1.vue 组件

![img01](/images/Vue2/props01.png)

3. 在父组件中子组件标签里传数据给子组件

```html
<template>
  <div>
    <text1 name="张胜男" brith="2002" age="20"></text1>
  </div>
</template>
```

4. 在子组件定义 props 对象，里面包含三个数据，在 template 标签 中 div 标签 里面使用此数据

![img02](/images/Vue2/props02.png)

## 3. props 属性

### 3.1 props 数据类型

![img03](/images/Vue2/props03.png)

我们先来看一下输出的结果，生日和年龄看似是数字类型，实际上是字符串类型，通过 Vue 调试工具可以看到是字符串类型。
![img04](/images/Vue2/props04.png)

在这种情况下：实现生日 +1 的功能，会怎样呢，会不会报错？

```html
<template>
  <div>
    <text1 name="张胜男" brith="2002 + 1" age="20"></text1>
  </div>
</template>
```

可以看到并没有报错，但生日这项并没有像我们预期的一样是 2003，所有应该怎样操作？

--- 我们可以在 brith 前面加一个 `:` 符号

```html
<template>
  <div>
    <text1 name="张胜男" :brith="2002 + 1" age="20"></text1>
  </div>
</template>
```

为了防止操作失误传错数据（虽然不影响显示，但是影响字符串拼接、数字计算）

我们就需要限制一下数据的类型。代码演示：

```javascript
props: {
        "name": String,
        "brith": Number,
        "age": Number
    },
```

### 3.2 单向数据流

::: tip
所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

额外的，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。
:::

这样修改数据是错误的：

```javascript
<button @click="changeAge">修改年龄</button>

methods: {
        changeAge() {
            this.age = 88
        }
    },
```

**解决方案：**
我们需要使用一个中间值 temp 接收传来的 props 数据，然后对 temp 更改即可。

```javascript
data() {
        return {
            temp: this.age
        }
    },

    methods: {
        changeAge() {
            this.temp = 88
        }
    },
```

::: tip
注意：原来的年龄插值是 `{ age }`，但是使用此方法， 年龄插值就需要改变为 `{ temp }`
:::

### 3.3 props 设置属性必传数据（数值不可为空），和属性默认值

```javascript
props: {
        'name': {
            type: String,
            default: '刘德华'， // 默认值
            required: true // 必须传值
        },
        'brith': {
            type: Number
        },
        'age': {
            type: Number
        }
    },
```
