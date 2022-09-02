---
title: "CSS 기본 다지기"
excerpt: "CSS 기본기를 다지는 시간을 가졌습니다!"
date: "2022-09-02"
category: ["CSS"]
---

> CSS 기본기를 다지는 시간을 가졌습니다!

# 목표

![subject](../static/img/CSS_기본_다지기/subject.png)

오늘은 이런 페이지를 만들어보며 마크업의 기초를 다져보겠습니다.

## HTML, CSS를 짜기 전에 Remind

코딩을 할 때는 작은 조각들을 만들어 합쳐나가지만, 마크업을 짤 때는 꼭 **큰 덩어리부터** 만들어야 합니다.

# CSS 기본

## initial value, User Agent Stylesheet

```css
/* Type Selector */
div {
  color: tomato; /* Property: Value */
}
```

모든 CSS Property에는 지정하지 않아도 주어지는 디폴트 값이 있습니다. 이런 값을 `initial value`라고 합니다.

![User Agent Stylesheet](../static/img/CSS_기본_다지기/useragentstylesheet.png)

`User Agent Stylesheet`라고 브라우저에서 정한 기본값도 있습니다. 이건 **initial value와는 다릅니다.**

```html
<body>
  <style>
    div {
      background-color: tomato;
    }
  </style>
  <div>wow</div>
</body>
```

<p align='center'>
<iframe src='../examples/LikeLion/9월2일%20CSS%20특강/no1.html' style="width: 50%; height:100px;"></iframe>
</p>

여기에서 'wow'를 컨텐츠로 가지고 있는 `div`는 `User Agent Stylesheet`에서 정한 `body`의 `margin: 8px;`에 영향을 받고 있는 것을 볼 수 있습니다.

### 각 브라우저의 User Agent Stylesheet

- [크롬 기본 제공 스타일](https://chromium.googlesource.com/chromium/src/third_party/+/master/blink/renderer/core/html/resources/html.css)
- [파이어폭스 기본 제공 스타일](https://searchfox.org/mozilla-central/source/layout/style/res/html.css)

> 브라우저에서 제공하는 `User Agent Stylesheet`는 개발자가 의도하지 않은 결과를 낳을 위험이 있으므로 reset하는 과정이 필요합니다. `margin: initial`같이 `initial` 키워드를 사용하면 property에 따른 `initial value`가 들어가고, 또는 임의로 값을 부여해도 됩니다.

## height, width

`height`와 `width`의 `initial value`는 `auto`입니다.

그럼 `width: auto;`와 `width: 100%;`는 어떻게 다를까요? 다음 예시를 보겠습니다.

```css
div {
  margin-left: 30px;
}
.auto {
  width: auto;
  background-color: tomato;
}
.oneHundred {
  width: 100%;
  background-color: teal;
}
```

<p align='center'>
<iframe src='../examples/LikeLion/9월2일%20CSS%20특강/no2.html' style="width: 50%; height:100px;"></iframe>
</p>

즉, `width: auto;`는 브라우저가 계산한 자식(자신)의 `margin`, `padding`, `border`등을 고려해 **유연하게** 부모가 제공하는 최대 컨텐츠 영역 너비만큼을 줍니다.

반면, `width: 100%;`는 부모가 제공하는 최대 컨텐츠 영역을 가져오고, 거기에 마진을 더합니다. 더 자세한 내용은 [여기에](https://ishadeed.com/article/auto-css/?ref=sidebar) 정말 잘 설명돼 있습니다.

`height: auto;`는 자식(자신)이 가지는 컨텐츠 높이만큼 **유연하게** 가져갑니다. 부모를 기준으로 정하는 `width`와는 달리 자식(자신)을 기준으로 한다는 점이 포인트입니다.

## box-sizing

요소의 사이즈를 결정하는 방법을 정하는 프로퍼티입니다. `initial value`는 `content-box`입니다. value를 `border-box`로 바꾸면 어떻게 달라지는지 아래의 예시를 보겠습니다.

```css
div {
  width: 100px;
  height: 100px;
  padding: 20px;
}
.content-box {
  box-sizing: content-box;
  background-color: tomato;
}
.border-box {
  box-sizing: border-box;
  background-color: teal;
}
```

<p align='center'>
<iframe src='../examples/LikeLion/9월2일%20CSS%20특강/no3.html' style="width: 50%; height:270px;"></iframe>
</p>

즉, `content-box`는 컨텐츠의 크기를 `width`와 `height`로 정한 후 거기에 `padding`과 `border`를 더해 박스의 크기를 결정하고, `border-box`는 `padding`과 `border`를 포함한 크기가 `width`와 `height`가 되도록 컨텐츠 영역을 유연하게 조정합니다.

## Block-level elements

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)

`Block-level elements`는 일단 한 줄을 확보하고, 요소의 크기만큼 차지하도록 한 후, 나머지는 잉여공간으로 둡니다.

아래의 예시로 확인하겠습니다.

```css
div {
  width: 100px;
  height: 100px;
  padding: 20px;
  background-color: orange;
}
.margin-left-auto {
  margin-left: auto;
  background-color: tomato;
}
.margin-0-auto {
  margin: 0 auto;
  background-color: teal;
}
.margin-auto {
  margin: auto;
  background-color: plum;
}
```

<p align='center'>
<iframe src='../examples/LikeLion/9월2일%20CSS%20특강/no4.html' style="width: 50%; height:580px;"></iframe>
</p>

여기에서 각 div들은 `Block-level elements`이므로 한 줄이 주어집니다. `margin`으로 `auto`를 주면 브라우저가 계산 후 가용한 잉여공간을 최대로 채울 수 있는 값이 부여됩니다.

> `margin`이 주어지지 않은 default `div`는 왜 왼쪽에 있는걸까요? `<html>` 요소의 attribute로 `lang='ko'`가 주어져 있으므로, Global attribute로 `dir="ltr"`(left to right)이 부여돼있기 때문입니다.

> `div`가 `Block-level elements`인 이유는 `User Agent Stylesheet`에서 `display: block;`을 부여하고 있기 때문입니다.

대표적인 `Block-level elements`로는 `<div>`, `<ul>`, `<li>`, `<h1>` ~ `<h6>`, `<p>` 등이 있습니다.

### 단축 속성, shorthand property

위 예시에서 `margin: 0 auto;`, `margin: auto;`처럼 쓰는 방식을 `shorthand property`라고 부릅니다. 시계방향으로 값을 부여할 수 있으며, 두개만 적으면 위아래-좌우, 하나만 적으면 모든 방향으로 값이 들어갑니다.

이 때, 두 방법 모두 요소가 가운데로 정렬되는 이유는 위아래 잉여 영역은 0이므로 모든 방향으로 `auto`를 넣어도 위 아래로의 `margin`은 0이 들어가기 때문입니다.

## CSS Selector

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

```css
/* Class Selector */
/* *.select와 같습니다. 이 *을 Universal Selector라고 부릅니다. */
.select {
  /* select라는 class를 가진 모든 요소들 */
  color: blue;
}
div.select {
  /* select라는 class를 가진 div들 */
  color: blue;
}
```

> `Id Selector`는 체계적으로 스타일을 관리하는 데에는 좋지 않은 방법이므로 보통 사용하지 않습니다.

`combinator`는 `" "(space)`, `>`, `~`, `+` 등이 있는데 아래와 같이 사용합니다.

```css
/* Decendant Selector */
div img {
  /* div 아래의 모든 img */
  border: 2px solid white;
}
/* Child Selector */
div > img {
  /* div 바로 아래의 img */
  border: 2px solid white;
}
/* General sibling Selector */
div ~ img {
  /* div와 형제인 img */
  /* 두 요소 사이에 다른 요소가 있어도 됩니다. */
  border: 2px solid white;
}
/* Adjacent sibling Selector */
div + img {
  /* div와 형제인 img */
  /* 두 요소 사이에 다른 요소가 있으면 안됩니다. */
  border: 2px solid white;
}
```

> 참고로 브라우저의 CSS Parser는 Selector의 맨 오른쪽부터 체크합니다. 이를 고려해서 적절한 Selector를 입력해야 합니다.

## `text-align: center;`

```html
<div class="header">
  <img src="images/profile.jpeg" alt="profile" height="200px" />
  <h1>박시우</h1>
  <p>FRONT END DEV</p>
</div>
```

```css
.header {
  background-color: #ddd;
  width: 300px;
  margin: auto;
}
```

<p align='center'>
<iframe src='../examples/LikeLion/9월2일%20CSS%20특강/no5-1.html' style="width: 95%; height:230px;"></iframe>
</p>

이런 HTML이 있다고 하면, `div.header` 안의 요소들을 가운데 정렬하는 방법은 어떤게 있을까요? `div.header`를 가운데 정렬했듯 `margin: auto;`를 이용하면 될까요?

### Inline elements

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements)

`Block-level elements`와 달리 `Inline elements`는 컨텐츠의 흐름을 바꾸지 않고, **요소를 정의하는 태그로 감싼 공간만 차지하는 요소**입니다.

위 예시에서 `<h1>`과 `<p>`는 모두 `Block-level elements`이고, `<img>`와 `<h1>`, `<p>`로 감싸여있는 텍스트(=텍스트 노드)들은 `Inline elements`입니다. 이 때는 `text-align: center;`를 부모에 줘서 자식에 있는 `Inline elements`들을 가운데 정렬할 수 있습니다.

```css
.header {
  ...
  text-align: center;
}
```

<p align='center'>
<iframe src='../examples/LikeLion/9월2일%20CSS%20특강/no5-2.html' style="width: 95%; height:230px;"></iframe>
</p>

`<h1>`과 `<p>`에 `background-color`를 줘보면 왜 이렇게 되는건지 확실히 보입니다.

<p align='center'>
<iframe src='../examples/LikeLion/9월2일%20CSS%20특강/no5-3.html' style="width: 95%; height:230px;"></iframe>
</p>

> `<div>`, `<h1>` ~ `<h6>` 등은 '컨테이너'일 뿐이고, 그 안에 컨텐츠로 들어간 텍스트는 `Inline elements`라는 점을 헷갈리면 안됩니다.

### inline의 padding, margin

`Inline elements`의 `padding`, `margin` property는 조금 신기하게 작동합니다.

```html
<div class="wrapper1">
  <a href="">Github</a>
  <a href="">Email</a>
  <a href="">Blog</a>
</div>
<div class="wrapper2">
  <a href="">Github</a>
  <a href="">Email</a>
  <a href="">Blog</a>
</div>
```

```css
.wrapper1,
.wrapper2 {
  background-color: bisque;
}
.wrapper2 {
  margin-top: 20px;
}
.wrapper1 a {
  background-color: orange;
  margin: 10px;
  padding: 10px;
}
```

<p align='center'>
<iframe src='../examples/LikeLion/9월2일%20CSS%20특강/no5-4.html' style="width: 80%; height:100px;"></iframe>
</p>

이렇듯 `Inline elements`는 `baseline`을 기준으로 움직이는 요소들입니다. 따라서 `baseline`과 같은 방향이라면 margin이나 padding이 공간을 차지하고, 다른 방향이라면 생기긴 하는데 공간을 차지하진 않습니다.

> `Inline elements`는 컨테이너의 개념이 아니기 때문에 `width`나 `height`가 없습니다. 지정해줘도 작동 안합니다.

### 마크업 개행

```html
<div>
  <span>Custard</span>
  <span>Cream</span>
  <span>Dev</span>
</div>
<div><span>Custard</span><span>Cream</span><span>Dev</span></div>
```

<p align='center'>
<iframe src='../examples/LikeLion/9월2일%20CSS%20특강/no6.html' style="width: 60%; height:100px;"></iframe>
</p>

HTML은 마크업을 할 때 개행한 경우 구분되는 요소로 생각하고 **약간의 공백을 자동으로 부여**합니다. 이 공백의 사이즈는 `font-size`에 따라 달라집니다.

이런식으로 우리의 편의를 위해 주는 기능을 쓰는건 좋지만, HTML로 스타일을 주는건 왠만하면 피해야 합니다.

## 상속 inheritance

앞선 예시에서 부모 요소에 준 `text-align: center;`가 자식 요소인 `<h1>`이나 `<p>`에도 전해진 이유는 property의 value가 상속됐기 때문입니다.

이렇게 상속이 되는 property와 그렇지 않은 property들이 있습니다. 상속이 되는 property는 대표적으로 `text-align`, `color`, `font-size` 등이 있는데... 이건 외울필요는 없고 상속이 되는게 합리적인 property인지 아닌지 생각해보면 됩니다. MDN 문서에서 검색해봐도 되고, 아니면 부딪혀보면 되죠...

> 상속받은 property의 value보다는 자식에서 지정된 value가 더 우선시됩니다.

상속은 **하위 요소 모두에게 전파**되며, `inherit` 키워드를 사용하면 `background-color`처럼 상속이 안되는 property도 억지로 상속받을수도 있습니다.

### inherited properties의 초기화

```css
h1 {
  /* font-size: 16px; 이렇게 하지 말고 */
  font-size: inherit;
}
```

`font-size`는 **상속을 지원하는 property**입니다. 이런 property에 값을 지정해버리면 더이상 상속이 작동하지 않게 됩니다. 따라서 상속이 가능한 property는 `inherit`으로 초기화 해주는 것이 올바른 방법입니다.

## display property

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/display)

`Block-level elements`를 **inline화** 하거나, `Inline elements`를 **Block-level화** 하는 등이 필요할 때 사용하는 property입니다.

```html
<div class="wrapper">
  <a class="link" href="">Github</a>
  <a class="link" href="">Email</a>
  <a class="link" href="">Blog</a>
</div>
```

```css
a {
  text-decoration: none;
}

.wrapper {
  text-align: center;
  padding: 10px;
  background-color: whitesmoke;
}

.link {
  display: inline-block;
  border-radius: 40px;
  border: 1px solid;
  padding: 5px 10px;
  color: black;
}
```

<p align='center'>
<iframe src='../examples/LikeLion/9월2일%20CSS%20특강/no7.html' style="width: 60%; height:80px;"></iframe>
</p>

원래 `<a>` 요소는 `Inline elements`이므로 `padding`이나 `border` property가 baseline이 아닌 위 아래 방향으로 영향을 줄 수 없습니다. 그러나 `display: inline-block;`을 부여해서 `Inline elements`임에도 `Block-level elements`처럼 작용되도록 만들었습니다.

## Margin Collapsing, 마진 병합현상

```html
<div class="parent">
  <div class="child">A</div>
  <div class="child">B</div>
</div>
```

```css
.parent {
  background-color: orange;
}
.child {
  margin: 10px;
  padding: 10px;
  background-color: tomato;
}
```

<p align='center'>
<iframe src='../examples/LikeLion/9월2일%20CSS%20특강/no8.html' style="width: 60%; height:150px;"></iframe>
</p>

`.child` 코드를 보면 `margin: 10px;`를 줬으므로 A와 B 사이에는 20px의 마진이 생겨야 합니다. 하지만 위의 결과를 보면 10px이 들어간 것을 볼 수 있습니다. 또한 A와 B아래에도 10px씩 공간이 있어야 하는데, 그 공간 없이 H모양이 됩니다.

이건 Margin Collapsing이 일어났기 때문입니다. 원래는 예쁜 디자인을 위해 의도된 현상입니다.

하지만 Margin Collapsing을 의도하지 않았을 경우를 대비해 어떤 조건에서 이 현상이 발생하는지 알아둘 필요가 있습니다.

Margin Collapse가 일어나는 정확한 조건이나 그 해결 방법은 생각보다 딥한 내용인 것 같아서, 추후 다른 포스팅으로 자세히 정리하겠습니다.

## Selector Specificity

아래의 경우에는 어떻게 스타일이 적용될까요?

```html
<body>
  <h1 class="text">어떤 배경색일까?</h1>
</body>
```

```css
.text {
  background-color: orange;
}
h1 {
  background-color: blueviolet;
}
```

<p align='center'>
<iframe src='../examples/LikeLion/9월2일%20CSS%20특강/no9-1.html' style="width: 60%; height:90px;"></iframe>
</p>

원래 style은 가장 마지막에 나온 코드가 적용됩니다. 그러나, 이 경우 **더 구체적으로 선택했다고 평가되는** `.text`의 스타일이 적용됩니다.

이런 *구체성*을 **Selector Specificity**라고 부릅니다. 비슷한 예제로는 아래와 같은 상황이 있습니다. 같은 HTML에 아래의 CSS를 적용해보겠습니다.

```css
.text.text {
  background-color: tomato;
}
.text {
  background-color: orange;
}
h1 {
  background-color: blueviolet;
}
```

<p align='center'>
<iframe src='../examples/LikeLion/9월2일%20CSS%20특강/no9-2.html' style="width: 60%; height:90px;"></iframe>
</p>

`.text`와 `.text.text`가 차이가 없으므로 `background-color: orange;`가 적용될 것 같지만, 재밌게도 `.text.text`쪽의 스타일이 적용됩니다.

> VSC에서는 Selector 위에 마우스를 올리면 Specificity를 확인할 수 있습니다.

CSS는 이렇게 내부적으로 Selector의 중요도를 평가해 일종의 '계단'을 만들어 스타일을 적용합니다. 이런 모습이 마치 폭포수같다고 해서 **Cascading Style Sheet, CSS**라는 이름을 가지게 된겁니다.

# 목표 페이지 개발

위 내용을 가지고 아래의 페이지를 완성했습니다.

![result](../static/img/CSS_기본_다지기/result.png)

- [링크](../examples/LikeLion/9월2일%20CSS%20특강/index.html)

**Codes**

- [HTML](https://github.com/custardcream98/blog-from-beginning-to-end/tree/main/public/examples/LikeLion/9월2일%20CSS%20특강/index.html)
- [CSS](https://github.com/custardcream98/blog-from-beginning-to-end/tree/main/public/examples/LikeLion/9월2일%20CSS%20특강/style.css)
