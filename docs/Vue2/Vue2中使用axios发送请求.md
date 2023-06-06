# Vue2 中使用 axios 发送请求

## 1. 介绍

::: tip
什么是 axios?

Axios，是一个基于 promise 的网络请求库，作用于 node.js 和浏览器中，它是 isomorphic 的(即同一套代码可以运行在浏览器和 node.js 中)。
:::

使用方式如下：

```javascript
<script>
        //调用axios方法得到的返回值是 promise 对象
        axios({
            //请求方式
            method: 'get',
            // 请求地址
            url: 'api'
        }).then(function(books) {
            console.log(books.data)
        })

        // 另一种写法

        const result = axios({
            method: 'get',
            url: 'api'
        })

        result.then(function(books){
            console.log(books.data)
        })
    </script>
```

## 2. axios 请求过程图例

![img01](/images/Vue2/vue_axios01.png)

## 3. 使用 async 和 await 配合 axios 发起请求

:::tip
async 和 await 必须结合使用，有 await 必须要使用 async， 有 async 不一定要使用 await，await 是将异步转为同步,async 和 await 是 es8 语法
:::

```javascript
 <script src="../lib/axios/axios.js"></script>
    <button id="app">post请求</button>
    <script>
        document.querySelector("#app").addEventListener("click", async function() {
            // 如果调用某个方法
            // await 只能在被 async 修饰的方法中使用
            const result = await axios({
                method: 'post',
                url: 'api',
                data: {
                    name: 'zs',
                    age: 20
                }
            })
            console.log(result)
        })
    </script>
```

## 4. 使用解构赋值

1. 解构赋值的时候，使用 ： 进行重命名

2. 调用 axios 之后，使用 async / await 进行简化

3. 使用解构赋值，从 axios 封装的大对象中， 把 data 属性解构出来 { data }

4. 为了后期方便，把解构出来的 data 属性，使用冒号 : 进行重命名 ，一般重命名为 { data: res }

5. 代码演示：

```javascript
<script>
        document.querySelector("#app").addEventListener("click", async function() {
            const {
                //使用 ：进行重命名
                data: res
            } = await axios({
                method: 'post',
                url: 'api',
                data: {
                    name: 'zs',
                    age: 20
                }
            })
            console.log(res)
            //也可以单独取值
            console.log(res.message)
        })
    </script>
```

![img01](/images/Vue2/vue_axios02.png)

## 5. 使用 axios.get() 、axios.post() 来简化请求过程

```javascript
//axios.post('url地址'，{post请求数据体})
document.querySelector("#app1").addEventListener("click", async function () {
  const { data: res } = await axios.post("api", {
    name: "zs",
    gender: "女",
  });
  console.log(res);
});

//axios.get('url地址',{
//     get参数
//     params: {}
// })
document.querySelector("#app2").addEventListener("click", async function () {
  const { data: res } = await axios.get("api", {
    params: {
      id: 1,
    },
  });
  console.log(res);
});
```

![img01](/images/Vue2/vue_axios03.png)
