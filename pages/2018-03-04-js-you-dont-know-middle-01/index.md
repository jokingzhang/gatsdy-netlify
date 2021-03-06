---
title: 你不知道的JavaScript 中卷 阅读笔记1：类型（type）
desc: JavaScript 有七种内置类型：null、undefined、boolean、number、string、object 和 symbol，可以使用 typeof 运算符来查看。
date: "2018-03-04T08:31:29+08:00"
layout: post
path: "/2018-03-04-js-you-dont-know-middle-01/"
type: article
tags:
  - js.typeof
  - js
---

## 内置类型

> javascript 有七种内置类型：

+ 空值 (null) // (!a && typeof a === "object")
+ 未定义 (undefined) // typeof undefined
+ 布尔值 (boolean) // typeof true
+ 数字 (number) // typeof 14
+ 字符串 (string) // typeof "14"
+ 对象 (object) // typeof {life: "simple"}
+ 符号 (symbol, ES6新增) // typeof  Sumbol() === "symbol";

**typeof null === 'object' // true**

所以，检查 null 的时候，需要使用 `(!a && typeof a === "object")` 来判断。

**typeof function a() {} === "function"; //true**

function(函数) 也是`Javascript`的一个内置类型。然而查阅规范就会知道，它其实是`object`的一个子类型。具体来说，函数是“可调用对象”，它有一个内部属性[[Call]]，该属性使其可以被调用。
`length` 属性是
**typeof [1,2,3] === 'object' //true**

## 值和类型

在作用域声明过还未赋值的变量是`undefined`。相反，还没有声明过的变量是`undeclared`的。

example:

```
var a;
a; // undefined
b; // ReferenceError: b is not defined

typeof a; // "undefined"
typeof b; // "undefined"
```

所以，在日常coding的时候，应该这样来判断`undefined`：

```
//这样是错误的
if (DEBUG) {
  console.info('DEBUG is starting.');
}

//这样是安全的
if (typeof DEBUG !== "undefined") {
  console.info('DEBUG is starting');
}
```






