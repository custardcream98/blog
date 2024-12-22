import { Career } from "src/types/resume"

const careers: Career[] = [
  {
    company: "자비스앤빌런즈(삼쩜삼)",
    descriptions: [
      "Individual Income Tax(개인소득세) 사업부 소속으로 <strong>삼쩜삼</strong> 개발",
      [
        "서비스 주 사용층을 확인해 Polyfill 적용, <strong>coverage 10%가량 향상</strong>",
        ["user-agent 분석으로 최적의 최소 지원 버전 도출"],
      ],
      "거대한 <strong>레거시 ts-morph 활용해 효율적으로 수정</strong>",
      "Node, Storybook, Yarn 버전 업그레이드 등 프로젝트 환경 관리",
      "통합 테스트 작성 컨벤션 정립에 기여",
      // "디자인 시스템의 dependency 관리 미흡으로 인한 emotion 인스턴스 복수 생성 이슈 도출 및 수정",
      "디자인 시스템 컴포넌트 개발 및 유지보수",
    ],
    links: [],
    period: {
      from: "2024-04",
    },
    position: "Frontend Engineer",
  },
  {
    company: "구름",
    descriptions: [
      "게이미피케이션을 통해 구성원의 퍼포먼스를 이끌어내는 플랫폼인 goormEXP 개발",
      "Goorm Design System(GDS) 개발 및 유지보수",
      "<strong>TypeScript로 마이그레이션 주도</strong>",
      "<strong>Storybook 도입 건의 및 개발 환경 구축</strong>",
      "실무 사용을 위한 <strong>ESLint Custom Rule 개발</strong>",
      "goormstrap 프로젝트 GDS <strong>모노레포로의 이전 및 CI/CD 구축</strong>",
      "간트 차트 라이브러리 개발 및 Virtualize 활용해 성능 최적화",
      "SSR / SSG 환경에서 다국어 지원 대응",
      // "<strong>Goorm Design System</strong>의 유지보수 및 개발을 진행하고 있습니다.",
      // "<strong>간트 차트</strong>를 개발하고 있습니다. Windowing 기법을 활용해 성능을 최적화하고 있으며, 태스크 바의 드래그 앤 드롭이 가능합니다.",
      // "goormEXP 랜딩 페이지를 한 스프린트만에 개발했을 정도로 <strong>높은 퍼포먼스를 유지</strong>하고 있습니다.",
    ],
    links: [],
    period: {
      from: "2023-07",
      to: "2024-04",
    },
    position: "Frontend Engineer",
  },
  {
    company: "콘텐츠웨이브",
    descriptions: [
      // "컴포넌트와 데이터 로드 로직의 결합도가 지나치게 높아 재사용이 어려운 컴포넌트의 Data & Domain, ViewModel과 View 레이어를 분리해 개선했습니다.",
      // "협업의 효율성을 높이고 커뮤니케이션 비용을 줄이기 위해 테스트 코드를 작성, <strong>80% 이상의 커버리지를 달성</strong>했습니다.",
      "꾸준한 토론을 통해 더 많은 생각을 나누고자 노력, <strong>두 달만에 GitLab 기준 400회 이상의 Activity</strong>를 기록",
      // "라이브 시청 중 타 유저의 반응을 실시간으로 볼 수 있도록 하는 'Play Reaction' 프로젝트에 참여했습니다. 프로젝트의 기획부터 구현까지 전반적인 부분에 기여했습니다.",
    ],
    links: [],
    period: {
      from: "2023-03",
      to: "2023-05",
    },
    position: "웹 프론트엔드 개발 인턴",
    // shortDescription:
    //   "팀의 구성원으로서 내가 아니라 다른 사람이 이해하기 좋은 코드를 작성해야 하고, 다른 팀원이 내 코드를 어떻게 사용하더라도 문제없이 돌아갈 수 있도록 <strong>'방어적 코딩'</strong>을 해야 한다는 점을 깨달았습니다. 또한, 테크 스펙 설계나 테스트 작성이 협업 수단으로서 가지는 의미를 알 수 있었습니다.",
  },
]

export default careers
