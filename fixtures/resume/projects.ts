import { Project } from "src/types/resume";

const projects: Project[] = [
  {
    title: "Mamma",
    period: {
      from: "2023-03",
      to: "2023-04",
    },
    team: "5인 프로젝트 (기여도 80%)",
    shortDescription:
      "Wavve Tech Internship 기간 동안 새로운 기술 스택에 빠르게 적응하기 위해 시작했던 토이 프로젝트입니다. 콘텐츠웨이브 사내에서 공유되고 있는 맛집 데이터를 기반으로 랜덤하게 레스토랑을 추천해주고, 리뷰와 새로운 레스토랑을 등록 및 검색할 수 있는 서비스입니다.",
    descriptions: [
      "1주간 연습용으로 조금 개발해보는 프로젝트였으나, 두 명이 추가로 개발을 진행해 완성 및 배포했습니다. CSO님을 비롯한 사내 임직원분들께 좋은 반응을 얻었습니다.",
      "덕분에 단기간에 새로운 기술 스택(Vue.js)을 익히고 실무에 임할 수 있었습니다.",
    ],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/custardcream98/mamma",
      },
      {
        name: "서비스 링크",
        url: "https://mamma.vercel.app/",
      },
    ],
    stacks: ["Vue.js", "TypeScript", "Vue Query", "UnoCSS"],
  },
  {
    title: "custard-ui",
    period: {
      from: "2023-02",
    },
    team: "개인 프로젝트",
    shortDescription:
      "저만의 React Component Library를 만들어보고 싶어 시작한 프로젝트입니다. 토이 프로젝트에서 개발한 컴포넌트들을 모으고 있습니다.",
    descriptions: [
      "Rollup을 사용해 번들링, node pacakge로 배포했습니다.",
      "Storybook을 사용해 컴포넌트를 시각적으로 확인할 수 있도록 했습니다.",
      "컴포넌트별 유닛 테스트를 작성했습니다.",
      "디자인 시스템을 설계 및 개발하고 있습니다.",
    ],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/custardcream98/custard-ui",
      },
      {
        name: "Storybook",
        url: "https://custardcream98.github.io/custard-ui",
      },
      {
        name: "npm 배포",
        url: "https://www.npmjs.com/package/custard-ui",
      },
    ],
    stacks: [
      "React.js",
      "TypeScript",
      "Emotion",
      "Jest",
      "Storybook",
    ],
  },
  {
    title: "Snappy",
    period: {
      from: "2022-12",
      to: "2023-01",
    },
    team: "4인 프로젝트 (기여도 40%)",
    shortDescription:
      "스냅 사진사와 이용자를 매칭하는 SNS 서비스입니다. 네 명의 프론트엔드 개발자로 구성된 팀에서 리더를 맡았으며, Live Share 등의 툴을 사용해 페어 프로그래밍을 주로 진행했습니다. TypeScript에 익숙치 않은 팀원들을 위해 JavaScript를 사용하는 대신, JSDoc을 적극적으로 활용해 개발 경험을 향상하고자 노력했습니다.",
    descriptions: [
      "서버와의 비동기 통신 시 사용되는 반복되는 패턴을 분리, useAPI 커스텀 훅을 설계 및 개발해 팀 내에서 좋은 평가를 받았습니다.",
      "유지보수가 용이한 구조의 컴포넌트를 설계하기 위해 고민했고, 컴파운드 컴포넌트 패턴을 주도적으로 도입했습니다.",
      "SVG 파일의 반복적인 import문을 자동으로 생성하는 스크립트를 작성해 팀원들의 작업 효율을 높였습니다.",
    ],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/likelion-devone/snappy",
      },
      {
        name: "발표 영상",
        url: "https://www.youtube.com/watch?v=PkcPliZGZ_0",
      },
      {
        name: "발표 자료",
        url: "https://www.icloud.com/keynote/010JUfnE6aCei9AuFDNTjTmvw#%EB%8D%B0%EB%B8%8C%EC%9B%90",
      },
    ],
    stacks: ["React.js", "JavaScript", "styled-components"],
  },
  {
    title: "기술 블로그",
    period: {
      from: "2022-08",
    },
    team: "개인 프로젝트",
    shortDescription:
      "저만의 색깔을 나타낼 수 있도록 모든 부분을 직접 개발한 블로그입니다. SEO를 고려해 SSG가 가능한 Next.js를 사용했고, 댓글 등록 알람을 받고 싶어 메일링 API를 개발해 적용하기도 했습니다. 지속해서 리팩토링하며 컴포넌트 설계의 테스트베드로 활용하고 있습니다.",
    descriptions: [
      "remark를 활용해 마크다운으로 작성한 포스트를 정적 웹사이트로 빌드합니다. ",
      "Lighthouse 기준 Accessibility, SEO 점수 100점을 유지하고 있습니다. 그 결과 Google Search Console 기준 총 노출 수 11,330회, 총 클릭 수 1,100회, 평균 게재순위 14.6위를 달성했습니다.",
      "블로그 내 게시물 검색 기능을 구현했으며, API Call 최적화 및 어뷰징 방지를 위해 디바운싱을 적용하는 등 지속해서 기능을 개선 및 추가하고 있습니다.",
      "Conditional Rendering이 일어나는 컴포넌트의 구조는 어떻게 설계하는 것이 좋을지 고민하는 등 좋은 코드 작성을 위해 노력하고 있습니다.",
      "댓글 등록 알람 메일링 API, 썸네일 자동 생성 API를 개발했습니다.",
    ],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/custardcream98/blog-from-beginning-to-end",
      },
      {
        name: "블로그 링크 (지금 보고 계시는 이 블로그!)",
        url: "https://shiwoo.dev",
      },
      {
        name: "추천글: 댓글 컴포넌트 리팩토링하기",
        url: "https://shiwoo.dev/posts/%EB%8C%93%EA%B8%80%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%20%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81%ED%95%98%EA%B8%B0",
      },
    ],
    stacks: [
      "Next.js",
      "TypeScript",
      "styled-components",
      "Node.js",
      "Firebase",
    ],
  },
  {
    title: "착한 이륜차 운전자 평가 모델 개발용 설문 폼",
    period: {
      from: "2022-06",
      to: "2022-10",
    },
    team: "개인 프로젝트 - 서울시립대학교 공간 데이터베이스 연구실 연구과제",
    shortDescription:
      "이륜차 운전자의 운전 습관 개선을 위해 '착한 운전자 점수' 채점 기준을 마련하고자 진행된 연구과제용 설문 폼입니다. AHP 분석법이라는 특수한 형태의 설문을 위해, 슬라이더를 움직이면 실시간으로 유효성을 검증하는 복잡한 로직이 담긴 컴포넌트를 개발했습니다.",
    descriptions: [
      "슬라이더를 움직일 때마다 유효성을 검증하고, 유효하지 않으면 GNB에 표현 및 해당 문항으로 이동할 수 있는 링크 제공을 위해 recoil을 활용, 전역 상태를 관리했습니다.",
      "복잡한 유효성 검증 로직을 테스트하기 위해 Cypress를 활용, e2e 테스트를 진행했습니다.",
      "타 언어(Python)로 개발된 유효성 검증 로직을 TypeScript로 포팅하고, 비효율적인 로직 리팩토링을 진행해 코드의 가독성을 높였습니다.",
      "여러 depth로 구성된 설문 폼의 구조에 유연하게 대응할 수 있도록 JSON으로 관리하고, 이를 기반으로 빌드할 수 있게 DFS 알고리즘을 활용하고자 하는 등 설계에 신경을 썼습니다.",
    ],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/custardcream98/goodrider-interview-web",
      },
      {
        name: "설문 폼 링크",
        url: "https://goodrider-interview-web.vercel.app/",
      },
      {
        name: "추천글: 복잡하게 구성된 if문 리팩토링하기",
        url: "https://shiwoo.dev/posts/%EB%B3%B5%EC%9E%A1%ED%95%98%EA%B2%8C%20%EA%B5%AC%EC%84%B1%EB%90%9C%20if%EB%AC%B8%20%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81%ED%95%98%EA%B8%B0",
      },
    ],
    stacks: [
      "Next.js",
      "TypeScript",
      "Recoil",
      "Cypress",
      "Tailwind",
    ],
  },
  {
    title: "Dayplan.it",
    period: {
      from: "2022-01",
      to: "2022-05",
    },
    team: "2인 프로젝트 (기여도 50%, 풀스택 개발)",
    shortDescription:
      "졸업 작품으로 개발한 동선 기반 일정 관리 크로스플랫폼 어플리케이션입니다. 장소를 정하려면 동선 이동 일정을 정해야 하고, 반대로 동선을 알려면 장소가 결정돼야 하는 모순을 해결하고자 했습니다. 열심히 임한 덕분에 도시과학대학장상을 수상하는 등 좋은 평가를 받았습니다.",
    descriptions: [
      "직관적인 일정 관리를 위해 스크롤이 가능한 수직 타임라인에 드래그 앤 드롭으로 일정 블록의 순서를 바꾸거나 삭제하고, 길게 누르며 드래그해 일정 블록의 지속 시간을 변경할 수 있는 위젯을 구현했습니다.",
      "순서와 경로가 담긴 스케줄 데이터를 효율적으로 다룰 수 있도록 Frontend / Backend 양측에서 Serializer, Deserialzer를 개발했습니다.",
    ],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/Dayplan-it/Dayplan.it",
      },
      {
        name: "작품 설명",
        url: "https://uos-urbanscience.org/archives/uos_portfolio/%eb%8f%99%ec%84%a0%ec%9d%84-%ea%b3%a0%eb%a0%a4%ed%95%9c-all-in-one-%ec%9d%bc%ec%a0%95-%ec%8a%a4%ec%bc%80%ec%a4%84%eb%a7%81-%ec%84%9c%eb%b9%84%ec%8a%a4",
      },
    ],
    stacks: [
      "Flutter",
      "Django",
      "PostgreSQL",
      "Dart",
      "Python",
    ],
  },
  {
    title: "카카오톡, 디스코드 챗봇",
    period: {
      from: "2021-06",
    },
    team: "개인 프로젝트",
    shortDescription:
      "블록체인에 관심을 가져 개발한 챗봇입니다. 코인 가격 조회, NFT 가격 조회 등 20 ~ 30가지의 블록체인 투자 관련 기능을 가진 카카오톡 봇과, NFT 커뮤니티 관리를 위한 디스코드 봇입니다.",
    descriptions: [
      "현재 카카오톡 봇은 약 500여 명의 MAU를 기록하고 있습니다.",
      "거래소별로 다른 API 명세에 대응하기 위한 normalizer를 구조적으로 설계했습니다.",
      "NFT 프로젝트 커뮤니티 관리를 위한 이벤트 기능, NFT 정보 검색 및 보유 중인 NFT 조회 기능을 탑재한 디스코드 봇을 개발해 약 2,800여 명의 사용자가 있는 디스코드 서버에서 실사용됐습니다.",
    ],
    links: [
      {
        name: "카카오톡 봇 기능 설명",
        url: "https://blog.naver.com/sg05098/222596637921",
      },
      {
        name: "봇 카카오톡 오픈 프로필",
        url: "https://open.kakao.com/o/s9uGYgPd",
      },
    ],
    stacks: ["Node.js"],
  },
];

export default projects;
