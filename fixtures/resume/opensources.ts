import { Project } from "src/types/resume"

// 글자 색 검은색으로!!

// 내가 가지고 있는 기술에 대한 이해가 충분하고, 그걸 이해하고 쓴다는 점이 드러나야 함.
// 자기소개로 서버컴포넌트 얘기를 넣어야 함.

// TanStack/query : 트렌트 민감. 최신기술 이해. 이런 부분으로 밀고 나가기
// 잘난척을 어떻게 할 것인가!
// 평소에 오리지널 라이브러리 독스 작성에 기여하고 싶었다. 나는 오리지널 공식 문서 작성에 기여했다!
// 텐서플로 컨트리뷰터? if문 한 줄이라도 텐서플로 코어면? 말이 다르지

// 트러블슈팅 과정을 녹여라.

// 포트폴리오 제목 바꾸기

// 스토리텔링
// utility-class-components 개발에 녹여라. 프로젝트는 위로 올리기 쿼리랑 판다에 기여를 하게 된 근본이 됐다는걸 맨 앞줄에 적기.
// custard-ui는 그냥 두기.
// 경력에서 임팩트가 1도 없음. 실무 했고 테코 작성하고 했으니까 추상적인것만 쭉 적어서 뒤쪽 경험 위에 배치.

const opensources: Project[] = [
  // TODO: 스토리를 추가하기
  {
    description: `
     * **스타일 토큰 생성 관련 기여**를 했으며, 이슈를 올려주신 분의 감사 인사를 받기도 했습니다.
    `,
    links: [
      {
        name: "GitHub PR",
        url: "https://github.com/chakra-ui/panda/pull/997",
      },
    ],
    period: {
      from: "2023-07",
      to: "2023-07",
    },
    shortDescription:
      "React Server Component에 관심을 가지며 빌드타임에 스타일을 생성하는 라이브러리를 찾다가 접한 라이브러리입니다. 토큰 이름으로 '/'를 사용했을 때 escape가 안된다는 이슈를 해결하기 위해 해당 로직을 찾고, 수정했습니다.",
    stacks: [],
    title: "chakra-ui/panda",
  },
  {
    description: `
    * 비동기 Server Component 사용시 타입 에러가 발생하는 이슈에 대한 공식 문서의 설명을 Next.js에서 권장하는 방법으로 업데이트했습니다.
    `,
    links: [
      {
        name: "GitHub PR",
        url: "https://github.com/TanStack/query/pull/5670",
      },
    ],
    period: {
      from: "2023-07",
      to: "2023-07",
    },
    shortDescription:
      "Next.js 13버전의 App Router에서 QueryClient hydration을 어떻게 구현할 수 있을지 관심을 갖고 있다가, TanStack/query의 공식 문서 설명중 최신 내용이 아닌 부분을 발견해 업데이트했습니다.",
    stacks: [],
    title: "TanStack/query",
  },
]

export default opensources
