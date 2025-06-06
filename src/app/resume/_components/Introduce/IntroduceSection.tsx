import { CopyLinkButton, PrintButton } from "../../_client"
import { ResumeLink, S } from ".."

import { utld } from "utility-class-components"

function IntroduceSection() {
  return (
    <S.Section>
      <h3 className='sr-only'>자기 소개</h3>
      <IntroduceP>
        <strong>동료와 함께 성장하는 개발자</strong>입니다. 95명 규모의 사내·외 프론트엔드 Slack
        채널을 직접 운영하며, 주 1회 이상 최신 기술·아키텍처 아티클을 큐레이션해 공유합니다.
        회의·코드리뷰에서도 문제를 적극적으로 제기하고 대안을 제시해 왔습니다. 덕분에 다면평가에서
        &quot;기술적 고민을 깊이 하고 학습 내용을 적극 공유&quot;, &quot;어려움에 처한 동료를 먼저
        돕고 팀워크를 강화&quot;, &quot;호기심과 개선 의지가 탁월&quot;하다는 피드백을 받았습니다.
      </IntroduceP>

      <IntroduceP>
        <strong>오픈소스에 적극적으로 기여합니다.</strong> 실무 과정에서 framer-motion 커스텀 훅의
        무한 렌더링 버그를 발견해 직접 수정 했고, TanStack/query의{" "}
        <code>queryClient.setQueryData</code> 제네릭 타입 오류를 찾아내어 개선했습니다. 이처럼 사용
        중인 라이브러리에서 문제가 드러나면 회피하기보다 직접 수정하거나 이슈를 제기해 오픈소스
        커뮤니티와 함께 품질을 높이고자 노력합니다.
      </IntroduceP>
      <IntroduceP>
        더불어 <strong>DX 향상을 위한 도구 개발</strong>에도 적극적입니다. 수동으로 수정하기
        번거롭던 레거시 코드를 자동화 스크립트로 정리했으며, 팀 규칙에 맞춘 ESLint 플러그인을 직접
        제작해 배포했습니다. Sentry · OpenSearch · Amplitude에서 이벤트 로그나 enum을 마우스
        오버만으로 이해할 수 있도록 설명을 보여주는 Chrome 확장 프로그램을 개발해 비개발 직군까지
        활용하도록 했습니다. 현재는 MSW Request Handler를 클라이언트에서 직관적으로 관리할 수 있는
        MSW Devtools를 개발 중입니다.
      </IntroduceP>
      {/* <IntroduceP>
        저는 <strong>오픈소스에 기여하는 개발자</strong>입니다. React Server Component를 효과적으로
        사용하려면 빌드타임에 스타일이 결정돼야 한다는 점 때문에 TailwindCSS를 사용했는데, 유틸리티
        클래스 스타일 라이브러리를 사용하며 아쉬웠던 점을 보완하기 위해
        &apos;uility-class-components&apos; 라이브러리를 개발했습니다. 해당 이슈에 꾸준히 관심을
        가지고 있었던 덕분에 chakra-ui/panda, TanStack/query에 기여하기도 했습니다.
      </IntroduceP> */}
      {/* <IntroduceP>
        <strong>팀의 생산성을 개선하는 데에 큰 관심을 가지고 있습니다.</strong> 사내에서 Bootstrap을
        커스텀해 사용하고 있던 스타일시트 빌드 프로젝트가 지나치게 노후화돼 유지 보수에 어려움이
        있다는 점을 인지하고, Goorm Design System 모노레포로 프로젝트를 옮겨오는 작업을
        진행했습니다. 또한, GitHub Actions를 활용해 테스트 배포가 가능하도록 함으로써 DX를
        개선했습니다.
      </IntroduceP> */}
      <ContactList>
        <li className='inline-block print:hidden'>
          <ResumeLink name='이메일' url='mailto:custardcream@kakao.com' />
        </li>
        <li className='inline-block print:hidden'>
          <ResumeLink name='GitHub' url='https://github.com/custardcream98' />
        </li>
        <li className='inline-block print:hidden'>
          <ResumeLink name='포트폴리오' url='https://1drv.ms/p/s!AuUWTcQUIRa453uvR0QHsbUGYRbA' />
        </li>
        <li className='hidden print:inline-block'>
          <ResumeLink name='custardcream@kakao.com' url='https://shiwoo.dev' />
        </li>
        <li className='hidden print:inline-block'>
          <ResumeLink
            name='https://github.com/custardcream98'
            url='https://github.com/custardcream98'
          />
        </li>
        <li className='hidden print:inline-block'>
          <ResumeLink name='https://shiwoo.dev' url='https://shiwoo.dev' />
        </li>
      </ContactList>
      <ButtonWrapper>
        <PrintButton />
        <CopyLinkButton />
      </ButtonWrapper>
    </S.Section>
  )
}

const IntroduceP = utld.p`
  mt-[1.2em]
  leading-[1.7]
  font-light
  tracking-[0.03em]

  [&>strong]:(
    font-normal
    text-resume-text-strong-light
    dark:text-resume-text-strong-dark
  )
`

const ContactList = utld.ul`
  ml-auto
  mt-[2.5em]

  w-fit

  font-light

  [&>li+li]:ml-[1em]

  print:mt-[0.75em]
`

const ButtonWrapper = utld.aside`
  w-fit
  ml-auto
  mt-[0.5em]

  [&_button]:(
    p-0
    text-resume-text-light
    dark:text-resume-text-dark
  )

  [&_button+button]:ml-[1em]

  print:hidden
`

export default IntroduceSection
