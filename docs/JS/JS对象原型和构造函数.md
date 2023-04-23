# JS 对象原型和构造函数

## 1. 对象的原型是对象，函数的原型也是对象

每一个对象都是有原型的，原型也是对象，原型对象里有很多函数，我们可以通过 obj.\_\_proto\_\_ 的方法取到原型并添加属性，在此原型创建的对象都会继承此属性。

```js
var person1 = {
  name: "obj1",
  age: 18,
};
var person2 = {
  // 字母量创建一个对象
  gender: "girl",
};
person1.__proto__.perosnif = "是人类"; // 给原型添加属性
console.log(person2.perosnif); // 是人类
console.log(person2.name); // undefined
console.log(person2.gender); // girl
```

查找属性的时候会优先找自身属性，如果自身属性找不到就会前往原型（按照原型链）查找，找不到就会输出 undefined。

值得注意的是函数的原型是一个对象而不是函数，使用 fun.prototype 取到原型：

```js
function foo() {}

console.log(foo.prototype); // {constructor: ƒ}
```

## 2. 对象原型内存表现

如果在原型上定义了一个 sing 函数，我们的对象都可直接使用的，并且是完全一样的。

因为它们都是使用的同一内存上的那个原型对象的 sing 函数

```js
person1.__proto__.sing = function () {
  console.log("singing");
};

console.log(person1.sing === person2.sing); // true
```

![img01](/images/JS/JS原型链01.png)

## 3. 使用构造函数创建对象

使用函数构造一个对象，使用 new function 的方法：

```js
// Person 构造函数
function Person(name, age) {
  // 传入两个参数
  this.name = name;
  this.age = age;
  this.sing = function () {
    console.log("singing");
  };
}

var person1 = new Person("张三", 18);
```

这里注意一点，当我们创建第二个对象的时候，里面的 sing 方法是不一样的，因为每次执行 Person 后都会重新创建新的函数去赋值

```js
var person1 = new Person("张三", 18);
var person2 = new Person("李四", 19);

console.log(person1.sing === person2.sing); // false
```

![img02](/images/JS/JS原型链02.png)

---

在构造函数的原型上定义 sing 方法：

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sing = function () {
  console.log(this.name + " is singing");
};

var person1 = new Person("张三", 18);
var person2 = new Person("李四", 19);

console.log(person1.sing === person2.sing); // true
person1.sing(); // 张三 is singing
```

内存表现：此时共用同一个原型对象里的方法

![img03](/images/JS/JS原型链03.png)
