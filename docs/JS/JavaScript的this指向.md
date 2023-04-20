# JavaScript 的 this 指向

:::tip
this 是 JavaScript 的一个关键字，与 var、let、function 关键字不一样，this 这个关键字是不确定的，它作为一个指向某个对象或者某个值的关键字，不同情况指向不同。
:::

## 1. window

window 是全局变量对象（Global object），在我们直接打印 this 的时候输出 window。这是默认不做任何能造成绑定操作的默认情况。

```js
console.log(this); // window
```

## 2. 独立函数调用（默认绑定 window）

```js
function foo() {
  console.log(this);
}

foo(); //独立函数调用、自执行会绑定为 window
// 其实就是 window.foo()
```

## 3. 立即执行函数（默认绑定 window）

```js
// 立即执行函数

(function foo() {
  console.log(this); // window
})();
```

## 4. 函数互相调用（默认绑定 window）

```js
// 互相调用
// 本质上都是独立执行 window.foo
function foo1() {
  foo2();
  console.log(this); // window
}

function foo2() {
  foo3();
  console.log(this); // window
}

function foo3() {
  console.log(this); //window
}

foo1(); // 开启调用
```

## 5. 函数作为参数（默认绑定 window）

```js
// 函数作为参数 1
function foo(funArg) {
  funArg();
}

function bar() {
  console.log(this); // window
}

foo(bar);

// 函数作为参数 2
var obj = {
  message: "",
  pee: function () {
    console.log(this); //window
  },
};

foo(obj.pee); // 虽然可见 obj.pee 可是只是为了传递参数，并没隐式绑定 obj
```

## 6. 对象绑定（隐式绑定）

```js
var obj = {
  age: 18,
  gender: "nan",
  foo: function () {
    console.log(this);
  },
};

obj.foo(); // obj, 默认绑定，谁调用谁就是 this
```

### 对象互相绑定，就近原则：

```js
// 对象互相绑定
var bar = function () {
  console.log(this);
};

var obj1 = {
  name: "obj1",
  foo: bar,
};

var obj2 = {
  obj1: obj1,
  name: "obj2",
};

obj2.obj1.foo(); // obj1
```

### 隐式绑定失效：

```js
// 隐式丢失
var bar = function () {
  console.log(this); // window ,此时还是独立调用
};

var obj = {
  name: "obj",
  bar: bar,
};

var foo = obj.bar;

foo(); // window , 丢失了隐式绑定的 obj
```

## 7. bind、apply、call 显示绑定

此三种方法可以传入参数，传入的就是绑定的 this，这个参数可以是变量，也可以是数字或者字符串。

bind 绑定会返回一个**新的函数**，另外两种会立即执行。

call 和 apply 的区别：apply 传入数组，call 传入参数列表

```js
// 使用 call、apply、bind, 传入参数就是this
foo() {
    console.log(this);
}
var newfoo = foo.bind(456);

newfoo() // 456
foo.call(123); // 123
foo.apply("abc"); // abc
```

## 8. new 绑定

```js
// new 绑定
function Person(name) {
  this.name = name;
  console.log(this); // Person { name : "张三"}
}

var person = new Person("张三");
console.log(person); // Person { name : "张三"}
console.log(typeof person); // object
```

## 9. 优先级

### 1. bind、apply、call 显示绑定的优先级会高于 window 默认绑定

```js
var obj1 = {
  age: 18,
  gender: "nan",
  foo: function () {
    console.log(this);
  },
};

var obj2 = {
  name: "obj2",
};
var newfoo = obj1.foo.bind(obj2);
newfoo(); // obj2
```

### 2. new 绑定的优先级最高

```js
// new 绑定的优先级最高
function foo() {
  console.log(this); // foo {}
  console.log(typeof foo); // function
}

var obj = {
  foo: foo,
};

var bar = new obj.foo(); // foo {}
console.log(typeof bar); // object
```

## 10. 无效绑定

当给 bind、apply、call 传入 null 或者 undefined 会忽略显示绑定

```js
// 忽略显示绑定：在绑定的时候传入 null 或者 undefined 会忽略显示绑定, 使用默认的绑定
var foo = function () {
  console.log(this);
};

function koo() {
  console.log(this);
}

var obj = {
  name: "张三",
  bar: foo,
};
obj.bar.call(obj); // obj
obj.bar.apply(null); // window,并不会隐式，而是 window
obj.bar.apply(undefined); // window
```

## 11. 箭头函数不绑定 this

箭头函数只会沿着作用域链向上查找，this 绑定无效。

```js
var point = () => {
  console.log(this);
};

point.call("abc"); // window

var obj = {
  message: "你好",
  bar: function () {
    var foo = (() => {
      console.log(this);
    })();
  },
};

obj.bar(); // obj
```

## 12. 计时器 this 只绑定 window

```js
// 计时器不绑定上层作用域，绑定 window
var obj = {
  message: "你好",
  bar: function () {
    setInterval(function () {
      console.log(this); // window
      console.log(this.message); // undefined
    }, 1000);
  },
};

obj.bar();
```

### 解决方案 1：that

```js
// 计时器不绑定上层作用域解决方案
var obj = {
  message: "你好",
  bar: function () {
    var that = this;
    setInterval(function () {
      console.log(that); // obj
      console.log(that.message); // "你好"
    }, 1000);
  },
};

obj.bar();
```

### 解决方案 2：将回调函数换成箭头函数

```js
// 计时器不绑定上层作用域解决方案
var obj = {
  message: "你好",
  bar: function () {
    var that = this;
    setInterval(() => {
      // 换成箭头函数，回去上级作用域找
      console.log(that); // obj
      console.log(that.message); // "你好"
    }, 1000);
  },
};

obj.bar();
```
