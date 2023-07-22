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
        <strong>기술 이야기 나누기를 아주 좋아합니다.</strong> Google Developer Student Clubs
        UOS에서 프론트엔드 팀 코어 멤버로서 활동하며 데일리 스크럼과 주기적인 테크톡을
        진행하였습니다. 프론트엔드 기술과 관련된 인사이트를 나누고 싶어 직접 60여 명이 있는
        오픈카톡방을 운영중이기도 합니다.
      </IntroduceP>
      <ContactList>
        <li>
          <ResumeLink name='custardcream@kakao.com' url='mailto:custardcream@kakao.com' />
        </li>
        <li>
          <ResumeLink name='GitHub' url='https://github.com/custardcream98' />
        </li>
        <li>
          <ResumeLink name='블로그' url='https://shiwoo.dev' />
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
  mt-[1.2rem]
  leading-[1.7]
  font-light
  tracking-[0.03rem]

  [&>strong]:(
    font-normal
    text-resume-text-strong-light
    dark:text-resume-text-strong-dark
  )
`;

const ContactList = utld.ul`
  ml-auto
  mt-10

  w-fit

  font-light

  [&>li]:inline-block
  [&>li+li]:ml-4
  [&>li:last-child]:hidden

  print:(
    mt-3
    [&>li:last-child]:inline-block
  )
`;

const ButtonWrapper = utld.aside`
  w-fit
  ml-auto
  mt-2

  [&_button]:(
    p-0
    text-resume-text-light
    dark:text-resume-text-dark
  )

  [&_button+button]:ml-4

  print:hidden
`;

export default IntroduceSection;
