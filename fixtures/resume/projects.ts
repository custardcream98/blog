import { Project } from "src/types/resume";

const projects: Project[] = [
  {
    description: `
    * goormEXP의 메인 랜딩 페이지를 한 스프린트만에 개발했을 정도로 높은 퍼포먼스를 유지했습니다.
    * **Storybook 도입을 건의, 개발 환경을 구축**하고, **TypeScript으로의 마이그레이션을 주도**했습니다.
    * 불필요한 작업을 최소화하기 위해 수정이 필요한 곳의 autofix가 가능한 **ESLint Custom Rule을 개발, 도입**하고 Lint Rule을 구조화했습니다.
    * SSR / SSG 환경에서 다국어 지원에 대응했습니다.
    `,
    links: [
      {
        name: "goormEXP 메인 랜딩 페이지",
        url: "https://exp.goorm.io",
      },
    ],
    period: {
      from: "2023-07",
    },
    shortDescription:
      "게이미피케이션을 통해 구성원의 퍼포먼스를 이끌어내는 플랫폼인 goormEXP의 유지보수 및 개발을 맡았습니다. 팀의 프론트엔트 개발 환경 개선에 주력했습니다.",
    stacks: ["Next.js", "Storybook", "TypeScript", "ESLint"],
    team: "구름, goormEXP SQD",
    title: "goormEXP",
  },

  {
    description: `
    * Bootstrap을 변형해 사용하고 있던 goormstrap을 GDS 모노레포에 통합, GitHub Actions를 통한 테스트 버전 배포 방법을 구축하는 등 DX를 개선했습니다.
    * JS로 작성된 기존의 GDS를 TypeScript로 마이그레이션하는 작업에 기여했습니다.
    * 굉장히 복잡한 인터렉션이 필요한 **간트 차트 라이브러리를 개발**했습니다. Windowing 기법을 활용해 성능을 최적화했으며, 태스크 바의 드래그 앤 드롭이 가능합니다.
    `,
    links: [],
    period: {
      from: "2023-07",
    },
    shortDescription:
      "사내 디자인 시스템 라이브러리인 Goorm Design System의 유지보수 및 개발을 맡았습니다.",
    stacks: ["React.js", "TypeScript", "Monorepo", "Rollup", "Sass"],
    team: "구름",
    title: "Goorm Design System (GDS)",
  },

  {
    description:
      // utility-class-components 프로젝트로 밀고 블로그 위로 올리고 스내피를 맨 아래로
      // 스내피는 고민한 부분을 볼드처리 해봐라. 동료 피드백은 TS대신 JSDoc을 전파한 내용을 적어줘라. 팀원들에게 전파한 내용을 적어라. 내가 하고 싶은 기술이 있음에도 팀원들 좋자고 바꾼 내용을 담아봐라. 팀원과의 융합 능력 어필
      // 스내피에서 추상화를 진행해서 팀원이 쓰기 편하게 만들어준 내용인 useAPI => 이런 식으로 어필. 팀워크 리더십을 중점으로 어필하되, 이런 기술적인 부분도 어필.
      // 그런데 이거 만드는 시간에 전반적인 지식 전달을 하는게 좋지 않았을까 싶다는 내용도 드러내면 좋을거같음.
      `
      ~~~tsx
      import { utld, ud } from "utility-class-components";

      const Container = utld.div<{ $isRed: boolean }>\`
        flex
        text-bold

        \${({ $isRed }) => $isRed && "text-red-500"}
      \`;

      function Page() {
        return <Container $isRed={true}>AWESOME!!</Container>;
      }
      ~~~
       * BundlePhobia 기준 **3.8KB의 작은 번들 사이즈**를 달성했습니다.
    `,
    links: [
      {
        name: "GitHub",
        url: "https://github.com/custardcream98/utility-class-components",
      },
      {
        name: "npm 배포",
        url: "https://www.npmjs.com/package/utility-class-components",
      },
    ],
    period: {
      from: "2023-05",
      to: "2023-06",
    },
    shortDescription:
      "개인 블로그를 Next.js 13 버전의 App Router로 마이그레이션 하며 개발한 라이브러리입니다. 대부분의 CSS in JS 라이브러리는 React Context API를 사용해 React Server Component(RSC)에서 사용하기 어려웠기에, TailwindCSS로 스타일링 라이브러리를 바꾸며 '유틸리티 클래스를 CSS in JS처럼 다룰 수 있으면 좋겠다'는 아이디어에서 시작했습니다. 이 프로젝트를 통해 RSC의 사용에 대해 깊게 고민했고, 덕분에 오픈소스 프로젝트(chakra-ui/panda, TanStack/query)에 기여하는 소중한 경험을 할 수 있었습니다.",
    stacks: ["React.js", "TypeScript"],
    team: "개인 프로젝트",
    title: "utility-class-components",
  },
  {
    description: `
     * Next.js 12버전으로 시작했던 프로젝트를 13으로 업그레이드 하며, Server Component 스타일링을 더 편하게 하기 위해 **utility-class-components 라이브러리를 개발**했습니다.
     * Firebase SDK를 직접 사용하다가 API Route로 리팩토링 하며 **React Query와 Suspense를 활용해 로딩 및 에러 처리 로직을 개선**했습니다.
     * Lighthouse 기준 **Accessibility, SEO 점수 100점**을 유지하고 있습니다.
     * 복잡한 형태의 Conditional Rendering이 일어나는 댓글 컴포넌트를 객체를 사용한 설계로 리팩토링해 코드 가독성을 높였습니다.
     * 블로그 내 게시물 검색 기능을 구현했으며, API Call 최적화 및 어뷰징 방지를 위해 디바운싱을 적용하는 등 지속해서 기능을 개선 및 추가하고 있습니다.
     * 게시물의 썸네일을 자동으로 생성합니다.
    `,
    links: [
      {
        name: "GitHub",
        url: "https://github.com/custardcream98/blog-from-beginning-to-end",
      },
      {
        name: "블로그 링크",
        url: "https://shiwoo.dev",
      },
      {
        name: "추천글: CSS-in-JS와 서버 컴포넌트",
        url: "https://shiwoo.dev/posts/next-13-and-css-in-js",
      },
    ],
    period: {
      from: "2022-08",
    },
    shortDescription:
      "저만의 색깔을 나타낼 수 있도록 모든 부분을 직접 개발한 블로그입니다. 지속해서 리팩토링하며 컴포넌트 설계의 테스트베드로 활용하고 있습니다.", // TODO: 세 줄 요약으로 바꾸기
    stacks: ["Next.js", "TypeScript", "styled-components", "Node.js", "Firebase"],
    team: "개인 프로젝트",
    title: "기술 블로그",
  },

  // {
  //   description: `
  //    * Storybook을 사용해 컴포넌트를 시각적으로 확인할 수 있도록 했습니다.
  //    * 컴포넌트별 유닛 테스트를 작성했습니다.
  //    * 디자인 시스템을 설계 및 개발하고 있습니다.
  //   `,
  //   links: [
  //     {
  //       name: "GitHub",
  //       url: "https://github.com/custardcream98/custard-ui",
  //     },
  //     {
  //       name: "Storybook",
  //       url: "https://custardcream98.github.io/custard-ui",
  //     },
  //     {
  //       name: "npm 배포",
  //       url: "https://www.npmjs.com/package/custard-ui",
  //     },
  //   ],
  //   period: {
  //     from: "2023-02",
  //   },
  //   shortDescription:
  //     "저만의 React Component Library를 만들어보고 싶어 시작한 프로젝트입니다. 토이 프로젝트에서 개발한 컴포넌트들을 모으고 있습니다.",
  //   stacks: ["React.js", "TypeScript", "Emotion", "Jest", "Storybook"],
  //   team: "개인 프로젝트",
  //   title: "custard-ui",
  // },

  // {
  //   description: `
  //   * 현재 카카오톡 봇은 **약 700여 명의 MAU**를 기록하고 있습니다.
  //   * 거래소별로 다른 API 명세에 대응하기 위한 normalizer를 구조적으로 설계했습니다.
  //   * NFT 프로젝트 커뮤니티 관리를 위한 이벤트 기능, NFT 정보 검색 및 보유 중인 NFT 조회 기능을 탑재한 디스코드 봇을 개발해 **약 2,800여 명의 사용자가 있는 디스코드 서버에서 실사용**됐습니다.
  //   * 사용자 피드백을 받으며 서비스의 유지보수와 기능 추가를 지속적으로 진행하고 있습니다.
  //   `,
  //   links: [
  //     {
  //       name: "카카오톡 봇 기능 설명",
  //       url: "https://blog.naver.com/sg05098/222596637921",
  //     },
  //     {
  //       name: "봇 카카오톡 오픈 프로필",
  //       url: "https://open.kakao.com/o/s9uGYgPd",
  //     },
  //   ],
  //   period: {
  //     from: "2021-06",
  //   },
  //   shortDescription:
  //     "블록체인에 관심을 가져 개발한 챗봇입니다. 코인 가격 조회, NFT 가격 조회 등 20 ~ 30가지의 블록체인 투자 관련 기능을 가진 카카오톡 봇과, NFT 커뮤니티 관리를 위한 디스코드 봇입니다.",
  //   stacks: ["Node.js"],
  //   team: "개인 프로젝트",
  //   title: "카카오톡, 디스코드 챗봇",
  // },

  // {
  //   description: `
  //     ~~~ts
  //     const [isLoading, data, error, fetch] = useAPI(req.post.remove);
  //     ~~~
  //     * **팀원이 비동기 통신과 에러 핸들링을 편하게 할 수 있도록 useAPI 커스텀 훅을 개발**해 팀 내에서 좋은 평가를 받았습니다.
  //     * 팀 전원의 실력 향상을 위해 프로젝트 시작 전 공동 학습을 주도했습니다.
  //     * 합당한 이유와 주장을 갖고 있으면서도 상황에 따라 유연하게 팀을 이끌어간다는 동료 피드백을 받았습니다.
  //   `,
  //   links: [
  //     {
  //       name: "GitHub",
  //       url: "https://github.com/likelion-devone/snappy",
  //     },
  //     {
  //       name: "발표 영상",
  //       url: "https://www.youtube.com/watch?v=PkcPliZGZ_0",
  //     },
  //     {
  //       name: "발표 자료",
  //       url: "https://www.icloud.com/keynote/010JUfnE6aCei9AuFDNTjTmvw#%EB%8D%B0%EB%B8%8C%EC%9B%90",
  //     },
  //   ],
  //   period: {
  //     from: "2022-12",
  //     to: "2023-01",
  //   },
  //   shortDescription:
  //     "스냅 사진사와 이용자를 매칭하는 SNS 서비스입니다. 부트캠프에서 주어진 API를 활용해 개발한 프로젝트로, 네 명의 프론트엔드 개발자로 구성된 팀에서 리더를 맡았으며, Live Share 등의 툴을 사용해 페어 프로그래밍을 주로 진행했습니다. TypeScript에 익숙치 않은 팀원들을 위해 JavaScript를 사용하는 대신, JSDoc을 적극적으로 활용해 개발 경험을 향상하고자 노력했습니다.",
  //   stacks: ["React.js", "JavaScript", "styled-components"],
  //   team: "4인 프로젝트 (기여도 40%)",
  //   title: "Snappy",
  // },
];

export default projects;
