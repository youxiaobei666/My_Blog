# JavaScript 的内存&作用域&闭包

## 1. 执行上下文与作用域

执行上下文简称 “ 上下文 ”，变量和函数的上下文决定了它们可以访问哪些数据、以及它们的行为。每个上下文都有一个变量对象 VO(variable object) ，在此上下文定义的变量都会保存在这个对象之中。

全局上下文是最外层的上下文，里面定义的变量和函数存放的对象叫全局对象 GO(global object)，也就是我们常说的 window 对象，在此定义的函数和变量都会成为 window 对象的方法和属性。

```js
var name = "张三"; // 全局属性
var age = 18;
var gender = "男";
var person = {
  name: "李四",
  age: 20,
};
// 全局方法
var foo = function () {
  console.log("你好");
};
```

![img01](/images/JS/JS作用域闭包01.png)

当函数执行的时候，会创建一个独立的执行上下文，并放入全局上下文（执行栈），当函数执行完毕，其执行上下文会移出全局执行上下文，其内部的变量和函数也随之销毁。

上下文中的代码在执行的时候，会创建变量对象的一个作用域链（scope chain），作用域链决定了各级上下文读取变量和函数的顺序。

```js
var name = "张三"; // 全局属性
var person = {
  // 全局执行上下文的一个对象，保存的是一个地址
  name: "李四", // 在内存中开辟空间去存放
};
// 全局方法
var foo = function () {
  var hobby = "篮球"; // 函数局部属性
  console.log("你好");
  console.log(name); // 张三，沿着作用域链往上找到全局中的 name，而不是 person 对象中的
  console.log("你好");
  console.log(person.name); // 李四
};
foo();
console.log(hobby); // undefined，只能在全局找，找不到就 undefined，不能往下找
console.log(name); // "张三"， 此时只能访问全局的变量
```

上下文的代码执行完毕后上下文被销毁，包括其中定义的变量和方法，全局上下文仅当程序退出或者关闭浏览器才会被销毁。

```js
// bar 会被销毁
var foo = function () {
  var bar = function () {
    var role = "玄武";
    console.log(role); // "玄武"
  };
  return bar;
};
foo();
console.log(bar); // undefined, foo 执行完被销毁
```

## 2. 垃圾回收

JavaScript 是使用垃圾回收的语言，对于不需要的变量和对象，所占的内存应该被释放掉。并不是所有时间都那么容易发现哪个不需要使用了，如何标记不使用的变量有两种方法：标记清理、引用计数。

**标记清理**：当变量进入上下文，比如在函数内部声明一个变量，变量会被标记存在于上下文，但是不存在也不应该被释放，因为谁也保证不了是不是要用到，当变量离开了上下文，会被标记离开上下文的标记。给变量标记的方法很多种，关键是策略。当过了指定的时间间隔，垃圾回收程序会把标记不再使用的变量销毁并收回其内存。

**引用计数**：其思路是对每个值都标记它被引用到的次数，被引用就+1，再被另一个变量引用也+1，引用它的变量被覆盖（销毁），那么引用数-1，当过了指定的时间间隔，垃圾回收程序会把引用数为 0 的变量销毁并收回其内存。

引用计数的缺点：对于下面的 object1 和 object2 的标记数都为 2，不会被清理。

而针对以下标记清除没问题，当 foo 执行完后，object1 和 object2 都会被标记不存在于上下文。

```js
function foo() {
  var object1 = {
    name: "object1",
    obj: object2,
  };
  var object2 = {
    name: "object2",
    obj: object1,
  };
  console.log(object1); // {name: 'object1', obj: undefined}
  console.log(object2); // {name: 'object2', obj: {name:object1,obj:undefined}}
}
foo();
```

```js
function koo() {
  function foo() {
    bar();
  }

  function bar() {
    foo();
  }
  foo(); // Maximum call stack size exceeded 栈溢出
}

koo(); // 对于标记清理，按理此时 koo 里面的都会被标记为不存在于上下文，
// 可是函数内部存在循环调用，执行栈溢出。。。
```

## 3. 内存泄漏

JavaScript 内存泄漏大部分是不合理的定义、引用变量导致的。对于有限的内存来说是个大问题。

```js
function foo() {
  name = "张三";
  console.log(name); // "张三"
}
foo();

console.log(name); // "张三"
console.log(window.name); // "张三"
```

```js
function bar() {
  var name = "张三";
  console.log(name); // "张三"
}
bar();

console.log(name); // ""
console.log(window.name); // ""
```

此时 name 在 foo 函数内部定义，可是未使用 var、let、const，就会被定义在全局（window）。

![img02](/images/JS/JS作用域闭包02.png)

定时器造成内存泄漏：回调函数引用了外层函数 foo 的变量 age ，导致内存泄露。

```js
// 定时器内存泄露

function foo() {
  var age = 18; // 被引用，计时器不结束就不销毁
  setInterval(() => {
    console.log(age);
  }, 1000);
}

foo();
```

## 4. 闭包

闭包又称词法闭包（Lexical Closure）、函数闭包（function closures），是在支持头等函数（函数可被作为参数传递）的编程语言的实现词法绑定的技术。闭包类似一个结构体，里面存放一个函数（通常是个地址）和与其关联的环境。当捕捉闭包的时候，它的自由变量（函数外部定义内部引用）会在捕捉时被确定，这样即便脱离了捕捉时的上下文，它也能照常运行，也就造成了内存泄漏。

如下就是一个闭包：

```js
var foo = function () {
  var age = 18;
  var boo = function () {
    console.log(age);
  };
  return boo;
};

var bar = foo(); // 全局变量 bar 引用了  age
```

内存图：

![img03](/images/JS/JS作用域闭包03.png)

```js
// 闭包 1
var foo = function () {
  var age = 18;
  var boo = function () {
    console.log(age);
    age++; // 此时对 age + 1,
  };
  return boo;
};

var bar = foo(); // 全局变量 bar 引用了  age

bar(); // 执行完不清空执行上下文 , age 不会被清除 // 18
bar(); // 又因为上次 age 被 + 1，这次输出 19
```

```js
// 闭包 2
function aoo() {
  var a = 18;
  return function () {
    return ++a;
  };
}

console.log(aoo()()); // 此时并没有在全局接受，执行完清空上下文 //19
console.log(aoo()()); // 第二次执行之前已经清空了执行上下文 //19
console.log(aoo()()); // 19
```

```js
// 闭包 3
function coo() {
  var b = 18;
  return function () {
    return --b; // 此时 -1
  };
}

var bqq = coo();

console.log(bqq()); // 17
console.log(bqq()); // 16
console.log(bqq()); // 15
```
