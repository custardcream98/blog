import { ResumeSectionData } from "src/types/resume";

const educations: ResumeSectionData[] = [
  {
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
    period: {
      from: "2022-08",
      to: "2023-01",
    },
    points: [
      "회고조 조장, 팀 프로젝트 리더로서 활동하며 Soft Skill을 발휘했습니다.",
      "지식을 나누기 위해 59명의 동료에게 리액트로 투두 개발하기 특강을 진행하고, 동료가 마주친 이슈를 함께 해결해나가는 '칭구칭긔들' 스터디를 리드하기도 했습니다.",
    ],
    title: "멋쟁이사자처럼 FE School 3기",
  },
  {
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
    period: {
      from: "2022-08",
      to: "2022-08",
    },
    title: "AWS Essentials",
  },
  {
    period: {
      from: "2021-10",
      to: "2021-10",
    },
    title: "SQLD (국가 공인 SQL 개발자)",
  },
  {
    period: {
      from: "2017-03",
      to: "2024-02",
    },
    title: "서울시립대학교 공간정보공학과 학부과정",
  },
];

export default educations;
