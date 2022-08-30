---
title: "emmet(에멧) 정리!"
excerpt: "emmet(에멧) 사용법을 정리했습니다. 에멧을 잘 사용하면 HTML 작업 능률이 엄청 올라갑니다!"
date: "2022-08-30"
category: ["etc"]
---

> emmet(에멧) 사용법을 정리했습니다. 에멧을 잘 사용하면 HTML 작업 능률이 엄청 올라갑니다!

# emmet(에멧)

[cheat sheet](https://docs.emmet.io/cheat-sheet/)

에멧은 HTML 태그를 CSS 입력하듯 쓸 수 있게 도와주는 스니펫입니다.

# 부모 > 자식 element

`nav>ul>li`

```html
<nav>
  <ul>
    <li></li>
  </ul>
</nav>
```

# 남매 element

`div+p`

```html
<div></div>
<p></p>
```

# class

`div.awesome`

```html
<div class="awesome"></div>
```

여러 개도 됩니다.

# id

`div#awesome`

```html
<div id="awesome"></div>
```

# 내용 넣기

`h1{Hello}`

```html
<h1>Hello</h1>
```

# 여러 개 만들기

`span*3`

```html
<span></span><span></span><span></span>
```

# Item Numbering

`h$*3`

```html
<h1></h1>
<h2></h2>
<h3></h3>
```

`ul>li.item-$.row-$*3`

```html
<ul>
  <li class="item-1 row-1"></li>
  <li class="item-2 row-2"></li>
  <li class="item-3 row-3"></li>
</ul>
```

# Lorem ipsum

- `lorem`: 한 문단 생성
- `lorem5`: 다섯 단어 생성
- `lorem*3`: 세 문단 생성

> 저는 한 문단 한글 lorem ipsum도 스니펫으로 추가해뒀습니다.

# img

`img:z`

```html
<img src="" alt="" sizes="" srcset="" />
```

# Attribute

`a[href='https://custardcream.vercel.app']`

```html
<a href="https://custardcream.vercel.app"></a>
```

# Climb-up

`div>span+a^p`

```html
<div><span></span><a></a></div>
<p></p>
```
