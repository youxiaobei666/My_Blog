# vue2 学生签到管理系统案例

## 1.预览、项目介绍  

![img1](/images/Vue2/案例1-1.png)

[视频预览：学生签到管理系统](https://www.bilibili.com/video/BV17g411y7jr/?spm_id_from=333.1007.top_right_bar_window_dynamic.content.click&vd_source=8332fb863fcfc4c24187e6ab978943cb)

## 2.项目分析

::: tip
-- 使用 vue 外部文件导入 <script src="vue/vue.js"></script>

-- 导入需要的 css 框架  bootstrap  <link rel="stylesheet" href="css/bootstrap.css">

-- html 分为两部分，上面是表单 form 提交学生信息，下面是表格 table

-- 使用   <form @submit.prevent="add"> 阻止表单默认事件且触发事件 add ( )
:::

## 3.注意事项

:::tip

1. 使用 v-for 循环渲染表格每一行 （v-for = ' item in list '），item 可以随意换成其他字符，但建议不要修改

2. 在 td 标签中使用插值表达式如下 ：
   :::

```html
<td>{{item.id}}</td>
<td>{{item.name}}</td>
<td>{{item.gender}}</td>
```

**1. 实现表格数据的渲染**

```javascript

<td> {{item.id}} </td>
<td> {{item.name}} </td>
<td> {{item.gender}} </td>

 <tbody class="table-striped">
                <tr class="danger" v-for="item in list" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.gender}}</td>
                    <td>
                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" :id="'cb' + item.id" v-model="item.status">
                            <label class="custom-control-label" :for="'cb' + item.id" v-if="item.status">可通行</label>
                            <label class="custom-control-label" :for="'cb' + item.id" v-else>禁止通行</label>
                        </div>
                    </td>
                    <td>
                        <a href="javascript:;" style="list-style: none;color: black;" v-on:click="remove(item.id)">删除</a>
                    </td>
                </tr>
            </tbody>
```

**2. 使用 vue 实例的 list 属性存储三个默认对象，会分别渲染到 td 标签中的插值表达式中**

```javascript
list: [
  {
    name: "张胜男",
    gender: "男",
    id: 001,
    status: false,
  },
  {
    name: "刘苏苏",
    gender: "女",
    id: 002,
    status: false,
  },
  {
    name: "王小虎",
    gender: "男",
    id: 003,
    status: false,
  },
];
```

**3. methods 对象**
::: tip
使用过滤器 `filter` 方法删除一行 （原理：点击一个元素会有一个 `id` ，过滤下不是这个 `id` 的所有行）
:::

```javascript
remove(id) {
this.list = this.list.filter(item => item.id !== id)
}
```

:::tip
-- add () 函数实现

1. 先判断输入是否为空，使用 if () 方法 （必须要有 return）

2. 通过输入框内的内容创建一个新的对象 obj

3. 新的对象 obj 中的 id = this.nextId ，每次点击提交按钮，id 都会自增加一，同时使用 push () 方法 this.list.push( obj )

4. 每次点击输入框清空
   :::

```javascript
add() {
    if (this.name === '') {
        alert('必需输入学生姓名和性别！')
        return
    }
    // 整理一个新的对象
    const obj = {
        id: this.nextId,
        name: this.name,
        gender: this.gender,
    }

    // 添加数据
    this.list.push(obj);
    // id号自增
    this.nextId++;
    // 输入清空
    this.name = '';
    this.gender = '';
}
```

**感谢阅读**
