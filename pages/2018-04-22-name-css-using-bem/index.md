---
title: 使用BEM的方式来写scss
date: "2018-04-22T17:11:55+08:00"
desc: BEM 是一种真正消除不确定性的命名方式，它使得结构样式更加清晰，我们有足够的信心做任何修改。
layout: post
readNext: "/2018-02-18-understanding-the-react-component-lifecycle/"
path: "/2018-04-22-name-css-using-bem/"
type: article
tags:
  - css
  - BEM
  - scss
---


### BEM 命名
> BEM 是一种真正消除不确定性的命名方式，它使得结构样式更加清晰，我们有足够的信心做任何修改。

- block：模块，名字单词间用 - 连接
- element：元素，模块的子元素，以 __ 与 block 连接
- modifier：修饰，模块的变体，定义特殊模块，以 -- 与 block 连接

例如：
```
.user-home-nav
  .user-home-nav-item.user-home-nav-item--small
    .user-home-nav-item__icon
    .user-home-nav-item__text
```

scss 中这样写：
```
.user-home-nav {
    color: red;
    &-item {
        color: blue;
        &--small {
            color: yellow;
        }
        &__icon {
            color: #434312;
        }
        &__text {
            color: #002233;
        }
    }
}

```
这样命名的好处：
- 语义化，此处的语义化不是指 html 标签的语义化，对 SEO 可能也没有任何意义，但是这是一种人阅读的语义化。语义化的重要意义：宁可增加 html 大小，力图使维护变得轻松。
- 减少层层嵌套，有利于渲染效率。


解析之后就是这样：
```
.user-home-nav {
  color: red;
}

.user-home-nav-item {
  color: blue;
}

.user-home-nav-item--small {
  color: yellow;
}

.user-home-nav-item__icon {
  color: #434312;
}

.user-home-nav-item__text {
  color: #002233;
}

```

问题：如何给 `modifier` 下的 `element` 定义规则呢？

```
.user-home-nav {
    color: red;
    &-item {
        color: blue;
        &--small {
            color: yellow;
            .user-home-nav__icon {}
            .user-home-nav__text {}
        }
        &__icon {
            color: #434312;
        }
        &__text {
            color: #002233;
        }
    }
}

```
这样做太不优雅了，太违背 sass 的优雅性质了。或许是我没有找到更好的写法？

其他问题：

- 如何确定一个 block？就像上面 .user-home-nav-item 也可以写成 .user-home-nav__item，如果 item 下有 title，那么就是 .user-home-nav__title，以避免写成 .user-home-nav__item__title，但是如果 nav 已有 title .user-home-nav__title 了，或许我们要把 item 下的 title 写成 .user-home-nav__item-title，总之为了使 BEM 也不至于复杂化，命名上也许还是要纠结一番。所以我最终写成了 .user-home-nav-item，也许可以这么写下去，没有 B 和 M，trello 貌似就是这样，例如：.attachment-thumbnail-details-options-item-text。
- BEM 导致 CSS 规则重用性降低，如果重用尽量考虑写成通用模块.

### BEM + 命名空间

命名空间定义 block 间的关系，这种方式网站上还没有大范围使用，最常见的如 .js－ 表示定义 JavaScript 钩子，不用于定义样式。常见命名空间：

- o-：表示一个对象（Object），如 .o-layout。
- c-：表示一个组件（Component），指一个具体的、特定实现的 UI。如 - .c-avatar。
- u-：表示一个通用工具（Utility），如 .u-hidden。
- t-：表示一个主题（Theme），如 .t-light。
- s-：表示一个上下文或作用域（Scope），如 .s-cms-content。
- is-，has-：表示一种状态或条件样式。如 .is-active
- _：表示一个 hack，如 ._important。
- js-：表示一个 JavaScript 钩子。如 .js-modal。
- qa-：表示测试钩子。

例如一个圆形头像组件：

```
.c-avatar-circle
  &__img
    display: block
    vertical-align: top
    max-width: 100%
    border-radius: 100%

  &__name
    text-align: center
```

以上，BEM 产生的**重用性**问题还是没有解决，如何解决？

### 模块

模块化类似于分离的概念，也是分离进化的结果，我们从分离中提取出 `.hidden {overflow: hidden}` 这样的命名，进而扩展 `.avatar {} `这样的命名，不再只包含一条规则。看一下 airbnb 的圆形头像写法：

html：
```
a.pull-right.media-photo-badge.card-profile-picture.card-profile-picture-offset.is-superhost
  .media-photo.media-round
    img
```
css:

```
.c-card-profile-picture
  width: 60px
  height: 60px

  &-offset
    position: relative
    top: -40px
    margin-bottom: -40px

  &.is-superhost
    position: relative

  img
    width: 56px
    height: 56px

.t-media-photo
  backface-visibility: hidden
  position: relative
  display: inline-block
  vertical-align: bottom
  overflow: hidden
  background-color: #bbb

.t-media-round
  border-radius: 50%
  border: 2px solid #fff
```

这个是比较复杂，相对特例的。.media-photo 和 .media-round 是典型的抽象出来的模块，一个定义照片的基本属性，一个定义圆形属性。.card-profile-picture 是特定的命名定义特定具体的值。

### 为当前组件增加环境

根据不同的环境，比如窗口大小（响应式）,[current-device](https://github.com/matthewhudson/current-device) 还可以使用 `at-root` 来做标识。

```
.s-order {
    &--body {
        position: relative;
        width: 100%;
        height: 100%;
        display: block;
        margin: 0 auto;
        padding-bottom: 30px;
        &.freezeScroll {
          overflow: hidden;
        }
        &.has-content {
          padding-bottom: 180px;
        }
        &.has-loaded {
          background-color: #fff;
        }
        @at-root {
          .platform-desktop & {
            min-width: 1024px;
          }
        }
        @media screen and (min-width:0\0) {
          padding-bottom: 220px;
          &.has-content {
            padding-bottom: 220px;
          }
        }
    }
}
```

转换之后：

```
.s-order--body {
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  margin: 0 auto;
  padding-bottom: 30px;
}

.s-order--body.freezeScroll {
  overflow: hidden;
}

.s-order--body.has-content {
  padding-bottom: 180px;
}

.s-order--body.has-loaded {
  background-color: #fff;
}

.platform-desktop .s-order--body {
  min-width: 1024px;
}

@media screen and (min-width: 0\0) {
  .s-order--body {
    padding-bottom: 220px;
  }
  .s-order--body.has-content {
    padding-bottom: 220px;
  }
}
```
### 参看文章：

- [CSS 命名规范总结](https://jiandanxinli.github.io/2016-08-11.html)
- [Sass ＠at-root](https://www.w3cplus.com/preprocessor/Sass-3-3-new-feature-at-root-bem.html)
