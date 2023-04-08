> 안녕하세요, 삽질 좋아하는 개발자 박시우입니다. 문제가 생기면 밤을 새서라도 알아내고 해결합니다.

# ⛑️ 삽질이야 말로 최선의 공부 아닐까요

항상 더 좋은 방법, 더 효율적인 코드를 짜기 위해 고민하는 것이야 말로 개발자의 가장 중요한 덕목이라 생각하고 실천하고자 노력합니다.

[이력서 Web](https://custardcream98.github.io/resume/)

# 🧑‍💻 저는 이런 일을 했어요!

## 스냅 사진사 SNS, Snappy

_4인, `JavaScript`, `React`, `styled-components`, `eslint`_

[발표 자료 링크](https://www.icloud.com/keynote/010JUfnE6aCei9AuFDNTjTmvw)

[발표 영상 링크](https://www.youtube.com/watch?v=PkcPliZGZ_0)

[GitHub Repo](https://github.com/likelion-devone/snappy)

스냅 사진사와 일반 사용자를 매칭하는 SNS 서비스입니다. FE 4인이 모여 개발한 프로젝트로, 감사하게도 제가 팀장을 맡아 프로젝트를 진행했습니다.

서버와의 비동기 통신시 반복되는 복잡한 패턴을 공통 훅으로 분리한 `useAPI` 커스텀 훅이나, 유연한 컴포넌트 설계 및 props-drilling을 줄이기 위해 사용한 컴파운드 컴포넌트 패턴 등 React 프로젝트의 설계 측면에서 여러모로 고민하는 시간을 가졌습니다. 컴포넌트의 UI와 로직을 분리하는 일이 얼마나 큰 효율성을 가져오는지를 느낄 수 있었고, JSDoc이 자동완성이라는 장점을 가져옴과 동시에 타 팀원에게 내가 작성한 코드를 이해하고 사용하는 데 큰 도움이 될 수 있다는걸 몸소 체험했습니다. (그래서 타입스크립트가 더 좋아졌습니다)

더불어 팀 프로젝트를 리드하는 경험은 제 Soft Skill을 향상시키는 데에도 큰 도움이 되었으며, 마지막 동료평가때 감사하게도 높은 점수를 받을 수 있었습니다.

## 코드를 나누는 공간: Share it!

_1인, `TypeScript`, `React`, `styled-components`, `React Helmet`, `Firebase`, `Express.js`_

[커뮤니티 링크](https://share-it-rust.vercel.app/)

[GitHub Repo](https://github.com/custardcream98/share-it)

'코드를 자유롭게 나누고 피드백을 주고받는 공간이 있었으면 좋겠다'는 생각으로 개발을 시작한 작은 커뮤니티입니다. `Firebase`를 통해 얻은 Auth를 철저히 확인하는 라우팅 및 커스텀 훅을 설계한 부분이 재밌었습니다. 백엔드 사이드에서도 `Firebase`와 `Express.js`를 활용해 사용자가 댓글을 남길 때 프론트로부터 받은 Auth Token을 검증 후 통과한다면 글 작성자에게 댓글 알람 메일을 보내는 엔드포인트를 하나 개발하기도 했습니다.

이후 단순히 개발에서 그치지 않고 웹의 성능을 향상시키고자 Lazy Loading, 서브셋 폰트 사용 등의 방법을 사용해 Lighthouse 기준 성능 점수를 77점에서 91점으로 끌어올렸습니다.([자세한 과정 포스팅](https://custardcream.vercel.app/posts/%EA%B0%9C%EC%9D%B8%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20Share%20it!%EC%9D%98%20%EC%84%B1%EB%8A%A5%20%EC%B5%9C%EC%A0%81%ED%99%94%ED%95%98%EA%B8%B0#%EA%B2%B0%EB%A1%A0)) `React Helmet`도 적극적으로 사용해 SEO 또한 놓치지 않고자 했습니다.

## 착한 이륜차 운전자 평가 모델 개발 연구용 설문 웹사이트 개발

_1인, 연구실 연구과제, `TypeScript`, `Next.js`, `recoil`, `Tailwind CSS`_

[배포된 설문지](https://goodrider-interview-web.vercel.app/)

[GitHub Repo](https://github.com/custardcream98/goodrider-interview-web)

단순한 설문지가 아니라, 사용자가 `<input type="range"/>`를 움직일 때마다 AHP 방법론에 의거해 사용자의 응답이 일관성을 띄고 있는지 여부를 검증, 일관성에 방해가 되는 문제를 하이라이트하고 올바른 방향으로 수정하도록 하는 아주 복잡한 로직이 들어간 설문지입니다. 기본이 되는 코드는 파이썬으로 개발됐는데, 슬라이더를 움직이는 순간 실시간으로 검증이 필요했기에 클라이언트 사이드에서 계산을 구현하기 위해 TS로 마이그레이션 해왔고, 그 과정에서 [일부 로직을 수정하거나 리팩토링](https://custardcream.vercel.app/posts/%EB%B3%B5%EC%9E%A1%ED%95%98%EA%B2%8C%20%EA%B5%AC%EC%84%B1%EB%90%9C%20if%EB%AC%B8%20%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81%ED%95%98%EA%B8%B0)까지 했습니다.

이 외에 사용자가 모든 페이지의 설문에 대해 응답을 마쳤는지를 확인하기 위해 `recoil`로 전역 상태 관리를 어떻게 해야 효율적일지, 혹은 사용자가 응답 도중 나갔다가 다시 돌아올 경우 로드를 위해 로컬 스토리지에 데이터를 어떻게 저장하고 이를 전역 상태와 어떻게 동기화할지를 중점으로 신경써 개발했습니다.

다소 어려운 로직이 들어가는 설문지를 혼자 개발하는 과정이 쉽지는 않았지만 워낙 특별한 모양의 웹 설문지를 개발한 덕에 특허출원을 진행하고 있어 제 자랑스런 프로젝트중 하나에요!

## 개발 블로그 **하나부터 열까지 직접** 개발

_1인, `TypeScript`, `Next.js`, `Express.js`, `styled-components`_

[블로그](https://custardcream.vercel.app/)

[GitHub Repo](https://github.com/custardcream98/blog-from-beginning-to-end)

저만의 개발 블로그는 제 개성을 나타내는 도구 중 하나라고 생각해요. 그런 의미에서 흔한 `jekyll`로 생성된 테마의 블로그를 운영하고 싶지 않았고, 직접 블로그를 하나 하나 개발하기로 했어요.

`Next.js` 프레임워크를 사용해 개발 중이고, Vercel로 deploy 됐어요. 블로그에 간단하게 댓글 하나 남길 때에도 로그인을 하게 만들고 싶지 않아 `Firebase`를 이용해 댓글 기능을 직접 구현했어요. 댓글이 달리면 제 메일로 알람도 오게(`nodemailer`) 만들었고, Open Graph Image / Thumbnail을 자동 생성하는 간단한 Express 서버도 개발해 사용중입니다.

최근에는 블로그 내에서 포스트 검색 기능을 개발하기도 했습니다. ([개발 기록 1](https://custardcream.vercel.app/posts/%EB%B8%94%EB%A1%9C%EA%B7%B8%EC%97%90%20%EA%B2%80%EC%83%89%20%EA%B8%B0%EB%8A%A5%EC%9D%84%20%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EC%9E%90%201), [개발 기록 2](https://custardcream.vercel.app/posts/%EB%B8%94%EB%A1%9C%EA%B7%B8%EC%97%90%20%EA%B2%80%EC%83%89%20%EA%B8%B0%EB%8A%A5%EC%9D%84%20%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EC%9E%90%202)) Debouncing / Throttling 기법을 비교해보고 Debouncing 기법을 활용, API Call을 최소화했습니다.

## 금연 타이머 Smoquit #노담이면\_좋겠어

_1인, `React`, `Redux Toolkit`, `Firebase`_

[사용해보기](https://custardcream98.github.io/smoquit/)

[GitHub Repo](https://github.com/custardcream98/smoquit)

`React.js`, `React-Redux`, `React-Bootstrap`, `Firebase` 등의 스택을 사용해 개발한 금연 타이머입니다. 평소에 금연을 도전하지만 계속해서 실패했던 이유가 금연에 대한 동기 부여가 부족했기 때문이라고 생각했고, 금연을 시작하면 실시간으로 지금까지 지킨 금연이 내게 얼마나 큰 이익을 줬는지 보여주는 Web App을 만들어야겠다 생각했습니다.

로그인, 도전 내역 조회(최신순, 기록순), 프로필 수정, 리더보드 등의 기능을 구현했습니다.

GitHub Pages로 앱을 Deploy하며 '왜 `HashRouter`로 배포하지 않으면 안되는걸까?' 라는 물음을 해결하며 Web Server가 정적인 웹사이트만을 제공하는 경우 SPA의 Routing을 어떻게 하면 좋을지에 대해 연구했고, Hashed Route(Fragment)가 아닌 `BrowserRouter`를 이용해 정상적인 path를 가진 React App을 배포할 수 있었습니다.

## 경로 기반 일정 스케줄링 크로스플랫폼 어플리케이션 개발

_2인, 풀스택으로 참여, `Flutter`, `Django`, `PostgreSQL`_

[졸업작품 설명 보러가기](https://uos-urbanscience.org/archives/uos_portfolio/%eb%8f%99%ec%84%a0%ec%9d%84-%ea%b3%a0%eb%a0%a4%ed%95%9c-all-in-one-%ec%9d%bc%ec%a0%95-%ec%8a%a4%ec%bc%80%ec%a4%84%eb%a7%81-%ec%84%9c%eb%b9%84%ec%8a%a4)

[GitHub Repo](https://github.com/Dayplan-it/Dayplan.it)

`Flutter`와 `Django`, `PostgreSQL`을 이용해 크로스플랫폼 어플리케이션을 개발했습니다. 개발 전반에 걸쳐서 풀스택 개발자로서 참여했으며, GitHub를 이용한 Git-flow 기반의 협업을 경험했고, Spatial Database 설계 및 구축, AWS를 이용한 서버 Deploy등을 해봤습니다.

특히, '일정'이라는 복잡한 데이터를 어떻게 하면 효율적으로 Database에 저장할 수 있을지, Server와 Front-End에서 각각 데이터를 어떻게 Serialize, Deserialize 할 수 있을지, 또 이를 위해 각 객체를 어떻게 설계해야 할지 등을 유기적으로 고민하는 과정을 거치며 크게 성장했어요.

단 둘뿐인 팀에서 3 ~ 4개월 만에 서비스가 가능한 수준의 어플리케이션을 개발하는 과정이 쉽지는 않았지만, **도시과학대학장 상 수상**이라는 좋은 결과를 얻었어요! 개발자가 되기로 마음먹은 계기가 된 정말 고마운 프로젝트였어요.

## 디스코드, 카카오톡 챗봇

_1인, `Node.js`_

[챗봇 기능 구경가기](https://blog.naver.com/sg05098/222596637921)

21.08부터 개발을 시작한 챗봇이에요. `Node.js`를 이용해 개발했는데, 처음에는 재미로 시작했던게 하나 둘 기능을 붙여나가다보니 지금은 20~30개의 기능을 가진 챗봇이 됐어요.

특히, 암호화폐, NFT 관련 기능이 아주 강력해요. 그래서인지 지금은 무려 약 500여명의 사용자가 있는 봇입니다.

> 재미로 시작했던 프로젝트라 기능을 덕지덕지 붙이다보니 코드가 금새 더러워졌어요. 그래도 잘 돌아가니 크게 고칠 필요성을 못느끼고 있다가, 버그가 발생해 고치려고 달려드니 너무 복합한 구조 때문에 엄청 애를 먹은 일이 있었어요. 그 후 객체지향 프로그래밍, 소프트웨어 아키텍처의 중요성을 깨닫고, 열심히 고쳐나가고 있어요! (물론 서비스에는 지장이 없어요)

## 인천시 생활폐기물 발생량 분석 및 예측 모델 개발

_6인, 연구실 연구과제, `GIS`, `Python`, `C# (ASP.NET)`_

서울시립대학교 공간데이터베이스 연구실 학부생 연구원으로 활동하며 진행한 프로젝트입니다.

분석용 데이터 관리를 위한 Spatial Database 설계와, 데이터 정제 및 약 200GB정도의 데이터가 담기는 데이터베이스 구축을 맡았고, GIS, Python 등을 이용해 데이터를 여러 각도에서 분석하고, 시각화 하는 일도 했습니다.

분석을 하며 가장 힘들었던건 정제되지 않은 데이터를 체계적으로 정리하는 과정이였어요. 전혀 체계가 잡혀있지 않은 체 중구난방으로 생성된 원 데이터들을 보며, 질 좋은 데이터를 만드는 일이 얼마나 중요한건지 배울 수 있었습니다.

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fcustardcream98&count_bg=%234C7CFF&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
