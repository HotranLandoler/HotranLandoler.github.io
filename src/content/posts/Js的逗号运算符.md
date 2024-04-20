---
title: Js的逗号运算符
slug: js-comma
pubDate: 2024-04-20
description: 关于JavaScript中逗号运算符和索引相关概念的学习
tags: ["frontend"]
---

Js中的数组索引本质上是访问对象属性，也就是说，`arr[0]`等价于访问`arr`对象名为`0`的属性，与`obj.a`和`obj["a"]`概念相同。

这时又想到一个问题，如果在索引中给出多个值会发生什么？

```javascript
let arr = [0, 2, 3];
console.log(arr[0, 1]); // => 2
```

与Python不同，js中多个值的索引并非是数组切片。这时才了解到此前忽视的**逗号运算符**概念，多个值被逗号分隔开时（不包括函数参数列表等情况），先从左到右执行，最后返回最右端的值。因此，`arr[0, 1]`等价于`arr[1]`。

```javascript
console.log((0, 1)); // => 1
```
