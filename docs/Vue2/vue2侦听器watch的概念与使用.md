# vue2 侦听器 watch 的概念与使用

## 1. 什么是 watch 侦听器？

:::tip
watch 侦听器允许开发者监视数据的变化，是 Vue 提供的一种用来观察和响应实例上数据变化的属性，属性发生变化，便会触发对应的监听函数。

侦听器 watch 实际上是 Vue 实例中的一个对象属性。
:::

**语法格式如下：**

```javascript
const vm = new Vue({
  el: "#app",

  data: { username: " " },

  watch: {
    //监听 username 值的变化
    //newVal 是变化之后的值，oldVal 是变化之前的值

    username(newVal, oldVal) {
      console.log(newVal, oldVal);
    },
  },
});
```

我们先做个实例：

![img1](/images/Vue2/watch01.png)

每次输入一个数字后，控制台都会输出新的值与旧的值（当不定义 `oldVal`时就只会输出新值）。

## 2. 注意事项：

::: tip

1. 侦听器被定义在 watch 节点下

2. 侦听器本质是个函数
   :::

## 3. 侦听器的格式

### 1.方法格式的侦听器（缺点）

1. 无法在刚进入页面的时候自动触发。

2. 如果监听了一个对象，那就无法监听对象内部属性变化

### 2. 对象格式的侦听器（优点）

1. 在 watch 中可以先注册一个对象,对象名就是侦听的对象，在对象中注册  `handler( newVal, oldVal )`  函数， 然后通过 `immediate: ture`  选项，让侦听器自动触发。

## 4. 定义对象格式的侦听器

代码如下：

```javascript
const vm = new Vue({
el: '#app',
        data: {
            username: ''
        },
        watch: {
            //定义对象格式的侦听器
            username: {
                //侦听器处理函数
                handler(newVal, oldVal) {
                    console.log(newVal, oldVal)
                }，
                immediate: true
            }
        }
    })
```

**注意：**

1.如果不使用 ` immediate ` 选项，也不会立刻触发

2.`handler(newVal, oldVal) { }`  也可以写成：`handdler: function(newVal, oldVal) { }`（前者为简写）

![img2](/images/Vue2/watch02.png)

## 5. 深度监听（deep）

**代码演示：**（ps: v-bind 注意使用 info.username ）

```javascript
const vm = new Vue({
  el: "#app",

  data: {
    info: {
      username: "123",
    },
  },

  watch: {
    info: {
      //侦听器处理函数
      handler(newVal) {
        console.log(newVal);
      },
      //使用deep开启深度监听，只要info对象中任何一个属性变化，都会触发‘对象的侦听器’
      deep: true,
    },
  },
});
```

**效果如下：**

![img](/images/Vue2/watch03.png)

此时会输出一个对象里面会有新的 username 值，（缺点：此方法输出了整个对象）

ps: 此方法有简易写法（控制台会直接输出对象中的子属性，而不是整个对象）

```javascript
watch: {
  'info.username' (newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  }
```

:::tip
-- 单引号内表示为一个表达式，对象里面的 `info.username` 变化了就会触发侦听器，可以设置多个侦听器，例如 `'info.time'` 、`'info.gender'` 。
:::

**感谢阅读！**

​
