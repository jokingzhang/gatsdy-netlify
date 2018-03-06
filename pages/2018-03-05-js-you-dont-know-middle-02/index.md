---
title: 你不知道的JavaScript 中卷 阅读笔记2：值（value）
desc: 数组（Array）、字符串（String）、和数字（Number）是一个程序最基本的组成部分，但在JavaScript中，他们可谓让人喜忧参半。下面来了解一下，怎样合理的运用。
date: "2018-03-05T08:08:12+08:00"
layout: post
path: "/2018-03-05-js-you-dont-know-middle-02/"
type: article
tags:
  - js.Array
  - js.String
  - js.Number
  - js
---

看到一段学街舞的文字，记录下来：

> "跳街舞想要进步，必须多涉猎不同舞种，学习各种元素，应用融入到自己的专攻舞种"
"学会享受重复"
"基本功的无限重复可以克服身体的任何缺陷"
......
老师语录，小本本记下来[爱心]


## 数组

**`Array.from()` 方法从一个类似数组或可迭代对象中创建一个新的数组实例。**

example:

```
const bar = ["a", "b", "c"];

// Array
Array.from(bar);// ["a", "b", "c"]

// String
Array.from('foo');// ["f", "o", "o"]

// Set
let s = new Set(['foo', window]);
Array.from(s); // ["foo", window]

// Map
let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m); // [[1, 2], [2, 4], [4, 8]]

// Array from an Array-like object (arguments)
function f() {
  return Array.from(arguments);
}
f(1, 2, 3);// [1, 2, 3]

//数组去重合并

function combine(){
    let arr = [].concat.apply([], arguments);  //没有去重复的新数组
    return Array.from(new Set(arr));
}

var m = [1, 2, 2], n = [2,3,3];
console.log(combine(m,n));  // [1, 2, 3]

```

## 字符串

在 JavaScript 中，字符串是不可变的，数组是可变的。

```
var a = "foo";
var b = ["f","o","o"];

a[1] = "O";
b[1] = "O";

a; // "foo"
b; // ["f","O","o"]
```

有许多数组函数来处理字符串很方便。虽然字符串没有这些函数，但是可以通过“借用”数组的**非变更**方法来处理字符串。

```
var a = "foo";
var b = ["f","o","o"];

var c = Array.prototype.join.call(a, "-");
var d = Array.prototype.map.call(a, function(v) {
  return v.toUpperCase() + '.';
}).join("");
```

因为字符串是不可变的，所以不可以借用`Array.prototype.reverse.call`等方法。

一个通用的破解法是将字符串转为数组，待处理完再将结果转回字符串：

```
var c = a.split("").reverse().join(); // "oof";
```

## 数字

特别大和特别小的数字默认使用指数格式来显示，与toExponential()函数的输出结果相同
```
var a = 5E10;
a; // 50000000000
a.toExponential() // "5e+10"
```
toFixed(..)可指定小数部分显示位数：

```
(42.59).toFixed(1); //"42.6"
```

toPrecision(..)可指定有效显示位数：

```
(42.59).toPrecision(3); //"42.6"
```


考虑到代码的易读性，推荐使用`0x`,`0o`,`0b`来表示[十六进制][八进制][二进制]。

可以使用`Number.EPSILON`来比较两个数字是否相等（指定误差范围内）

```
function numbersCloseEnoughToEqual(n1,n2) {
  return Math.abs(n1 - n2) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

numbersCloseEnoughToEqual(a, b); // true
numbersCloseEnoughToEqual(0.000000001, 0.000000002); // false

```
Number.isSafeInteger() 方法用来判断传入的参数值是否是一个“安全整数”（safe integer）。
安全整数范围为 -(253 - 1)到 253 - 1 之间的整数，包含 -(253 - 1)和 253 - 1。

```
Number.isSafeInteger(3);                    // true
Number.isSafeInteger(Math.pow(2, 53))     //false
```

## 特殊的值

`null` 是一个特殊的关键字，不是标识符，我们不能将其当做变量来使用，赋值。
`undefined` 是一个标识符，可以被当做变量来使用，赋值。

`void` 是一个内置的标识符，他的值为 `undefined`。

```
void 0;// undefined
```

判断`NaN`可以利用它不等于自身的特点。
```
if (!Number.isNaN) {
  Number.isNaN = function(n) {
    return n !== n;
  }
}
```

在`JavaScript`中，`Infinity` 代表无穷

```
var a = 1 / 0; // Infinity
var b = -1 / 0; // -Infinity
```

0可以有负值：-0

判断**-0**的方法：
```
function isNegZero(n) {
  n = Number(n);
  return (n === 0) && (1/n === -Infinity);
}
isNegZero(0) //false
isNegZero(0/-3) //true
```

ES6 新增了一个方法：`Object.is(..)`来判断两个**值**是否绝对相等
这是一个简单的`polyfill`
```
if (!Object.is) {
  Object.is = function(v1, v2) {
    //判断是否是-0
    if (v1 === 0 && v2===0) {
      return 1/v1 === 1/v2;
    }

    //判断是否是NaN
    if (v1 !== v1) {
      return v2 !== v2;
    }

    //其他情况
    return v1 === v2;
  }
}
```

Array copy：`slice(..)` 会返回*数组*的潜副本。
Object copy：`JSON.parse(JSON.stringify({a:1}))`;

简单标量基本类型（null、undefined、字符串、数字、布尔、和symbol）的值可以通过**复制**来 赋值/传递，而复合值（对象，数组等）通过**引用**来 赋值/传递。JavaScript中的引用不能指向别的变量/引用，只能指向值。


