import { Project } from "src/types/resume";

const opensources: Project[] = [
  {
    descriptions: [],
    links: [
      {
        name: "GitHub PR",
        url: "https://github.com/chakra-ui/panda/pull/997",
      },
    ],
    period: {
      from: "2023-05",
      to: "2023-05",
    },
    shortDescription:
      "빌드시 스타일을 생성하는 라이브러리인 chakra-ui팀의 라이브러리입니다. <strong>스타일 토큰 생성 관련 기여</strong>를 했으며, 이슈를 올려주신 분의 감사 인사를 받기도 했습니다.",
    stacks: [],
    title: "chakra-ui/panda",
  },
  {
    descriptions: [
      "유틸리티 클래스를 CSS in JS(styled-components)처럼 다룰 수 있게 도와줍니다.",
      "예를 들어, <code>utld.div` bg-red-500 `;</code> 처럼 컴포넌트를 선언할 수 있습니다.",
      "기존 컴포넌트에 className Prop을 주는 방식으로 스타일을 입히면서도, 기존 컴포넌트가 받을 수 있는 Prop을 타입 시스템이 인식하도록 정교한 타입 시스템을 구현했습니다.",
      "BundlePhobia 기준 <strong>3.8KB의 작은 번들 사이즈</strong>를 달성했습니다.",
    ],
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
    },
    shortDescription:
      "Next.js 13 버전에서 React Server Component에 대응하기 위해 TailwindCSS로 스타일링 라이브러리를 바꾸며, '유틸리티 클래스를 CSS in JS처럼 다룰 수 있으면 좋겠다'는 생각에 개발한 라이브러리입니다.",
    stacks: ["React.js", "TypeScript"],
    team: "개인 프로젝트",
    title: "utility-class-components",
  },
  {
    descriptions: [
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
    period: {
      from: "2023-02",
    },
    shortDescription:
      "저만의 React Component Library를 만들어보고 싶어 시작한 프로젝트입니다. 토이 프로젝트에서 개발한 컴포넌트들을 모으고 있습니다.",
    stacks: ["React.js", "TypeScript", "Emotion", "Jest", "Storybook"],
    team: "개인 프로젝트",
    title: "custard-ui",
  },
];

export default opensources;
