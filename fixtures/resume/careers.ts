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
      [
        "실패율 30%의 API 폴링 상황에서 유저 경험 개선을 위해 Retry 로직 설계",
        ["유저가 많이 몰리는 시즌을 고려해 Exponential Backoff + Jitter 적용"],
      ],
      [
        "간결한 영문으로 돼 디버깅시 파악이 어려웠던 이벤트 로그 키, enum 등에 설명을 추가해 보여주는 Chrome Extension 제안 및 개발",
        ["개발자 뿐만 아니라 PM, CX 등 모든 직군에서 활용 가능하도록 공유"],
      ],
      "CI 시간을 줄이기 위해 변경된 파일만 테스트 실행하도록 개선, 소요 시간 30초 단축",
      [
        "모바일 웹(웹뷰) 간편인증 과정에서 외부 앱(카카오톡·PASS) 이동 후에도 흐름이 끊기지 않도록 Web Worker 기반 백그라운드 폴링을 실험적으로 도입",
        [
          "안드로이드 환경에서 인증 완료율 <strong>10% 상승</strong>",
          "실험 과정에서 플랫폼별 스레드 생명주기 차이를 발견 → 웹 API·브라우저 정책에 대한 이해도 향상",
          "경험을 토대로 차기 프로젝트에 적용 가능한 <strong>type-safe Web Worker 커스텀 훅</strong> 설계",
        ],
      ],
      "거대한 <strong>레거시 ts-morph 활용해 효율적으로 수정</strong>",
      "Node, Storybook, Yarn 버전 업그레이드 등 프로젝트 환경 관리",
      "통합 테스트 작성 컨벤션 정립에 기여, Lines 커버리지 64% 달성",
      // "디자인 시스템의 dependency 관리 미흡으로 인한 emotion 인스턴스 복수 생성 이슈 도출 및 수정",
      "디자인 시스템 컴포넌트 개발 및 유지보수",
    ],
    links: [],
    period: {
      from: "2024-04",
    },
    position: "Frontend Engineer",
    stacks: ["TypeScript", "React", "Storybook", "Vitest", "GitHub Actions"],
  },
  {
    company: "구름",
    descriptions: [
      "게이미피케이션을 통해 구성원의 퍼포먼스를 이끌어내는 플랫폼 goormEXP 개발",
      "프론트엔드 개발 환경 개선을 위해 <strong>TypeScript로 마이그레이션</strong> 주도",
      "불필요한 코드 컨벤션 관련 코드리뷰를 줄이기 위해 <strong>ESLint Custom Rule 개발</strong>",
      [
        "goormstrap 프로젝트 GDS <strong>모노레포로의 이전 및 CI/CD 구축</strong>",
        ["노후화된 개발 환경으로 유지보수가 어려웠던 프로젝트를 이전"],
      ],
      "간트 차트 라이브러리 개발 및 Virtualize 활용해 성능 최적화",
      "디자이너와 효율적인 협업을 위해 Storybook 도입 건의, 개발 환경 구축",
      "Goorm Design System(GDS) 개발 및 유지보수",
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
    stacks: ["TypeScript", "Next.js", "Sass", "Storybook", "GitHub Actions"],
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
    stacks: ["TypeScript", "Vue.js"],
  },
]

export default careers
