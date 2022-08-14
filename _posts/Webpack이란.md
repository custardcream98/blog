---
title: "Webpack이란?"
excerpt: "bundler의 대표주자 Webpack이 무엇인지, Core Concepts를 확실하게 정리해두려고 합니다."
date: "2022-08-14"
category: ["Web"]
---

> `bundler`의 대표주자 `Webpack`이 무엇인지, Core Concepts를 확실하게 정리해두려고 합니다.

본 글은 [Webpack Docs](https://webpack.js.org/concepts/)와 [생활코딩님의 강의](https://opentutorials.org/module/4566)를 참고해 작성했습니다.

# Overall

**webpack**은 모던 JS 어플리케이션을 위한 *static module bundler*입니다. webpack이 앱을 처리할 때, 하나 이상의 진입점(entry point)에서 종속성 그래프(dependency graph)를 내부적으로 작성하고, 프로젝트에 필요한 모든 모듈을 하나 이상의 번들로 만듭니다.

> 조금 어려운 용어가 많습니다. 차근 차근 뿌셔보겠습니다.

# 뿌셔보기

webpack을 이해하려면 webpack이 개발되기 전의 상황을 보아야 합니다.

## bundler

**index.html**

```html
<html>
  <body>
    <div class="root"></div>
    <script type="module">
      import hello from "./src/hello.js";
      import world from "./src/world.js";
      document.querySelector("#root").innerHTML = hello.word;
    </script>
  </body>
</html>
```

**src/hello.js**

```js
const word = "Hello";
export default word;
```

**src/world.js**

```js
const word = "World";
export default word;
```

webpack이 없었을 때 모듈을 export, import하던 방법입니다. 각각의 자바스크립트에서 명시적으로 export해야만 word라는 변수를 사용할 수 있습니다. 여기에는 두가지 문제가 있습니다.

1. 오래된 브라우저에서는 작동하지 않습니다.
2. 만약 모듈이 수 십, 수 백 개의 스크립트 뿐만 아니라 css, 이미지 등의 다른 정적 파일까지 있었다고 가정하면, 많은 컴퓨팅 파워가 들어갔을 것입니다. 이는 결국 부하를 발생시키고, 속도가 느려지니 사용자 경험이 안좋아질 것이고, 서비스를 제공하는 측에 입장에서도 비용이 많이 들게 됩니다.

이에, '웹에서도 모듈의 개념을 이용하자', '여러개의 파일을 하나로 묶어서 제공하자'라는 의견이 나와 개발된 것이 바로 `bundler`입니다. webpack은 bundler의 대표주자이고요.

## dependency graph

한 파일이 다른 파일에 종속될 때마다 webpack은 '종속성 그래프'를 자동으로 생성합니다. 이를 통해 이미지, 웹 폰트같은 코드 이외의 asset을 가져오고 어플리케이션의 종속성으로 제공할 수 있게 됩니다.

webpack은 configuration file에 정의된 모듈 목록에서부터 처리를 시작합니다. 이를 진입점(start point)라고 부릅니다. 이 진입점으로부터 어플리케이션에 필요한 모든 모듈을 포함하는 종속성 그래프를 재귀적으로 구축하고, 모든 모듈을 소수의 bundle로 묶습니다.

이렇게 묶인 모듈들은 브라우저에서 번들 단위로 로드됩니다.

# Configuration File

webpack의 configuration file을 그럼 실제로 한번 보겠습니다.

**webpack.config.js**

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: ["./webpack/진입점/파일.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "webpack으로_bundle된_파일.bundle.js",
  },
  module: {
    rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] }],
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

## entry

내부적으로 생성되는 dependency graph를 어디서부터 만들기 시작할 지를 지정합니다. `string | [string]` 타입으로, 여러 entry point를 지정할 수 있습니다. default 값은 `./src/index.js`입니다.

## output

출력 bundle 파일이 저장되는 경로와 파일 이름을 지정합니다.

## loader

webpack의 핵심 기능이라고 볼 수 있습니다.

![webpack](../static/img/Webpack이란/webpack.png)

bundler는 이렇게 다양한 형태의 파일들을 간단하게 묶어주는 일을 합니다. 그 중에서도 webpack은 자바스크립트가 아닌 파일들조차 번들링을 해줍니다. 그 과정이 바로 loader를 통해 이뤄집니다. webpack을 얼마나 잘 다루는가에 대한 부분도 이 loader를 얼마나 다양하고 유연하게 사용할 수 있는가에 따라 갈린다고 합니다.

위의 config에 나와있는 `.css`를 load하는 부분은 아래의 패키지를 설치하면 사용할 수 있습니다.

```code
npm i -D style-loader css-loader
```

`css-loader`는 css를 모듈로서 불러올 수 있게 해주며, `style-loader`는 웹 페이지 안에 `<style>`태그로 주입해주는 역할을 합니다. 즉, css를 로드할 때 따로 `.css` 파일을 받아오지 않더라도 html 파일 내에 이미 스타일이 들어가 있는 상태로 오므로 두개로 나눠서 올걸 하나로 합쳐서 준다는 거죠!

정리하면 loader는 입력한 asset들을 어떻게 가공해서 bundle로 만들지를 담당하는 녀석들입니다.

## plugin

loader는 모듈을 어떻게 만들어갈까에 대한 부분이었다면, plugin은 그렇게 만들어진 bundle에 추가적으로 어떻게 가공할 지를 담당합니다. plugin마다 사용법이 제각기 다릅니다.

대표적인 plugin인 `HTMLWebpackPlugin`을 사용해 보겠습니다. HTML 파일을 템플릿 등을 이용해 더 쉽게 생성할 수 있도록 도와주는 플러그인입니다.

```code
npm i -D html-webpack-plugin
```

앞서 보았던 `webpack.config.js`로 돌아가보면, `plugins`에 `HtmlWebpackPlugin()`을 명시해 준 것을 볼 수 있습니다. 이렇게 하면 output이 담기는 `dist/`에 `index.html`이 아래처럼 자동으로 생성됩니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>webpack App</title>
  </head>
  <body>
    <script src="webpack으로_bundle된_파일.bundle.js"></script>
  </body>
</html>
```

entry point가 여러개라면 `<script>` 태그도 여러개 생성됩니다.

# 마무리

모던 자바스크립트 어플리케이션과 떼 놓을 수 없는 존재인 bundler, webpack에 대해 간단히 알아봤습니다. 저는 webpack을 직접 사용할 일은 많지 않을거라고 생각해 깊게 공부하지는 않았지만, 언젠가 한번 정리해봐야겠다 싶었는데 유익한 시간이였습니다.

webpack은 bundling 외에도 lazy loading, code splitting 등을 지원하는데 이 개념은 Next.js를 공부하면서 배웠던 내용이라 신기합니다. 참고로 Next.js는 webpack5를 이용하는데, 원한다면 직접 webpack의 config를 바꿀 수 있다고 하네요.
