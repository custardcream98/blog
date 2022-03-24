---
layout: post
title: 페이지 URL 변경을 감지하기
image:
  path: /assets/img/thumbnail/220324.png
description: >
  Vanilla JS로 페이지의 URL이 변경될 때 trigger되는 함수 만들기 (window.history 객체)
hide_description: true
category: devlog
tags: [Github, Github Pages, Blogs, JavaScript]
hide_last_modified: true
---
Thumbnail Made by [썸네일 메이커 v 1.2.1](https://wonkooklee.github.io/thumbnail_maker/)
{:.figcaption}

블로그 검색 창이 링크를 클릭할 때 닫히지 않는 문제를 해결하기 위해 `window.history`객체를 이용해 블로그의 URL이 바뀌는 것을 감지하는 함수를 코드에 추가했습니다.
{:.lead}

1. toc
{:toc}

# 블로그 검색창의 문제점

[지난번 포스팅때](https://custardcream98.github.io/devlog/2022-03-23-%EB%B8%94%EB%A1%9C%EA%B7%B8%EC%97%90-%EA%B2%80%EC%83%89%EA%B8%B0%EB%8A%A5-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0-2/) 구현한 블로그 검색창에 작은 문제가 하나 있었습니다. 검색 후 링크를 누르면 검색창이 자동으로 닫히지 않는다는 점이었는데요. 오늘은 이 버그를 Javascript로 페이지의 URL이 변경되는 것을 감지해 변경될 경우 `resetBtn.click()`(검색창을 닫는 버튼 클릭)을 실행하는 코드를 추가하려고 합니다.

# `window.history()` 프로퍼티

![window-history](/assets/img/devlog/window-history.png){:style="display:block; margin:auto;" width="70%"}

`browser.history()`는 브라우저의 방문 목록을 저장하는 객체인데요, `window.history()`는 이를 참조해 윈도우의 방문 목록을 URL의 배열로 반환합니다. `history.back()`, `history.forward()` 등 사용자의 히스토리를 이용해 여러가지 조작을 할 수 있으며, `history stack`의 내용까지도 바꿀 수 있습니다. 참고로, URL 자체를 String 따위의 형식으로 가져오는건 보안상 문제로 불가능하다고 합니다.

조금 더 자세한 내용은 [여기를 참고해주세요.](https://linuxhint.com/window-history-object/)

## 브라우저의 히스토리를 추가/변경하기

HTML5에서 제공하는 `history.pushState()`, `history.replaceState()` 메소드는 브라우저의 히스토리를 추가 혹은 변경할 수 있게 해줍니다.

또한,
```javascript
history.pushState.apply(history, arguments)
```
를 리턴해줌으로써 Monkey Patching(런타임에만 일시적으로 메소드의 기능을 수정하거나 확장하는 것)을 할 수 있습니다.

# 페이지 URL 변경을 감지하고, 변경시 원하는 코드를 실행하기

[이 글을 참고하여](https://www.geeksforgeeks.org/how-to-get-history-changes-notification-via-history-pushstate-method/) 아래의 코드를 추가했습니다.

```javascript
// Monkey Patching window.history
(function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
        resetBtn.click(); // 여기에 원하는 기능을 넣습니다.
        return pushState.apply(history, arguments);
    };
})(window.history);
```

# 더 공부해야 할 부분

Monkey Patching이라는 용어가 등장했는데, 아직은 Method Overriding과의 차이점을 잘 모르겠습니다. Method Override의 하위 개념인것 같은데 정확한 내용을 공부하고 포스팅하도록 하겠습니다.

