import { Career } from "src/types/resume";

const careers: Career[] = [
  {
    company: "콘텐츠웨이브",
    descriptions: [
      "컴포넌트와 데이터 로드 로직의 결합도가 지나치게 높아 재사용이 어려운 컴포넌트의 Data & Domain, ViewModel과 View 레이어를 분리해 개선했습니다.",
      "협업의 효율성을 높이고 커뮤니케이션 비용을 줄이기 위해 테스트 코드를 작성,<strong> 80% 이상의 커버리지를 달성</strong>했습니다.",
      "꾸준한 토론을 통해 더 많은 생각을 나누고자 노력했습니다. 두 달만에 GitLab 기준 400회 이상의 Activity를 기록했습니다.",
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
];

export default careers;
