// const target = { name: "nihao" };
// const pro = new Proxy(target, {
//   set(target, key, value) {
//     if (typeof value !== "string") {
//       throw new Error("不可以哦");
//     }
//     target[key] = value;
//     return true;
//   },
//   get(target, key) {
//     console.log("qv");
//   },
// });

// setTimeout(() => {
//   //   pro.name = 1;
// }, 1000);

// console.log(pro.name);

// {
//   var name = "刘德华";
//   let age = 20;
// }

// console.log(name);
// console.log(age); // not defined

console.log("start");

async function asyncFunction() {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("async/await");
      resolve();
    }, 1000);
  });
  console.log("等待 await");
}

asyncFunction();

console.log("end");
