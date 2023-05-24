import { ResumeSectionData } from "src/types/resume";

const educations: ResumeSectionData[] = [
  {
    title: "멋쟁이사자처럼 FE School 3기",
    period: {
      from: "2022-08",
      to: "2023-01",
    },
    points: [
      "멋쟁이사자처럼에서 주관하는 프론트엔드 부트캠프에 참여했습니다.",
      "회고조 조장, 팀 프로젝트 리더로서 활동하며 Soft Skill을 발휘했습니다. 지식을 나누기 위해 59명의 동료에게 리액트로 투두 개발하기 특강을 진행하고, 동료가 마주친 이슈를 함께 해결해나가는 '칭구칭긔들' 스터디를 리드하기도 했습니다.",
    ],
    links: [
      {
        name: "투두 개발하기 특강",
        url: "https://custardcream98.github.io/resume/img/%EC%A7%80%EC%8B%9D%EB%82%98%EB%88%94.png",
      },
      {
        name: "칭구칭긔들 스터디 기록",
        url: "https://likelion.notion.site/bde5b83036fd429395e3f3bf12731931?v=29fd6e1e5e5a4d5cbffbd1f041eef5c7",
      },
    ],
  },
  {
    title: "AWS Essentials",
    period: {
      from: "2022-08",
      to: "2022-08",
    },
    links: [
      {
        name: "AWS Cloud Practitioner Essentials",
        url: "https://custardcream98.github.io/resume/img/AWS_Cloud_Practitioner_Essentials.png",
      },
      {
        name: "AWS Technical Essentials",
        url: "https://custardcream98.github.io/resume/img/AWS_Technical_Essentials.png",
      },
    ],
  },
  {
    title: "SQLD (국가 공인 SQL 개발자)",
    period: {
      from: "2021-10",
      to: "2021-10",
    },
  },
  {
    title: "서울시립대학교 공간정보공학과 학부과정",
    period: {
      from: "2017-03",
      to: "2024-02",
    },
    points: [
      "공간정보의 획득, 구축 및 분석에 관한 이론과 실습을 배웠습니다.",
      "공간 데이터의 관리와 분석을 위해 GIS, Python, R, SQL, C# 등을 사용했습니다.",
    ],
  },
];

export default educations;
