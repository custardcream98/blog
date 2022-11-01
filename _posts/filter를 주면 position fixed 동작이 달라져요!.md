---
title: "filter를 주면 position fixed 동작이 달라져요!"
excerpt: "블로그의 네비바를 리뉴얼하는 과정에서 다크모드 스위치에 부여한 position fixed가 네비바 기준으로만 동작하는 문제를 해결하고자 했습니다."
date: "2022-11-01"
category: ["HTML", "CSS"]
series: "Troubleshooting"
---

> 블로그의 네비바를 리뉴얼하는 과정에서 다크모드 스위치에 부여한 position fixed가 네비바 기준으로만 동작하는 문제를 해결하고자 했습니다.

# 문제상황

블로그의 네비바 디자인을 아주 살짝 바꾸고 있었는데, 화면이 작아질 경우 다크모드 스위치의 위치를 뷰포트 우하단으로 옮기고자 아래의 스타일을 추가했습니다.

```css
.darkmode-switch {
  @media (max-width: 800px) {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
}
```

그런데 이상하게도 아래처럼 동작했습니다.

![네비바 안의 다크모드 스위치 위치가 마음대로 동작하지 않는 모습](../static/img/filter를_주면_position_fixed_동작이_달라져요!/다크모드_스위치_위치이상.gif)

`.darkmode-switch` 요소가 뷰포트 기준이 아닌 네비바 기준으로 위치하고 있는 상황으로 보였습니다. `.darkmode-switch` 요소는 네비바의 자식 요소긴 하나, `position: fixed;` 를 부여하면 뷰포트 전체를 기준으로 위치하도록 할 수 있을 거라고 생각했는데, 왜 이런 일이 벌어진걸까요?

## MDN 문서를 확인해보자

[MDN 문서 (`position: fixed;`)](https://developer.mozilla.org/ko/docs/Web/CSS/position#fixed)

MDN 문서에 따르면 `fixed`는 뷰포트의 초기 컨테이닝 블록, 즉 루트 요소를 기준으로 배치되도록 하는 proprty가 맞습니다. 그러나, 이런 내용이 있습니다.

> 요소의 조상 중 하나가 `transform`, `perspective`, `filter` 속성 중 어느 하나라도 `none`이 아니라면 뷰포트 대신 그 조상을 컨테이닝 블록으로 삼습니다. (`perspective`와 `filter`의 경우 **브라우저별로 결과가 다름에 유의**)

블로그의 네비바에는 `backdrop-filter: blur(15px)` 가 부여돼 있었는데 이로 인해 원치 않은 동작을 일으킨 것입니다. 즉 아래같은 상황인거죠.

```html
<body>
  <style>
    .parent {
      position: fixed;
      top: 0;
      width: 400px;
      height: 200px;
      background-color: teal;
      backdrop-filter: blur(10px);
    }
    .child {
      position: fixed;
      bottom: 10px;
      right: 10px;
      width: 150px;
      height: 150px;
      background-color: palevioletred;
    }
  </style>
  <div class="parent">
    <div class="child"></div>
  </div>
</body>
```

<p align='center'>
<iframe src='../examples/posts/filter를_주면_position_fixed_동작이_달라져요!/test.html' style="width: 400px; height:400px;"></iframe>
</p>

부모 요소에 `filter` property를 지정한 상황입니다.

아마 위 예제의 핑크 박스(`.child` 요소)의 위치가 브라우저별로 다르게 보일 것입니다. 테스트해보니 Blink 엔진에서는 `.parent` 안에 위치하고, Webkit 엔진에서는 우하단에 위치하는 것을 확인할 수 있었습니다. (크롬과 사파리로 각각 본 포스트를 열어 직접 확인해보세요!)

즉, **Blink 엔진에서는 부모의 `filter` property가 `none`이 아닐 때 자식에 `position: fixed;`를 부여하면 부모를 컨테이닝 블록으로 삼기 때문에 생기는 문제였습니다.**

Webkit 엔진에서는 문제가 없겠지만 Blink 엔진에서도 제대로 동작해야 하기에 다른 방법을 사용해 해결해보기로 했습니다.

# 해결

## 아이디어

부모 요소에 `backdrop-filter` property를 부여한 것이 원치 않는 동작을 일으키는 원인이 됐으므로 이를 제거하고, `backdrop-filter`를 부여할 배경 역할의 가상 요소를 추가하면 해결될 것입니다.

## 해결 코드

```css
.navbar-container {
  /* backdrop-filter: blur(15px); 삭제 */
  z-index: 101; /* 이미 부여돼있던 property입니다. */
}
.navbar-container::before {
  content: " ";
  position: absolute;
  inset: 0;
  backdrop-filter: blur(15px);
  z-index: -1;
}
```

새로 만든 가상 요소에 `z-index: -1;` 을 줘서 `.navbar-container`가 생성하고 있는 stacking context(쌓임 맥락) 기준으로 가장 밑에 위치하도록 했습니다. 네비바 안의 다른 요소들과 가상 요소는 형제 관계에 놓이기 때문에 문제가 해결됩니다.

앞선 예제로 예를 들면 아래와 같은 코드가 될 것입니다.

```css
.parent {
  position: fixed;
  top: 0;
  width: 300px;
  height: 200px;
  background-color: teal;
  z-index: 1;
}
.parent::before {
  content: " ";
  position: absolute;
  inset: 0;
  backdrop-filter: blur(15px);
  z-index: -1;
}
/* 이후 코드 동일 */
```

<p align='center'>
<iframe src='../examples/posts/filter를_주면_position_fixed_동작이_달라져요!/test_fixed.html' style="width: 400px; height:400px;"></iframe>
</p>

이제 Blink 엔진에서도 `.child` 요소의 위치가 원하던대로 뷰포트 기준 우하단에 위치하고 있습니다.

## 결과

![네비바 안의 다크모드 스위치 위치가 마음대로 동작하지 않는 모습](../static/img/filter를_주면_position_fixed_동작이_달라져요!/해결.gif)

이제 원하던대로 잘 동작하네요!
