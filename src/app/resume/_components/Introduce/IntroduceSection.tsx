import { CopyLinkButton, PrintButton } from "../../_client";
import { ResumeLink, S } from "..";

import { utld } from "utility-class-components";

function IntroduceSection() {
  return (
    <S.Section>
      <h3 className='sr-only'>자기 소개</h3>
      <IntroduceP>
        저는 <strong>오픈소스에 기여하는 개발자</strong>입니다. React Server Component를 효과적으로
        사용하려면 빌드타임에 스타일이 결정돼야 한다는 점 때문에 TailwindCSS를 사용했는데, 유틸리티
        클래스 스타일 라이브러리를 사용하며 아쉬웠던 점을 보완하기 위해
        &apos;uility-class-components&apos; 라이브러리를 개발했습니다. 해당 이슈에 꾸준히 관심을
        가지고 있었던 덕분에 chakra-ui/panda, TanStack/query에 기여하기도 했습니다.
      </IntroduceP>
      <IntroduceP>
        <strong>팀의 생산성을 개선하는 데에 큰 관심을 가지고 있습니다.</strong> 사내에서 Bootstrap을
        커스텀해 사용하고 있던 스타일시트 빌드 프로젝트가 지나치게 노후화돼 유지 보수에 어려움이
        있다는 점을 인지하고, Goorm Design System 모노레포로 프로젝트를 옮겨오는 작업을
        진행했습니다. 또한, GitHub Actions를 활용해 테스트 배포가 가능하도록 함으로써 DX를
        개선했습니다.
      </IntroduceP>
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
  );
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
`;

const ContactList = utld.ul`
  ml-auto
  mt-[2.5em]

  w-fit

  font-light

  [&>li+li]:ml-[1em]

  print:mt-[0.75em]
`;

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
`;

export default IntroduceSection;
