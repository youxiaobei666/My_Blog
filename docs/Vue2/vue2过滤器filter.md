# vue2 过滤器 filter

::: tip
提示：Vue 过滤器在 vue3 中已经被弃用
:::

## 1. 过滤器 filter 分为全局过滤器和局部（私有）过滤器

局部过滤器的权重**高于**全局过滤器

使用方法：

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

eg：先看例子(首字母大写)

```javascript
    <script src="../lib/vue/vue.js"></script>
    <script>
        // vue2全局过滤器(必须写在Vue实列的上面)
        Vue.filter('capitalize', function(val) {
            const first = val.charAt(0).toUpperCase();
            const other = val.slice(1);
            return first + other + ' 全局过滤器';
        })

        const vm = new Vue({
            el: '#app',

            data: {
                message: 'hello vue.js!'
            },
            // vue2局部过滤器
            filters: {
                capitalize(val) {
                    const first = val.charAt(0).toUpperCase();
                    const other = val.slice(1);
                    return first + other + '局部过滤器';
                }
            }
        })
    </script>
```

代码如上，效果如下：
![img1](/images/Vue2/filter01.jpeg)

## 2. 全局过滤器的定义方法

使用 `Vue.filter` 方法

```javascript
Vue.filter("过滤器名", function (形参) {
  操作;
  返回所过滤的值;
});
```

## 3. 局部过滤器定义，直接在 Vue 实例中定义 filters 对象

注意局部过滤器 `filters` , 而全局过滤器没有 s 是 `filter`。

## 4. 过滤器的使用范围：

`{{}} `插值表达式中或者 `v-bind` 表达式

## 5. 注意点

{{ 要被处理的文本 | 过滤器名 }}

::: tip

1.  `“|”`  小竖线叫做管道符 在它前面的是要被处理的文本参数（作为后面过滤器的实参），在它后面的就是过滤器名。ps:可串联使用“ | ” 进行多次过滤处理。

2.  在过滤器函数中一定要有 `return 值`

3.  当全局过滤器和局部过滤器重名时，会采用局部过滤器。

:::

​**感谢阅读**
