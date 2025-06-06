import { Project } from "src/types/resume"

const projects: Project[] = [
  {
    description: `
      * TanStack/query \`queryClient.setQueryData\` 제네릭 타입 오류 수정 ([링크](https://github.com/TanStack/query/pull/9030))
      * motion 무한 렌더링 버그 수정 ([링크](https://github.com/motiondivision/motion/pull/2802))
      * TanStack/query 공식 문서 잘못된 내용 수정 ([링크](https://github.com/TanStack/query/pull/5670))
      * chakra-ui/panda 스타일 토큰 생성 관련 버그 수정 ([링크](https://github.com/chakra-ui/panda/pull/997))
    `,
    shortDescription:
      "프로젝트 개발 시 자주 사용하는 라이브러리에 대한 이슈를 해결하고 공식 문서를 수정하는 등 오픈소스 프로젝트에 기여했습니다.",
    title: "오픈소스 프로젝트 기여",
  },
  // {
  //   description: `
  //   * goormEXP의 메인 랜딩 페이지를 한 스프린트만에 개발했을 정도로 높은 퍼포먼스를 유지했습니다.
  //   * **Storybook 도입을 건의, 개발 환경을 구축**하고, **TypeScript으로의 마이그레이션을 주도**했습니다.
  //   * 불필요한 작업을 최소화하기 위해 수정이 필요한 곳의 autofix가 가능한 **ESLint Custom Rule을 개발, 도입**하고 Lint Rule을 구조화했습니다.
  //   * SSR / SSG 환경에서 다국어 지원에 대응했습니다.
  //   `,
  //   links: [
  //     {
  //       name: "goormEXP 메인 랜딩 페이지",
  //       url: "https://exp.goorm.io",
  //     },
  //   ],
  //   period: {
  //     from: "2023-07",
  //     to: "2024-04",
  //   },
  //   shortDescription:
  //     "게이미피케이션을 통해 구성원의 퍼포먼스를 이끌어내는 플랫폼인 goormEXP의 유지보수 및 개발을 맡았습니다. 팀의 프론트엔트 개발 환경 개선에 주력했습니다.",
  //   stacks: ["Next.js", "Storybook", "TypeScript", "ESLint"],
  //   team: "구름, goormEXP SQD",
  //   title: "goormEXP",
  // },

  // {
  //   description: `
  //   * Bootstrap을 변형해 사용하고 있던 goormstrap을 GDS 모노레포에 통합, GitHub Actions를 통한 테스트 버전 배포 방법을 구축하는 등 DX를 개선했습니다.
  //   * JS로 작성된 기존의 GDS를 TypeScript로 마이그레이션하는 작업에 기여했습니다.
  //   * 굉장히 복잡한 인터렉션이 필요한 **간트 차트 라이브러리를 개발**했습니다. Windowing 기법을 활용해 성능을 최적화했으며, 태스크 바의 드래그 앤 드롭이 가능합니다.
  //   `,
  //   links: [],
  //   period: {
  //     from: "2023-07",
  //     to: "2024-04",
  //   },
  //   shortDescription:
  //     "사내 디자인 시스템 라이브러리인 Goorm Design System의 유지보수 및 개발을 맡았습니다.",
  //   stacks: ["React.js", "TypeScript", "Monorepo", "Rollup", "Sass"],
  //   team: "구름",
  //   title: "Goorm Design System (GDS)",
  // },

  {
    description: `
      * **프레임워크 독립적 API 설계**로 React, Vue 등 다양한 프레임워크에서 사용 가능
      * WebSocket 인터페이스 및 \`serverGuard\` 로직 추상화로 안정적인 JSON 파일 ↔ UI 실시간 동기화 구현
      * pnpm 모노레포로 UI, CLI 서버, 코어 3패키지 구조 설계
    `,
    links: [
      {
        name: "GitHub",
        url: "https://github.com/custardcream98/msw-devtools",
      },
      {
        name: "데모",
        url: "https://msw-devtools.vercel.app/",
      },
    ],
    period: {
      from: "2024-09",
    },
    shortDescription:
      "서비스 개발 시 MSW Request Handler 관리에 불편함을 느껴 개발하고 있는 Devtools입니다. UI를 통해 핸들러를 관리(추가, 수정, 삭제, 활성화/비활성화, 지연 처리)할 수 있습니다.",
    stacks: ["React.js", "TypeScript", "Rollup", "i18n"],
    team: "개인 프로젝트",
    title: "@custardcream/msw-devtools",
  },

  // {
  //   // utility-class-components 프로젝트로 밀고 블로그 위로 올리고 스내피를 맨 아래로
  //   description:
  //     // 스내피는 고민한 부분을 볼드처리 해봐라. 동료 피드백은 TS대신 JSDoc을 전파한 내용을 적어줘라. 팀원들에게 전파한 내용을 적어라. 내가 하고 싶은 기술이 있음에도 팀원들 좋자고 바꾼 내용을 담아봐라. 팀원과의 융합 능력 어필
  //     // 스내피에서 추상화를 진행해서 팀원이 쓰기 편하게 만들어준 내용인 useAPI => 이런 식으로 어필. 팀워크 리더십을 중점으로 어필하되, 이런 기술적인 부분도 어필.
  //     // 그런데 이거 만드는 시간에 전반적인 지식 전달을 하는게 좋지 않았을까 싶다는 내용도 드러내면 좋을거같음.
  //     `
  //     ~~~tsx
  //     import { utld, ud } from "utility-class-components";

  //     const Container = utld.div<{ $isRed: boolean }>\`
  //       flex
  //       text-bold

  //       \${({ $isRed }) => $isRed && "text-red-500"}
  //     \`;

  //     function Page() {
  //       return <Container $isRed={true}>AWESOME!!</Container>;
  //     }
  //     ~~~
  //      * BundlePhobia 기준 **3.8KB의 작은 번들 사이즈** 달성
  //   `,
  //   links: [
  //     {
  //       name: "GitHub",
  //       url: "https://github.com/custardcream98/utility-class-components",
  //     },
  //     {
  //       name: "npm 배포",
  //       url: "https://www.npmjs.com/package/utility-class-components",
  //     },
  //   ],
  //   period: {
  //     from: "2023-05",
  //     to: "2023-06",
  //   },
  //   shortDescription:
  //     "개인 블로그를 Next.js 13 버전의 App Router로 마이그레이션 하며 개발한 라이브러리입니다. '유틸리티 클래스를 CSS in JS처럼 다룰 수 있으면 좋겠다'는 아이디어에서 시작했습니다.",
  //   stacks: ["React.js", "TypeScript"],
  //   team: "개인 프로젝트",
  //   title: "utility-class-components",
  // },

  // {
  //   // * Next.js 12버전으로 시작했던 프로젝트를 13으로 업그레이드 하며, Server Component 스타일링을 더 편하게 하기 위해 **utility-class-components 라이브러리를 개발**
  //   description: `
  //    * Lighthouse 기준 **Accessibility, SEO 점수 100점**을 유지
  //    * 블로그 내 게시물 검색 기능을 직접 구현, API Call 최적화 및 어뷰징 방지를 위해 디바운싱을 적용하는 등 지속해서 기능을 개선 및 추가중
  //    * 게시물의 썸네일을 자동으로 생성
  //   `,
  //   links: [
  //     {
  //       name: "GitHub",
  //       url: "https://github.com/custardcream98/blog-from-beginning-to-end",
  //     },
  //     {
  //       name: "블로그 링크",
  //       url: "https://shiwoo.dev",
  //     },
  //     {
  //       name: "추천글: CSS-in-JS와 서버 컴포넌트",
  //       url: "https://shiwoo.dev/posts/next-13-and-css-in-js",
  //     },
  //   ],
  //   period: {
  //     from: "2022-08",
  //   },
  //   shortDescription:
  //     "저만의 색깔을 나타낼 수 있도록 모든 부분을 직접 개발한 블로그입니다. 지속해서 리팩토링하며 컴포넌트 설계의 테스트베드로 활용하고 있습니다.", // TODO: 세 줄 요약으로 바꾸기
  //   stacks: ["Next.js", "TypeScript"],
  //   team: "개인 프로젝트",
  //   title: "기술 블로그",
  // },

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

  {
    description: `
   * 복수 거래소 API(Upbit·Bithumb·Binance·CoinGecko 등)를 **타입 안전 resolver 레이어**로 통합, 단일 fetch SDK 제공
   * 제네릭 Server Component 유틸을 설계해 Suspense · 데이터 패칭 패턴을 연구중
      ~~~tsx
      // As Is
      <Suspense fallback={<div>Loading...</div>}>
        <CoinListServerComponent />
      </Suspense>

      // To Be
      <Suspense fallback={<div>Loading...</div>}>
        <ServerPromiseConsumer
          promise={getCoinListData()}
        >
          {(data) => <CoinList data={data} />}
        </ServerPromiseConsumer>
      </Suspense>
      ~~~
  `,
    links: [{ name: "서비스 링크", url: "https://coinrate.kr" }],
    period: { from: "2025-05" },
    shortDescription:
      "한국 주요 거래소(업비트·빗썸)와 글로벌 지수 데이터를 통합해 한국 프리미엄·환율·거래소별 가격 차이를 실시간으로 보여주는 서비스입니다. Next.js 최신 기능을 실험하며 개발·운영 중입니다.",
    stacks: ["Next.js", "TypeScript"],
    team: "개인 프로젝트",
    title: "coinrate.kr — 실시간 암호화폐 환율 계산기",
  },

  {
    description: `
    * 최대 **약 700여 명의 MAU** 기록 (서비스 중단)
    * 코인 거래소별로 다른 API 명세에 대응하기 위한 normalizer를 구조적으로 설계
    * NFT 프로젝트 커뮤니티 관리를 위한 이벤트 기능, NFT 정보 검색 및 보유 중인 NFT 조회 기능을 탑재한 디스코드 봇을 개발해 **약 2,800여 명의 사용자가 있는 디스코드 서버에서 실사용**
    `,
    links: [
      {
        name: "카카오톡 봇 기능 설명",
        url: "https://blog.naver.com/sg05098/222596637921",
      },
    ],
    period: {
      from: "2021-06",
      to: "2024-04",
    },
    shortDescription:
      "블록체인에 관심을 가져 개발한 챗봇입니다. 코인 가격 조회, NFT 가격 조회, 가격 변동 알람 등 20 ~ 30가지의 블록체인 투자 관련 기능을 가진 카카오톡 봇과, NFT 커뮤니티 관리를 위한 디스코드 봇입니다.",
    stacks: ["Node.js"],
    team: "개인 프로젝트",
    title: "카카오톡, 디스코드 코인 / NFT 정보 조회 챗봇",
  },

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
]

export default projects
