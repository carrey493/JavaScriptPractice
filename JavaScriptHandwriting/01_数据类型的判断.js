//typeof运算符
/* 
识别所有值类型
识别函数类型
识别引用类型，但是无法区分对象，数组以及null
Infinity和NaN会被识别为Number
可以使用typeof来检测一个变量是否存在
*/
let a1;
console.log(typeof a1); //undefined

let b1 = 1;
console.log(typeof b1); //number

let c1 = "1";
console.log(typeof c1); //string

console.log(typeof d1); //object

let e1 = {};
console.log(typeof e1); //object

let f1 = [];
console.log(typeof f1); //object

let g1 = Symbol("g1");
console.log(typeof g1); //symbol

let h1 = true;
console.log(typeof h1); //boolean

let i1 = () => {};
console.log(typeof i1); //function

let j1 = null;
console.log(typeof j1); //object

//instanceof 方法
/* 
用来检测引用数据类型，值类型都会返回false
左操作数是待检测其类的对象，右操作数是对象的类。如果左侧的对象是右侧的实例，则返回true，否则返回false
检测所有new操作符创建的对象都返回true
检测null和undefined会返回false
*/
const foo = () => {};
const arr = [];
const obj = {};
const data = new Date();
const number = new Number(3);
console.log(foo instanceof Function); //=> true
console.log(arr instanceof Array); //=> true
console.log(obj instanceof Object); //=> true
console.log(data instanceof Object); //=> true
console.log(number instanceof Object); //=> true
console.log(null instanceof Object); //=> false
console.log(undefined instanceof Object); //=> false

//constructor 方法
/* 
除了 undefined 和 null 之外，其他类型都可以通过 constructor 属性来判断类型。
*/
const c = 100;
const d = "warbler";
const e = true;
const f = Symbol("f");
const reg = /^[a-zA-Z]{5,20}$/;
const date = new Date();
const error = new Error();
console.log(c.constructor === Number); //=> true
console.log(d.constructor === String); //=> true
console.log(e.constructor === Boolean); //=> true
console.log(f.constructor === Symbol); //=> true
console.log(reg.constructor === RegExp); //=> true
console.log(foo.constructor === Function); //=> true
console.log(arr.constructor === Array); //=> true
console.log(obj.constructor === Object); //=> true
console.log(date.constructor === Date); //=> true
console.log(error.constructor === Error); //=> true

//Object.prototype.toString.call
function typeOf(obj) {
  console.log(Object.prototype.toString.call(obj));
  let res = Object.prototype.toString.call(obj).slice(8, -1);
  res = res.toLowerCase();
  return res;
}
console.log(typeOf([]));

//数组
/* 
通过下面的方法来判断变量是否为数组
*/
let exp1 = [];
let exp2 = "";
console.log(Array.isArray(exp1)); //true
console.log(Array.isArray(exp2)); //false