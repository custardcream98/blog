import type { ResumeSectionData } from "src/types/resume";

const experiences: ResumeSectionData[] = [
  {
    title: "『타입스크립트 넌 내 타입』 집필",
    period: {
      from: "2022-10",
      to: "2022-11",
    },
    points: [
      "타입스크립트를 처음 접하는 사람들을 위한 개념서를 집필했습니다.",
    ],
    descriptions: [
      "인터페이스, 제네릭 챕터 집필에 참여했습니다.",
    ],
  },
  {
    title: "Google Developer Student Clubs UOS",
    period: {
      from: "2022-03",
    },
    points: [
      "Frontend 팀의 Core Member로서 커뮤니티를 이끌고 있습니다. ",
      "Data/ML 팀 Core Member로 활동하기도 했습니다.",
    ],
    descriptions: [
      "정기적으로 Frontend Tech Talk을 진행하고 있습니다.",
      "신입 멤버 지원서를 효율적으로 관리할 수 있는 웹 페이지를 Next.js 활용해 개발했습니다.",
      "Confluence, Slack, Gather 등의 커뮤니케이션 툴을 활용해 Daily Scrum, Sprint 회고, Kick Off, CPU Meeting 등을 주도했습니다.",
    ],
  },
  {
    title:
      "서울시립대학교 공간 데이터베이스 연구실 학부생 연구원",
    period: {
      from: "2021-06",
      to: "2023-02",
    },
    points: [
      "공간 데이터베이스 연구실에서 Web Devloper로서 활동했습니다.",
      "공간 데이터베이스의 설계 및 구축, 데이터 정제, 관리, 수집, 분석 및 가공을 담당하기도 했습니다.",
    ],
    descriptions: [
      "인천시 생활폐기물 발생량 분석 및 예측 모델 개발 연구",
      "착한 이륜차 운전자 평가 시스템 개발 연구",
    ],
  },
  {
    title: "부트캠프 우수 수료생",
    period: { from: "2023-01", to: "2023-01" },
    points: [
      "멋쟁이사자처럼 FE School의 우수 수료생으로 선정되어 특별상, 콘텐츠상, 동료칭찬상을 수상했습니다.",
    ],
  },
  {
    title: "WEB 이력서 경진대회",
    period: { from: "2022-10", to: "2022-10" },
    points: [
      "멋쟁이사자처럼 FE School 주최 WEB 이력서 경진대회에서 최우수상을 수상했습니다.",
    ],
    links: [
      {
        name: "수상 이력서",
        url: "https://custardcream98.github.io/resume/",
      },
    ],
  },
  {
    title: "제 36회 도시과학대학 공동작품전",
    period: { from: "2022-05", to: "2022-05" },
    points: [
      "동선 기반 일정 관리 크로스플랫폼 어플리케이션 Dayplan.it을 개발, 도시과학대학장상을 수상했습니다.",
    ],
  },
];

export default experiences;
