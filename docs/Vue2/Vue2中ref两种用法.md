# ref 两种用法

## 1. 给普通元素添加 ref

--1. 给普通元素添加了 ref 可以使用 this.$refs.( ref 名) 可以获取到普通 dom 元素

--2. ref 名可自行定义，在 this.$refs 后使用可以进行操作，修改 css 样式等：
我们先准备一个 text3.vue 子组件：

```javascript
<template>
    <div>
        <button @click="changeVal">修改内容</button>
        <hr>
        //ref 名为 iptVal
        <input type="text" ref="iptVal" value="~~未修改的内容">
    </div>
</template>

<script>
export default {
    methods: {
        changeVal() {
            this.$refs.iptVal.value = "？？这是修改后的"
            this.$refs.iptVal.style.backgroundColor = "red"
        }
    }
}
</script>
```

效果：
![img01](/images/Vue2/ref01.png)

## 2. 给组件添加 ref

1. 给组件添加 ref 的方法：在父组件 App.vue 中 template 中 text3 标签中绑定 ref
2. 在子组件中去掉开始的 button 标签，我们可以通过父组件直接改变至上面一样
3. 在父组件中定义一个按钮，来直接调用子组件中的 changeVal 方法：

```javascript
<template>
  <div>
    <text3 ref="text3Change"></text3>
    <button @click="toSon">父组件的按钮</button>
  </div>
</template>


methods: {
       toSon() {
         this.$refs.text3Change.changeVal()
       }
      }
```

![img02](/images/Vue2/ref02.png)
