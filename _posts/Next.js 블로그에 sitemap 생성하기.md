---
title: "Next.js 블로그에 sitemap 생성하기"
excerpt: "블로그를 검색엔진에 노출시키기 위해 sitemap을 생성하는 코드를 추가하겠습니다."
date: "2022-08-06T17:23:00+09:00"
category: ["Next.js"]
---

> 블로그를 검색엔진에 노출시키기 위해 sitemap을 생성하는 코드를 추가하겠습니다.

# What is Sitemap?

[구글의 설명](https://developers.google.com/search/docs/advanced/sitemaps/overview?hl=ko)을 참고하면, 사이트맵은 사이트에 있는 페이지, 동영상 및 기타 파일과 그 관계에 대한 정보를 제공하는 파일입니다.

구글이나 네이버같은 검색 엔진들이 이 파일을 읽고 사이트를 더 효율적으로 크롤링할 수 있게 되죠. 필수적인 부분은 아니지만 SEO를 위해 생성해보도록 하겠습니다.

`npm package`를 이용하면 간단합니다.

## `next-sitemap`

```code
npm i next-sitemap
```

`next-sitemap`은 `Next.js` 프레임워크로 생성된 사이트의 `sitemap`을 생성해주는 npm package입니다. 다른 방법들도 물론 많지만, 패키지를 이용하는게 가장 깔끔하고 간편한 방법입니다.

이 패키지를 사용하려면 루트 디렉토리에 `next-sitemap.config.js`를 추가해줘야 합니다. 여기에는 `next-sitemap`관련된 설정들이 들어가게 됩니다. 파일을 생성하고 `tsconfig.json`에 아래처럼 `include`에 추가해줍니다.

```json
{
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.d.ts", "next-sitemap.config.js"]
}
```

그리고 `next-sitemap.config.js`을 아래 코드로 채워줍니다. 설정할 수 있는 부분은 다양하게 있으므로 [공식 문서](https://www.npmjs.com/package/next-sitemap)의 Configuration Options를 참고합니다.

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://custardcream.vercel.app/",
  generateRobotsTxt: true,
  priority: 1.0,
  generateIndexSitemap: false,
};
```

코드를 보시면 짐작하시겠지만 `robots.txt`까지 생성해줍니다. (환경변수로 개발환경에서의 URL을 넣어줄수도 있습니다.)

> `robots.txt`는 검색 엔진의 크롤링 봇에게 크롤링 권한을 부여해주는 파일입니다.

마지막으로 `postbuild` 스크립트를 `package.json`에 추가해주면 끝입니다.

```json
{
  "build": "next build",
  "postbuild": "next-sitemap"
}
```
