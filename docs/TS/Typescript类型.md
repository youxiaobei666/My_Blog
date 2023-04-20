# Typescript 类型

## 1. 安装 Typescript

```
npm install typescript -g
```

:::tip
Mac 电脑报错的话在前面加一个 sudo，即 `sudo npm install typescript -g`，然后输入电脑密码。

安装完后使用 tsc 命令测试一下。 `tsc -v` 查看版本
:::

1. 使用 `tsc -init `生成配置文件

2. 编译运行 ts 文件

2.1 安装 ts-node

```
npm install ts-node -g
```

2.2 新建 demo.ts 文件，在终端输入 `ts-node demo.ts`

## 2. TS 类型

### 01\_类型检测:

```ts
// 6种常用类型
let name: string = "游小北";
let age: number = 20;
let bool: boolean = true;
let un: undefined = undefined;
let nu: null = null;
let obj: object = { gender: "男" };

// 联合类型
let lianhe: string | number;
lianhe = "string";
lianhe = 14;
lianhe = true; // err 不能将类型“boolean”分配给类型“string | number”

export {};
```

### 02\_定义数组类型:

```ts
// 不指定类型会有类型推导
let arr = [1, 2, 3];
// 联合类型，也可被推导
let arr1 = ["youxiaobei", 2]; // string | number

let arr3: number[] = [1, 2, 3];
// 指定类型后不能随意往数组内赋值
let arr4: number[] = ["string", 123]; // err 不能将类型“string”分配给类型“number”。

// 定义联合类型数组
let arr5: (number | string)[] = [123, "string"];

// 定义有对象成员的数组
let arr6: object[] = [{ name: "youxiaobei" }, { age: 19 }];
console.log(arr6);
```

### 03\_定义函数:

```ts
function foo(num1: number, num2: number): number {
  return num1 + num2; // 返回值是数字类型，函数就是 ：number
}
console.log(foo(123, 456));
//或者
let bar: (x: string) => number = function (x: string) {
  console.log(x.length); // 函数参数为数字类型
  return 123; // 返回值是数字类型，
};
console.log(bar("youxiaobei"));

// 函数的可选参数，注意可选参数必须在后面
let koo: (x: number, y?: number) => number = function (x: number, y?: number) {
  if (y) {
    console.log("输入了第二个参数");
  }
  return x;
};

koo(1, 2);
koo(3);

// 参数默认值
let boo: (x: number, y?: string) => number = function (
  x: number,
  y: string = "默认值"
) {
  console.log(y);

  return x;
};

console.log(boo(1, "hhhh"));

// 剩余参数
function pushArr(arr1: any[], ...items: any[]) {
  let newArr: any[] = arr1;
  items.forEach((item) => {
    newArr.push(item);
  });
  console.log(newArr);
}
let arr: any[] = [1, 2];
pushArr(arr);
pushArr(arr, [123], [456]);
```

### 04\_定义元祖:

```ts
let yuanzu: [string, number, boolean]; // 元祖类型，数量类型都得对应
yuanzu = ["youxiaobei", 1, true];

// 当数量和类型都不确定，使用 any[]
let nuknown: any[];
nuknown = [1];
nuknown = ["youxiaobei"];
nuknown = [1, 2, 3, "string"];

// 解构
let emploee: [number, string] = [1, "youxiaobei"];
let [id, name] = emploee;
console.log(`id : ${id}`); //id : 1
console.log(`name : ${name}`); //name : youxiaobei

// 元祖可选元素
let choose: [string, boolean?];
choose = ["i can choose", true];
console.log(`choose : ${choose}`);
choose = ["i no choose"];
console.log(`choose : ${choose}`);

// 元祖剩余元素
let lefted: [string, ...number[]];
lefted = ["lefted meta", 1, 2, 3, 4, 5];
console.log(`lefted : ${lefted}`);
lefted = ["only one"];
console.log(`lefted : ${lefted}`);

// 只读 readonly
let readonly: readonly [string, number] = ["i am readonly", 124];
readonly = ["i want get in", 123];
readonly = ["123", 123];
console.log(readonly); //可以赋值
// readonly[1] = 1234 //无法分配到 "1" ，因为它是只读属性
// readonly.push(1) //类型“readonly [string, number]”上不存在属性“push”
export {};
```

### 05\_字符串字面量类型:

```ts
let derc: "top" = "top";
derc = "sss"; // 不能将类型“"sss"”分配给类型“"top"”

type derction = "top" | "down";
let changederc = function (derc: derction) {
  console.log("改变了方向");
};

changederc("left"); // 类型“"left"”的参数不能赋给类型“derction”的参数
changederc("top");

// 数字字面量类型及布尔字面量类型
interface IConfig {
  number: 1 | 2 | 3;
  derc: "top" | "left" | "down" | "right";
  isEated: true | false;
}

let test = function (user: IConfig) {
  // 接口定义类似对象的类型
};

export {};

test({
  number: 1, //不能将类型“4”分配给类型“1 | 2 | 3”。
  derc: "center", //不能将类型“"center"”分配给类型“"top" | "down" | "left" | "right"
  isEated: "yes", //不能将类型“string”分配给类型“boolean”
});
```

### 06\_接口作用使用:

```ts
interface IConfig {
  // 此处定义的是字面量作类型限制，而不是类型符号
  number: 1 | 2 | 3;
  derc: "top" | "left" | "down" | "right";
  isEated: true | false;
}

let test = function (user: IConfig) {
  // 使用接口当作类型，减少代码冗余
  // 接口定义类似对象的类型
};

// 类型别名type覆盖，多次定义接口会合并，同一个接口定义多次合并为一个
interface I1 {
  number1: number;
}

interface I1 {
  number2: number;
}

const obj: I1 = { number1: 123, number2: 456 };
console.log(obj);

export {};
```

### 07\_泛型:

```ts
// 泛型只在调用的使用被确定
let fanx = function <T>(args: T) {};

fanx<number>(123); // good
fanx<string>(123); // err 类型“number”的参数不能赋给类型“string”的参数。

// 泛型约束，继承接口,可为接口定义的类型
interface ItoExtend {
  name: string;
  age: number;
}

let personEat = function <T extends ItoExtend>(user: T) {
  console.log(`${user.name} is xxx!`);
};

personEat({ name: "游江川", age: 20 });
```

### 08_types 类型 和 interface 接口:

```ts
// 两者定义对象和函数

// 1. type定义
type object1 = {
  name: string;
  age: number;
};

type function1 = (x: number, y: boolean) => void;

// 2. interface
interface Iobject2 {
  name: string;
  age: number;
}

interface Ifunction2 {
  (x: number, y: boolean): void;
}

let tp: function1 = function () {};
tp(1, true);

let inte: Ifunction2 = function () {};
inte(123, 12); // 类型“number”的参数不能赋给类型“boolean”的参数。

// 类型别名其他用法
// primitive
type Name = string;

// object
type PartialPointX = { x: number };
type PartialPointY = { y: number };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

// dom
let div = document.createElement("div");
type B = typeof div;
```
