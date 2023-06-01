---
title: "HTML Living Standard 2"
excerpt: "HTML Living Standard를 확실히 공부해서 기본기를 다지는 시간 2탄!!"
date: "2022-09-07T17:09:00+09:00"
category: ["HTML"]
series: "HTML Living Standard"
---

> HTML Living Standard를 확실히 공부해서 기본기를 다지는 시간 2탄!!

# Text-level semantics

Text-level 요소는 **요소 안의 컨텐츠의 크기만큼만 영역을 점유**하고, 자식으로 Sections나 Grouping Contents를 배치할 수 없습니다.

## `<br>`, `<wbr>`

`<br>`, `<wbr>` 모두 **줄바꿈을 하는 요소**입니다. `<wbr>` 태그는 텍스트 박스에서 **한 줄로 모두 표시가 안될 때에만 줄바꿈이 일어나게** 합니다.

```html
<p>
  Lorem
  <br />
  <br />
  <br />
  ipsum
</p>
```

<p align='center'>
<iframe src='../examples/LikeLion/9월%20HTML%20Living%20Standard/br.html' style="width: 50%; height:100px;"></iframe>
</p>

```html
<p>줄바꿈이 필요 없으면<wbr /> 그대로!</p>
<div class="wrapper">
  <p>줄바꿈이 필요하면<wbr /> 바꾼당</p>
</div>
```

```css
.wrapper {
  width: 120px;
  background-color: wheat;
}
```

<p align='center'>
<iframe src='../examples/LikeLion/9월%20HTML%20Living%20Standard/brwbr.html' style="width: 50%; height:120px;"></iframe>
</p>

`<wbr>` 요소는 이렇게 줄바꿈이 필요할 때(text가 overflow될 때) 자동으로 줄을 바꿔줍니다. CJK(Chinese, Japanese, Korean)의 기본적인 `work-break` property 값은 `break-all`로 되어있기 때문에 글자 한 자 한 자씩 끊어서 줄을 바꿉니다.

### white-space

줄바꿈에 관련된 property로는 또 `white-space`가 있습니다. `nowrap`, `break-spaces`, `pre` 등 다양한 value들이 있으며, 각각의 작동은 아래와 같이 달라집니다. (직접 버튼을 눌러서 어떻게 바뀌는지 확인해보세요!)

```html
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex suscipit non ad et nemo voluptatum
  facere assumenda fugiat soluta sapiente! Non similique nostrum soluta eaque nobis consequuntur
  expedita, veniam distinctio?
</p>
```

```css
p {
  /* width를 지정한 상태입니다 */
  width: 300px;
  border: 1px solid black;
}
```

<p align='center'>
<iframe src='../examples/LikeLion/9월%20HTML%20Living%20Standard/whitespace.html' style="width: 350px; height:360px;"></iframe>
</p>

## `<a>`

`<a>` 요소는 링크, 즉 **하이퍼 텍스트를 만들 때 사용**하는 **HTML(HyperText Markup Language)의 핵심적인 요소**입니다.

`href`(hyper reference) attribute의 값을 통해 경로를 지정할 수 있습니다. 자바스크립트로 경로를 지정할 수도 있지만 검색엔진 Agent들이 JS는 안읽고 HTML로만 문서를 판단하는 경우가 있으므로 웹 접근성에 위배되니 `href` attribute를 사용하는것이 좋습니다.

> 그래도 요즘은 다 JS까지 로드한 뒤에 데이터를 추출하긴 한다고 하네요!

`<a>`는 예외적으로 Sections나 Grouping Contents들을 자식으로 가질 수 있습니다. 다만, `<a>`안에 `<a>`가 위치할 수는 없습니다!

## `<b>`, `<strong>`

둘 다 **굵은 글씨**(볼드체)를 표현하고 싶을 때 사용하지만, `<strong>` 요소는 더 나아가 **'중요도'를 강조**하는 의미를 가집니다. heading 요소를 사용하기 애매할 때 `<strong>` 요소를 사용합니다.

> 조직의 컨벤션에 따라 `<b>`는 아예 사용하지 않기도 합니다.

## `<i>`, `<em>`

둘 다 **기울어진 글씨**(이텔릭체)를 표현하고 싶을 때 사용하지만 아래과 같은 차이가 있습니다.

- `<em>` 요소는 강조의 의미를 가집니다.
- `<i>` 요소는 '주 언어와 다른 언어로 표현된 부분(주 언어는 한글인데 영어로 표기됐을 경우)', '소설 등의 작품에서 등장인물의 생각이 표기된 부분' 등 주위와 구분해야 하는 부분을 표현하기 위해 사용합니다.

## `<dfn>`

현재 문맥에서 **정의하고 있는 용어를 의미**합니다. 가장 가까운 부모가 `<p>` 또는 `<dt>`, `<dd>`쌍, `<section>`일 경우 그 컨텐츠가 `<dfn>`에서 정의하고자 하는 용어의 설명이 됩니다.

```html
<dl>
  <dt>박시우</dt>
  <dd><dfn>박시우</dfn>는 프론트엔드 개발자이다.</dd>
</dl>
```

## `<abbr>`

**줄임말**을 나타내고 싶을 때 사용합니다.

```html
<p><abbr title="Hypertext Markup Language">HTML</abbr> 이거 별거 아니네~</p>
```

<p align='center'>
<iframe src='../examples/LikeLion/9월%20HTML%20Living%20Standard/abbr.html' style="width: 300px; height:60px;"></iframe>
</p>

이렇게 줄임말이라는 표시가 생깁니다. `title` attribute는 필수는 아닙니다.

## `<sup>`, `<sub>`

각각 **윗첨자, 아랫첨자**를 의미합니다. 단순히 작은 글자를 나타낼때 사용하면 안되고, **화학 기호나 수학 공식 등의 입력에만 사용**합니다.

이외의 상황에서 위나 아래에 붙은 글자를 나타내고 싶다면 CSS에서 `vertical-align` property를 이용하면 됩니다.

## `<time>`

**시간**을 의미합니다. 컴퓨터가 알아듣기 어려운 형식일 경우 `datetime` attribute를 지정해줘야 합니다.

> `datetime`의 형식은 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#valid_datetime_values)에서 확인할 수 있습니다.

## `<cite>`

책, 시, 노래, 영화 등 **창작물 이름** 등을 표현할 때 사용하는 요소로, 보통 이텔릭체로 렌더링됩니다.

## `<span>`

**줄바꿈 없이 영역을 묶는 용도**로 사용하는 요소로, 별다른 의미는 없습니다. `<div>`와 마찬가지로 남발하면 안됩니다.

# Embedded content

## `<img>`

`<img>` 요소는 **이미지를 삽입할 때 사용**합니다.

- `src` (source): 필수 attribute로, 이미지 파일의 위치와 파일명을 알려줍니다. 이 때 경로는 절대경로 혹은 상대경로입니다.
- `alt` (alternative text): 이미지가 보이지 않을 때 이미지 대신 보여줄 텍스트입니다. 스크린리더같은 접근성을 위한 프로그램에 정보를 제공하기 위한 용도로도 사용되며, 이미지에 대한 정보를 브라우저에게 제공해 SEO에 도움을 주기도 합니다.

  ```html
  <!-- 스크린 리더가 읽지 않습니다. -->
  <img src="a.png" alt="" />

  <!-- 스크린 리더가 'a'를 읽습니다. -->
  <img src="a.png" />

  <!-- 스크린 리더가 '이미지'를 읽습니다. -->
  <img src="a.png" alt="이미지" />
  ```

  > 경우에 따라서는 일부러 비워두기도 합니다.

- `srcset` (source set): 여러 해상도에 대응해 브라우저가 최상의 이미지를 로딩하는데 도움을 줄 수 있도록 하는 attribute입니다. 동일 이미지를 최소 2개 이상 가지고 있을 때 사용하며, 브라우저가 이미지를 선택합니다.

  아래는 제가 실제로 사용한 샘플 코드입니다.

  ```html
  <img
    class="title__img centering"
    srcset="./img/title_mobile.png 267w, ./img/title.png 564w"
    sizes="(max-width: 780px) 267px, 564px"
    src="./img/title.png"
    alt="1만 시간의 법칙"
  />
  ```

  - `srcset`에서 이미지의 크기를 나타낼 수 있는 방법은 여러가지가 있는데, 여기에서는 `x서술자`, `w서술자`, `sizes attribute`라는 키워드만 언급하겠습니다.

### `<picture>`

`<source>`, `<img>` 요소를 통해 **각 조건에 따라 맞는 이미지를 보여주는 요소**입니다. `<img>`에서 `srcset` attribute를 사용하면 화면에 따른 이미지의 크기만 조절하지만, `<picture>` 요소를 사용하면 **이미지의 포멧 자체를 바꿀 수 있습니다.**

```html
<picture>
  <source srcset="shiwoo_large.jpeg" media="(min-width:960px)" />
  <source srcset="shiwoo.png" type="image/png" media="(min-width:620px)" />
  <img src="shiwoo_small.jpeg" alt="프로필" />
</picture>
```

`type`, `media` attribute의 값을 참고해 브라우저에 가장 알맞는 이미지 source를 자동으로 골라줍니다. 모든 `<source>` 요소의 이미지 사용이 불가하면 최후에 `<img>` 요소의 `src`를 이용합니다.

이런 방식의 크로스브라우징 기법을 **점진적 향상기법**(기본적으로 옛날 브라우저에서 작동할 수 있는 코드를 넣고, 최신 기술을 사용할 수 있는 환경에서는 최신 기술을 사용할 수 있도록 하는 기법)이라고 합니다.

> `<source>` 요소의 `srcset` attribute가 `media` attribute의 값을 참고해 `<img>`의 `src` attribute를 바꿔넣는 식으로 작동하므로 반드시 `<img>`요소는 있어야됩니다.

### 언제 `srcset`을 쓰고 언제 `<picture>` 요소를 쓸까?

해상도에 따라 '다른' 이미지(포멧이 달라도 다른 이미지입니다)를 보여주고 싶다면 `<picture>` 요소를, '같은' 이미지를 보여준다면 `srcset`을 이용합니다.

## `<iframe>`

HTML 안에서 또 다른 HTML 페이지를 보여주고 싶을 때 사용하는 요소입니다. `width`, `height` attribute로 크기를 조절하며 따로 값을 안정하면 150px x 300px이 기본값이 됩니다.

```html
<iframe src="다른_html_파일_혹은_링크"></iframe>
```

> 본 블로그에서 포스트 중간 중간 보이는 HTML 실습 결과도 이미지가 아닌 `<iframe>` 요소입니다.

보통은 유튜브 영상을 불러올 때 많이 사용합니다.

```html
<iframe
  width="1280"
  height="720"
  src="https://www.youtube.com/embed/-iuX3r8PSzU"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
>
</iframe>
<!-- allow attribute로 허용할 기능을 지정해줬다는 것을 유의깊게 봐주세요 -->
```

웹사이트 안에서 다른 웹페이지를 또 불러오는 것이기 때문에 DBD(Drive By Download) 공격에 취약해질 수 있으므로 조심히 사용해야 합니다.

> DBD 공격이란 사용자의 의도와 무관하게 악성코드가 다운로드 및 실행되는 공격으로, 여기에서는 `<iframe>` 안에 위치한 JS 코드도 실행된다는 점을 악용한 공격입니다.

## `<audio>`

음악 컨텐츠를 재생하기 위한 요소로, 요즘엔 잘 안씁니다. `<source>` 요소를 자식으로 사용해 크로스브라우징을 위해 여러 포멧을 사용할 수도 있습니다.

## `<video>`

동영상 파일을 재생하기 위한 요소입니다. `<source>` 요소를 자식으로 사용해 크로스브라우징을 위해 여러 포멧을 사용할 수도 있습니다.

```htm
<video src="batman.mp4" controls autoplay loop width="450" height="300"></video>
```

# `<form>`

**정보를 입력하는 영역**을 뜻합니다. `<form>`에 입력하고 제출(submit)하면 데이터는 서버로 전송되고, 그 데이터는 웹 서버가 처리하며 그 결과 페이지를 클라이언트에 전송합니다.

```html
<form action="" method="">
  <input type="text" name="id" />
  <input type="password" name="pw" />
  <button type="submit">로그인</button>
</form>
```

## `<input>`

사용자가 `<form>`에 **입력할 수 있는 공간**을 만들어 주고, 사용자에게 정보를 입력받습니다.

굉장히 많은 attribute와 `type`을 가지고 있습니다.

**`<input>`의 attribute들**

- `type`: `<input>` 요소의 모양을 다양하게 바꿀 수 있습니다.
- `name`: 요소의 이름을 지정합니다.
- `readonly`: 읽기 전용으로 합니다.
- `maxlength`, `minlength`: 최대, 최소 글자 수를 지정합니다.
- `required`: 필수적으로 입력해야 하는 값이 됩니다. 이 값을 채우지 않고 submit하면 에러를 띄우고 데이터가 전송되지 않습니다.
- `autofocus`: 웹 페이지가 로딩되면 이 요소로 포커스가 바뀝니다.
- `placeholder`: 입력할 값에 대한 힌트를 사용자에게 표시합니다.
- `pattern`: 정규표현식을 사용해 값의 유효성을 검사할 수 있습니다.

**다양한 type들**

```html
<form action="inputs.html" method="get">
  <input type="text" name="id" />
  <input type="password" name="pw" />
  <input type="button" value="눌럿!" />
  <input type="search" />
  <input type="date" />
  <input type="time" />
  <input type="range" />
  <input type="number" />
  <input type="color" />
  <input type="radio" />
  <input type="checkbox" />
  <input type="file" />
  <input type="email" />
  <input type="hidden" />
</form>
```

<p align='center'>
<iframe src='../examples/LikeLion/9월%20HTML%20Living%20Standard/inputs.html' style="width: 80%; height:100px;"></iframe>
</p>

**`<input type="hidden">`은 언제 사용하는걸까?**

`hidden` 타입은 서버로 넘길 데이터가 추가될 필요가 있을 때 사용합니다. 이 부분을 자바스크립트로 구현하려고 하면 굉장히 번거로우니, 꼭 `hidden` 타입을 잊지 말고 사용합시다!!

> **바퀴를 다시 발명하지 마라**(Don't reinvent the wheel)라는 개발자 격언이 있다고 해요!

## `<label>`

`<input>` 요소를 **설명하는 텍스트**를 의미하며, 웹 접근성에도 영향을 줄 수 있습니다. (시각 장애인들도 사용할 수 있도록 Semantic하게 사용해야 합니다.)

사용하는 방법은 두가지가 있습니다.

```html
<!-- label로 감싸기 -->
<label>
  이름 :
  <input type="text" name="name" />
</label>

<!-- label에 for attribute 이용하기 -->
<label for="myName">이름 : </label>
<input type="text" name="name" id="myName" />
```

## `<select>`, `<option>`

드롭다운 리스트 박스를 생성하는 요소입니다. 아래처럼 사용합니다.

```html
<form action="">
  <label for="myDevice">현재 사용하고 있는 스마트폰의 제조사를 선택해주세요</label>
  <select name="device" id="myDevice">
    <option value="iphone">아이폰</option>
    <option value="galaxy">갤럭시폰</option>
    <option value="lg">LG폰...은 안녕...</option>
  </select>
</form>
```

**`<select>`의 attribute들**

- `multiple="multiple"`: 사용자가 여러개의 `<option>` 요소를 선택할 수 있게 해줍니다. (컨트롤 or 커멘드 키 누르면서 눌러야 한다는 단점이 있음)
- `size`: 드롭다운 리스트에서 한번에 보여줄 수 있는 `<option>`의 개수를 정할 수 있습니다.

**`<option>`의 attribute들**

- `value`: 서버에 전송할 값을 정합니다.
- `selected`: 페이지가 로딩된 뒤 기본으로 선택되는 `<option>`을 지정합니다. 이 attribute가 사용되지 않았을 경우엔 기본적으로 첫번째 `<option>`이 선택됩니다.

## `<fieldset>`

자식 요소로 사용되는 **form control들을 그룹화** 할 수 있습니다. 폼 내용이 길어서 섹션을 나눌 필요가 있는 경우 유용하게 사용할 수 있습니다.

실제로 브라우저에서는 어떻게 구현되는지 보겠습니다.

```html
<form action="">
  <fieldset>
    <legend>개인정보</legend>
    <label for="myName">이름</label>
    <input type="text" name="name" id="myName" />
    <label for="myTel">전화번호</label>
    <input type="tel" name="tel" id="myTel" />
    <label for="myEmail">이메일</label>
    <input type="email" name="email" id="myEmail" />
  </fieldset>
  <fieldset>
    <legend>개인정보 제공 동의</legend>
    <label for="checkAgree">개인정보 제공에 동의하십니까?</label>
    <input type="checkbox" name="agree" id="checkAgree" />
  </fieldset>
</form>
```

<p align='center'>
<iframe src='../examples/LikeLion/9월%20HTML%20Living%20Standard/fieldset.html' style="width: 80%; height:200px;"></iframe>
</p>

## `<legend>`

`<fieldset>` 바로 아래에 위치하며, **폼 그룹의 목적을 나타내는 제목**을 의미합니다.

> 반드시 `<fieldset>`의 첫번째 자식으로 사용해야 합니다.

## `<button>`

**클릭 가능한 버튼을 나타내는 요소**입니다. `submit`(default), `reset`, `button` 등의 `type`이 있습니다.

### `<input type="submit">`과 `<button>`의 차이는 무엇일까요?

**`<button>` 요소는 `<input>` 요소보다 스타일을 적용하기 훨씬 쉽습니다.** 또한 `<input>` 요소는 닫는 태그가 없어 value attribute에 텍스트밖에 넣을 수 없지만 `<button>`은 여러 자식 요소를 추가할 수 있는데다가, `::after`나 `::before`같은 CSS 가상 요소를 사용할수도 있습니다. 더 멋진 스타일이 필요하다면 `<button>` 요소를 쓰면 됩니다.

## `<textarea>`

여러 줄의 텍스트를 입력받을 수 있는 요소입니다. 본 블로그에서는 댓글 입력란이 `<textarea>` 요소입니다.

`cols` attribute로 입력창의 넓이를, `rows`로 보여줄 입력 줄 수를 지정할 수 있습니다.

## `<datalist>`

`<select>`와 `<input>` 요소의 역할을 섞어서 사용할 수 있도록 해주는 요소입니다. `<input>`요소의 `list` 속성을 이용해 `<datalist>` 요소의 `id` attribute와 연결해 사용합니다.

설명이 좀 복잡한데, 아래의 예시를 보면 이해됩니다.

```html
<label for="solasystem">원하는 행성을 선택하세요 : </label>
<input type="text" id="solasystem" list="planets" name="planets" />
<datalist id="planets">
  <option value="수성">수성</option>
  <option value="금성">금성</option>
  <option value="지구">지구</option>
  <option value="화성">화성</option>
</datalist>
```

<p align='center'>
<iframe src='../examples/LikeLion/9월%20HTML%20Living%20Standard/datalist.html' style="width: 80%; height:200px;"></iframe>
</p>

보시다시피 option중 하나를 선택하거나, 직접 option을 추가할 수 있습니다.

<!-- # Tabular data

테이블은 글로만 읽어서는 익히기 어려운 개념이 많습니다. 직접 코드를 작성하고 결과를 보며 바꿔봐야 느낌이 옵니다.

## `<table>`

하나의 테이블을 정의하며, 컨테이너 요소입니다.

## `<caption>`

테이블의 제목, 설명을 의미하며 `<table>` 요소의 첫번째 자식으로 사용해야 합니다.

## `<thead>`, `<tbody>`, `<tfoot>`

각각 머리글, 본문, 바닥글을 의미하며 테이블의 레이아웃에 영향을 미치지 않습니다. 하지만 이렇게 묶어서 CSS를 사용해 스타일을 지정할 수 있습니다.

<p align='center'>
<iframe src='../examples/LikeLion/9월%20HTML%20Living%20Standard/tabular.html' style="width: 400px; height:200px;"></iframe>
</p> -->
