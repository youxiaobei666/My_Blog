# 对象操作 definePropoty

## 1. 创建 javascript 对象的方法

字面量创建：

```js
var obj = {
  name: "张三",
  age: 18,
  run: function () {
    console.log("i am running");
  },
};
```

通过 new Object 方法：

```js
var obj = new Object();
obj.name = "王德发";
obj.age = 23;
obj.walk = function () {
  console.log(this.name + " is walking");
};
obj.walk(); // "王德发 is walking"
```

## 2. 简单的操作对象属性

删除、添加对象属性：

```js
var obj = {
  name: "刘德华",
  age: 16,
  run: function () {
    console.log("i am running");
  },
};
delete obj.name; // 删除对象某个属性
console.log(obj); // {age:16, run: ƒ}

obj.gender = "男"; // 添加某个属性
console.log(obj); // {age: 16, gender: '男', run: ƒ}
```

## 3. Object.definePropoty() 方法定义操作对象属性

这个方法可以定义对象属性的一些特性，基本格式为

```js
Object.defineProperty(操作的对象名,"属性名",{ 对象属性描述符 })

Object.defineProperties(操作的对象名,{
    属性名1: {
    对象属性描述符
    }，

    属性名2: {
    对象属性描述符
    }
})
```

### 3.1 描述符

1. 数据属性描述符：

```js
value: "南昌市",
writable: true,
configurable: false
enumerable: true,
```

:::tip

- value: 设置初始值
- writable: 设置是否可重写修改
- configurable：设置是否可删除，或者更改为另一种对象描述符--存取属性描述符
- enumerable：设置是否可使用 for in 遍历、Object.keys() 取出

:::

代码如下：

```js
var obj = {
  name: "刘德华",
  age: 16,
  run: function () {
    console.log("i am running");
  },
};

Object.defineProperty(obj, "address", {
  value: "南昌市", // 属性初始值
  writable: true, // 值是否可修改
  configurable: false, // 不可 delete 删除,不可修改特性，不可修改切换为存储属性
  enumerable: true, // 可for-in枚举遍历，可Object.keys()返回
});

// 测试可修改 writable
obj.address = "九江市";
console.log(obj.address); // 九江市
// 测试不可配置-删除
delete obj.address;
console.log(obj.address); // 九江市
// 不可配置-修改为存取属性
Object.defineProperty(obj, "address", {
  // 报错：Uncaught TypeError:Cannot redefine property: address
  get() {}, // 取
  set() {}, // 存
});
// 测试可枚举
for (var key in obj) {
  console.log(key);
  // age
  // walk
  // gender
  // address
}
```

2. 存取属性描述符：

:::tip

- get: 当取对象某个属性值会执行此函数
- set: 当修改对象某个属性的值会执行此函数（Vue2 响应式原理）
- configurable：设置是否可删除，或者更改为另一种对象描述符--存取属性描述符
- enumerable：设置是否可使用 for in 遍历、Object.keys() 取出

:::

```js
// 设置一个私有属性 private variable
var obj = {
  name: "刘德华",
  age: 16,
  _address: "天津市",
  run: function () {
    console.log("i am running");
  },
};
console.log(obj); // {name: '刘德华', age: 16, _address: '天津市', run: ƒ}
Object.defineProperty(obj, "address", {
  // address 被隐藏了,虽然存在但没暴露在 obj
  configurable: true, //默认为true
  enumerable: false, // 默认为true
  get: function () {
    // 取
    return this._address;
  },
  set: function (value) {
    // 存
    this._address = value;
  },
});
console.log(obj.address); // 天津市, 可取
obj.address = "茂名市";
console.log(obj.address); // 茂名市， 可改
console.log(Object.keys(obj)); // ['name', 'age', '_address', 'run'] 无法遍历出 address
```
