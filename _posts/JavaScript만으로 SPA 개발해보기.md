---
title: "JavaScript만으로 SPA 개발해보기"
excerpt: "바람직한 웹 개발자는 Vanilla JS를 잘 다룰줄 알아야 합니다. Single Page Application을 React.js 등 프레임워크의 도움 없이 Vanilla JS로 개발해보겠습니다."
date: "2022-08-15T22:30:00+09:00"
category: ["JavaScript"]
---

> 바람직한 웹 개발자는 Vanilla JS를 잘 다룰줄 알아야 합니다. Single Page Application을 React.js 등 프레임워크의 도움 없이 Vanilla JS로 개발해보겠습니다.

# Intro

제가 제일 좋아하는 쌤인 니꼬쌤께서는 항상 바닐라 자바스크립트의 중요성을 강조하십니다. 아무리 프레임워크를 잘 다뤄봤자 바닐라 JS를 잘 모른다면 이해도도 떨어지고, 프레임워크에 지나치게 의존적인 개발자가 될 위험이 있다는 말씀인거죠.

마침 지금 2차를 준비중인 멋쟁이 사자처럼 웹 프론트엔드 2차 과제 중 바닐라 JS로 SPA를 만드는 과정이 있어 따라해보며 정리하려고 합니다.

# 목표

저는 [이 강의](https://www.youtube.com/watch?v=YMih35bOSI4)를 참고해 **코인 순위를 보여주는 SPA**를 만들어보고자 합니다.

강의에서는 정말 페이지가 하나뿐인 앱을 만들며 SPA를 표방했지만, 저는 Router까지 구현해보겠습니다.

사용하는 API는 [Coinpaprika API](https://api.coinpaprika.com/)입니다.

# 개발

## 실습 환경 구축

우선 아래의 형태로 기본적인 html 코드를 작성해줍니다.

```html
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>바닐라 JS로 SPA 개발하기</title>
    <style>
      body {
        background-color: wheat;
        color: black;
      }
    </style>
  </head>
  <body>
    <div id="root">Hello World</div>
    <script>
      const root = document.getElementById("root");

      async function getCoinListData() {
        const res = await fetch("https://api.coinpaprika.com/v1/coins");
        const coins = await res.json();
        return coins;
      }
    </script>
  </body>
</html>
```

root div를 하나 만들고, data fetch 함수를 하나 선언해줬습니다. 이제 여기에 컴포넌트를 하나 하나 추가해가면 됩니다.

> 참고로, VSC의 `Live Server`라는 extension을 사용하면 매 번 저장할 때마다 바뀌는 코드의 내용을 auto reload하며 편하게 코딩할 수 있습니다.

## 컴포넌트 관리는 innerHTML을 넣기 보다는 이렇게!

root에 코인 목록을 넣고싶다고 가정해보겠습니다. `<ul>` element를 root div 안에 추가하는 건데요.

가장 간단한 방법은 그냥 직접 html을 작성해서 innerHTML로 넣어주는거겠죠. 이렇게요!

```js
const root = document.getElementById("root");
root.innerHTML = `
  <h1 class='ir'>코인 리스트</h1>
  <ul class='coins-list'></ul>
`;
```

하지만 이렇게 작성하면 코드의 일관성을 유지하기 어렵고, 모듈화를 통한 컴포넌트의 재사용을 할 수 없다는 단점이 있습니다. 때문에 아래의 방법처럼 작성합니다.

```js
const coinPageHeader = document.createElement("h1");
coinPageHeader.setAttribute("class", "ir");
coinPageHeader.innerText = "코인 리스트";
root.appendChild(coinPageHeader);

const coinsList = document.createElement("ul");
coinsList.setAttribute("class", "coins-list");
root.appendChild(coinsList);
```

추후 css작업을 위한 클래스명을 적절히 부여하며 api를 사용해 10위까지의 코인이 보이는 메인 페이지 코드를 완성하겠습니다.

![coinsList](../static/img/JavaScript만으로%20SPA%20개발해보기/coinsList.png)

css 작업을 하기 전이라 보기 별로지만 코인 이름, 심볼, 순위까지 표시가 잘 되고 있습니다.

## SPA Router with JS

보통 Single Page Application들은 Routing을 할 때 실제 URL에 해당하는 html을 찾는 대신, 이걸 '낚아채서' URL 경로에 따라 올바른 컨텐츠를 동적으로 보여줍니다. Browser History를 이용하는 방법이 가장 보편적인데, 이 때 알아둬야 하는 api들은 다음과 같이 있습니다.

1. [`History.pushState()`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)
2. [Window의 `popstate` event](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event)
3. [Window의 `DOMContentLoaded` event](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event)

각각에 대한 설명은 링크된 MDN docs를 참고해주세요.

완벽한 Router를 개발하는 것은 웹서버 개발과 연관돼 있어 간단하게 개발하려면 hashed route등을 사용해야 합니다.

제가 개발하려고 하는 것은 `coinId`별로 달라지는 nested route로 약간 골치아프니, 실습을 위해 간단하게만 구현해보겠습니다.

### 방법론

먼저, `router.js`를 아래처럼 작성합니다.

```js
import home from "./home.js";

export function initialRoute(element) {
  home(element);
  window.onpopstate = () => home(element);
}
```

정확하게 개발하려면 `onpopstate` 부분을 조금 손봐줘야 하겠지만, 본 앱은 단 두 개의 페이지로만 이뤄지므로 `home()`을 렌더링하도록 했습니다.

다음으로는 `home.js`, `coinDetail.js`를 각각 이렇게 짜줍니다.

**home.js**

```js
import coinDetail from "./coinDetail.js";

async function getCoinListData() {
  const res = await fetch("https://api.coinpaprika.com/v1/coins");
  const coins = await res.json();

  return coins;
}

export default function render(rootElement) {
  getCoinListData().then((coinsListData) => {
    rootElement.innerText = "";

    const coinPageHeader = document.createElement("h1");
    coinPageHeader.setAttribute("class", "ir");
    coinPageHeader.innerText = "코인 리스트";
    rootElement.appendChild(coinPageHeader);

    const coinsList = document.createElement("ul");
    coinsList.setAttribute("class", "coins-list");

    coinsListData.slice(0, 10).forEach((coin) => {
      const coinListItem = document.createElement("li");
      coinListItem.setAttribute("class", "coin__list");

      const coinCard = document.createElement("div");
      coinCard.setAttribute("class", "coin__card");
      const titleContainer = document.createElement("div");
      titleContainer.setAttribute("class", "coin__title__container");
      const rankContainer = document.createElement("div");
      rankContainer.setAttribute("class", "coin__rank__container");
      const title = document.createElement("span");
      title.setAttribute("class", "coin__title");
      const symbol = document.createElement("span");
      symbol.setAttribute("class", "coin__symbol");
      const rank = document.createElement("span");
      rank.setAttribute("class", "coin__rank");

      titleContainer.appendChild(title);
      titleContainer.appendChild(symbol);
      rankContainer.appendChild(rank);

      coinCard.appendChild(titleContainer);
      coinCard.appendChild(rankContainer);

      coinListItem.appendChild(coinCard);

      coinsList.appendChild(coinListItem);

      title.innerText = coin.name;
      symbol.innerText = coin.symbol;
      rank.innerText = coin.rank;

      coinCard.addEventListener("click", () => {
        window.history.pushState(
          {},
          `/coins/${coin.id}`,
          window.location.origin + `/coins/${coin.id}`
        );

        coinDetail(rootElement, coin.id);
      });
    });

    rootElement.appendChild(coinsList);
  });
}
```

**coinDetail.js**

```js
import home from "./home.js";

async function getCoinData(coinId) {
  const res = await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
  const coins = await res.json();

  return coins;
}

export default function render(rootElement, coinId) {
  getCoinData(coinId).then((coinData) => {
    rootElement.innerText = "";
    rootElement.innerHtml = "";

    const backBtn = document.createElement("button");
    backBtn.setAttribute("class", "back");
    backBtn.innerText = "홈으로";

    backBtn.onclick = () => {
      window.history.pushState({}, `/`, window.location.origin);
      home(rootElement);
    };

    const coinCard = document.createElement("div");
    coinCard.setAttribute("class", "detail__card");
    const titleContainer = document.createElement("div");
    titleContainer.setAttribute("class", "detail__title__container");
    const priceContainer = document.createElement("div");
    priceContainer.setAttribute("class", "detail__price__container");
    const title = document.createElement("span");
    title.setAttribute("class", "detail__title");
    const price = document.createElement("span");
    price.setAttribute("class", "detail__price");

    titleContainer.appendChild(title);
    priceContainer.appendChild(price);

    coinCard.appendChild(titleContainer);
    coinCard.appendChild(priceContainer);

    rootElement.appendChild(backBtn);
    rootElement.appendChild(coinCard);

    title.innerText = coinData.name;
    price.innerText = coinData.quotes.USD.price.toFixed(2) + " USD";
  });
}
```

보시다시피 `window.history.pushState()`를 이용해 history에 push해주면서 route를 관리합니다.

마지막으로, `index.html`에서 `router.js`를 불러와 initiating 합니다.

**index.html**

```js
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>바닐라 JS로 SPA 개발하기</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: black;
        color: white;
      }
    </style>
  </head>
  <body>
    <div id="root">Loading...</div>
    <script type="module">
      import { initialRoute } from "./src/router.js";

      const root = document.getElementById("root");

      initialRoute(root);
    </script>
  </body>
</html>
```

핵심 로직은 완성됐습니다. 이제 css작업을 하면 됩니다. (css는 본문에서 생략하겠습니다. 코드를 보고 싶으시다면 [여기](https://github.com/custardcream98/custardcream98.github.io/blob/main/public/examples/vanillaSPA)를 참고해주세요.)

# 결과물

아래가 결과물입니다. 직접 눌러보세요. 잘 작동하네요!

<iframe src='../examples/vanillaSPA/index.html' style="width: 100%; height:800px;"></iframe>
