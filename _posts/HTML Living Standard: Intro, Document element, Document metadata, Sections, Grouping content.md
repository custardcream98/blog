---
title: "HTML Living Standard: Intro, Document element, Document metadata, Sections, Grouping content"
excerpt: "HTML Living Standard를 확실히 공부하고 Semantic HTML을 향해 한발짝 더 나가봤습니다!"
date: "2022-09-07T12:06:00+09:00"
category: ["HTML"]
series: "HTML Living Standard"
---

> HTML Living Standard를 확실히 공부하고 Semantic HTML을 향해 한발짝 더 나가봤습니다!

# 시멘틱 마크업?

의미있는 HTML을 만들기 위한 노력입니다.

## 웹 에이전트, Web Agent

Serch Engine의 DB를 구축하기 위해 인간을 대신해 정보 자원을 수집, 검색, 추론해 다른 에이전트와 상호 정보 교환 등의 일을 수행하는 지능형 에이전트로, 시멘틱 웹 기반 응용 서비스의 핵심 요소입니다.

```html
<h1>네이버 오픈캐스트</h1>
<p>블라블라</p>
<h1>네이버 오픈캐스트</h1>
<p>블라블라</p>
<h1>네이버 오픈캐스트</h1>
<p>블라블라</p>
```

이런 페이지가 있다고 하면 Web Agent는 _Naver 밑에 오픈캐스트가 있고, 그건 다시 금주의 오픈캐스트와 오늘의 오픈캐스트로 나뉘는구나!_ 라고 생각합니다.

같은 페이지에 대해 똑같은 Text Node를 가진 `<a>`가 많이 있다면 *아, 이 페이지의 컨텐츠가 인기가 좋구나, 이 페이지를 상단에 띄워줘야겠다*고 생각하기도 합니다. 이렇게 컨텐츠까지도 시멘틱 마크업의 범주에 포함됩니다.

즉, 인터넷의 정보들을 컴퓨터가 이해할 수 있고, 그 정보를 가공할 수 있도록 하는게 Semantic Markup의 목적입니다. 웹 접근성을 향상시켜 정보의 격차를 줄이는 것도 목표중 하나입니다.

# HTML Living Standard

웹 표준을 정하고자 하는 단체는 대표적으로 W3C(World Wide Web Consortium)와 WHATWG(Web Hypertext Application Technology Working Group)가 있습니다. 2007년에 WHATWG에서 W3C측에 제안한 명세가 바로 HTML5입니다.

2019년부터 두 조직이 합의해 WHATWG가 내세우는 HTML Living Standard가 표준이 되었습니다.

[WHATWG](https://html.spec.whatwg.org/dev/)

웹은 항상 진화하고, '완성'되지 않습니다. 이런 의미에서 *살아있는 생물처럼 웹 표준도 시시각각 달라진다*는 뜻으로 **HTML Living Standard**라고 부릅니다.

[관련 기사](https://zdnet.co.kr/view/?no=20190531184644)

본 글에서는 HTML Living Standard의 요소들 중 자주 사용하는 요소들을 정리했습니다.

> 시작하기 전에 Remind 👀 : Markup은 항상 가능한 최소로, 간결하게 짜는 것이 좋은 습관입니다!

## Document element

### `<!DOCTYPE html>`

DTD(Document type Definition)라고 불리며, **문서의 타입에 관한 정보**를 나타냅니다. 이 요소가 없다면 브라우저는 quirks mode(호환 모드)로 HTML을 렌더링하게 되는데, 브라우저마다 구현 방식이 다르기 때문에 다르게 동작할 가능성이 있으므로 반드시 문서 최상단에 이 요소를 넣어줘야 합니다.

[MDN 호환 모드와 표준 모드](https://developer.mozilla.org/ko/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)

### `<html>`

HTML 문서의 최상단 요소로, **루트 요소**라고도 불립니다. 다른 모든 요소들은 `<html>` 요소의 후손입니다.

`lang` attribute를 통해 문서의 주 언어가 무엇인지 설정할 수 있으며, 이 값이 검색엔진과 스크린 리더의 작동에 영향을 미칩니다.

## Document metadata

### `<head>`

문서 메타데이터가 모이는 요소입니다.

### `<title>`

문서의 제목을 의미하며, 반드시 한번만 사용해야 합니다.

### `<link>`

외부의 자원을 문서와 연결하는 역할을 합니다. 스타일 시트, 파비콘 등 여러가지를 연결합니다.

```html
<link href="main.css" rel="stylesheet" />
<link rel="icon" href="favicon.ico" />
<link
  rel="apple-touch-icon-precomposed"
  sizes="114x114"
  href="apple-icon-114.png"
  type="image/png"
/>

<!-- media attribute를 사용해 미디어 유형이나 쿼리를 지정할 수도 있습니다. -->
<link href="print.css" rel="stylesheet" media="print" />
<link
  href="mobile.css"
  rel="stylesheet"
  media="screen and (max-width: 600px)"
/>
```

### `<meta>`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)

문서의 메타데이터를 나타내는 요소입니다. `<meta>`가 제공하는 메타데이터는 다음의 네가지가 있습니다.

- `name`: 문서 전체에 영향을 주는 **document-level metadata**입니다.
  - `name="author"`: 페이지를 작성한 개발자의 이름입니다.
  - `name="description"`: 페이지에 대한 설명 정보로, 검색엔진이 사용자에게 결과 화면을 출력할 때 중요하게 고려되는 요소
  - `name="viewport"`: 모바일에서 사용자 화면의 사이즈에 대한 값을 설정, 요즘엔 반드시 넣어주는 것이 권장됨
- `http-quiv`: pragma directive(프라그마 지시문)이라고 합니다. **브라우저에 어떤 행동을 지시**하려는 목적으로 사용됩니다.
  - `http-quiv="X-UA-Compatible"`: IE에서 어떤 형식으로 렌더링할지 지정할 때 사용하며, `content="IE=edge"`는 IE8 이상에서 항상 표준모드로 렌더링 되도록 합니다.
- `charset`: 문서의 **문자 인코딩 상태**를 의미하며, 보통 UTF-8로 설정해 전세계 모든 언어를 지원토록 합니다.
- `itemprop`: **유저가 정의한 메타데이터**를 나타냅니다.
  - 예를 들어 썸네일 이미지를 표시하고 싶다면 Open Graph Image가 들어가도록 `<meta property="og:imgae" content="이미지/주소.png">`를 넣는 식입니다.

**자주 쓰이는 메타데이터**

```html
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### `<style>`

문서 전체 혹은 일부의 **스타일**을 나타냅니다.

> 외부에서 불러온 CSS보다 `<style>`요소에 담긴 스타일이 우선적으로 적용됩니다.

## Sections

### `<body>`

사용자에게 보여지는 **문서의 컨텐츠**를 나타냅니다.

### `<header>`

[WHATWG 문서](https://html.spec.whatwg.org/multipage/sections.html#the-header-element)

특정 컨텐츠의 시작을 나타냅니다. 일반적으로 **구역의 제목**(Heading elements 혹은 `<hgroup>`)을 포함합니다. (꼭 있어야 하는건 아닙니다.)

페이지당 하나만 있어야 하는건 아니며, 각 `<section>`들도 `<header>`를 가질 수 있습니다.

### `<h1>` ~ `<h6>` Section Heading elements

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements)

heading 요소라고 부르며, `<h1>` ~ `<h6>`까지 중요도에 따라 제목을 지정하기 위해 사용됩니다. 순서를 잘 지켜서 사용해야 합니다.

해당 제목을 포함하는 익명 영역(Anonymous Section)을 암묵적으로 생성해 다음 heading 요소가 나올때까지가 해당 heading 요소의 공간이 됩니다.

> `<h1>`은 페이지당 한 번만 사용해야 합니다.

### `<section>`, `<article>`

문서의 구획을 나누고자 할 때 사용합니다. 둘은 아래의 차이점이 있습니다.

- `<article>`은 독립적으로 있을 수 있는 컨텐츠에 사용합니다.
  - *다른 서비스에 가져다 놔도 어색하지 않은가?*를 기준으로 삼으면 됩니다.
- `<section>`은 사이트 내의 다른 컨텐츠와 연관이 있습니다.

> heading 요소와 함께 사용하는 것을 권장하지만 필수는 아닙니다.

### `<nav>`

현재 페이지 내, 혹은 다른 페이지로의 링크를 보여주는 구획입니다. 보통 메뉴에 사용되며, 페이지 최상단에 오는 `<nav>`는 `<header>`에 넣습니다.

### `<aside>`

문서의 흐름과는 상관 없는 별개의 구획을 나타냅니다. 보통 각주나 광고 영역을 넣거나, 양쪽 사이드에 위치해야 하는 요소를 그룹지을 때 사용합니다.

### `<footer>`

`<footer>`가 속한 구획의 정보를 나타내는 요소입니다.

#### `<address>`

가장 가까운 부모 `<article>`이나 `<body>` 요소의 연락처 정보를 나타냅니다. 전화번호, 메일 주소, 우편 주소 등이 올 수 있습니다.

> `<a>`로 넣을 경우 컨텐츠가 직접 정보를 나타낼 필요는 없습니다. `<a href="mailto:custardcream@kakao.com">메일 주소</a>`같은 요소도 `<address>`의 자식이 될 수 있습니다.

#### `<small>`

저작권 정보를 나타냅니다.

## Grouping content

### `<main>`

**문서의 주요 콘텐츠를 의미합니다.**

현재 페이지에서 유일한 내용이어야 하며, 다른 페이지 혹은 섹션에서 반복될 수 있는 정보(로고, 검색 폼, 저작권 정보 등)는 이 요소에 들어가지 않습니다.

### `<div>`

레이아웃을 나눌 때 사용하는 요소입니다. 컨텐츠의 형태를 바꾸지는 않지만 여러 요소들을 `<div>`로 묶어 스타일을 변경할 수 있습니다.

`<article>`, `<section>`, `<header>`, `<nav>` 등은 기본적으로 `<div>`와 동일한 역할을 합니다. 단지 그 이름으로 Semantic하게 마크업을 할 수 있도록 정의된 요소들일 뿐입니다.

의미있는 마크업을 위해 가능하면 `<div>`를 남발하기 보다는 적합한 요소를 찾아 사용해야 합니다.

### `<ol>`, `<ul>`, `<li>`

`<ol>`과 `<ul>`은 각각 Ordered List, Unordered List를 의미합니다. `<li>`는 이 요소들의 자식으로 오는 List Item을 뜻합니다.

`<ol>`과 `<ul>`의 직계자식은 반드시 `<li>`만 올 수 있습니다.

### `<dl>`, `<dt>`, `<dd>`

`<ol>`, `<ul>`, `<li>`처럼 목록을 정의할 때 사용하지만, 사전처럼 어떤 것을 정의할 때 쓰이는 목록입니다. `<dl>`은 Definition List, `<dt>`는 Definition Term, `<dd>`는 Definition Description을 의미합니다.

```html
<dl>
  <dt>HTML</dt>
  <dd>마크업 언어입니다.</dd>
</dl>
```

보통 `<footer>`에서 아래같은 부분을 `<dl>`, `<dt>`, `<dd>` 요소로 마크업합니다.

![codelion_footer](../static/img/HTML_Living_Standard/codelionfooter.png)

(실제 코드라이언 페이지 코드 보니까 ul li로 돼있긴 하지만...)

### `<figure>`, `<figcaption>`

이미지에 캡션(설명)을 달 때 사용하는 요소입니다.

```html
<figure>
  <img src="images/hello.png" alt="안녕" />
  <figcaption>인사하는 모습</figcaption>
</figure>
```

### `<p>`

문단을 의미합니다. 하나의 완결된 문단을 의미하므로 `<p>`가 `<p>`를 자식으로 가질수는 없습니다. 줄바꿈 용도로 써서도 안됩니다.

### `<pre>`

HTML에 작성한 내용 그대로 표시하는 요소입니다.(정확히는 **이 부분의 마크업에 있는 공백은 있는 그대로 표현해라** 라는 뜻) 주로 코드를 표현할 때 사용합니다.

```html
<pre>
  띄어쓰기     는 그대로 표현되고
  줄바꿈도
  쓰는대로 나와요!
</pre>
```

<p align='center'>
<iframe src='../examples/LikeLion/9월%20HTML%20Living%20Standard/pre.html' style="width: 50%; height:100px;"></iframe>
</p>

보시다시피 User Agent Stylesheet로 인해 기본적으로 고정폭 글꼴(fixed-width font)을 사용해 표현됩니다.

### `<blockquote>`, `<q>`

`<blockquote>`는 블록으로 감싸는 인용구를, `<q>`는 짧은 인용구를 의미합니다.

> 본 블로그에서는 이게 `<blockquote>`입니다!

### `<hr>`

이야기의 장면 전환, 문단 안에서 주제가 바뀔 때 구별을 위해 사용합니다. 원래는 가로줄을 표현하기 위해 사용된 요소이지만 HTML5 이후로 의미가 생겼습니다.

```html
<p>어떤 얘기를 하다가 끝나고</p>
<hr />
<p>또 다른 얘기를 할 때 이렇게 p 요소 사이에 사용</p>
```

> 단락을 구분한다는 의미이므로 `<p>` 요소 **안에서** 사용하는 것은 웹 표준에 어긋납니다.
