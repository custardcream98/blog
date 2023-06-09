import { CareersSection, IntroduceSection, ProjectSection, ResumeSection, S } from "./_components";

import { careers, educations, experiences, projects } from "fixtures/resume";
import { type Metadata } from "next";
import { utld } from "utility-class-components";

const META_TITLE = "개발자 박시우 이력서";
const META_DESCRIPTION =
  "안녕하세요, 삽질 좋아하는 개발자 박시우입니다. 문제가 생기면 밤을 새서라도 알아내고 해결합니다.";

export const metadata: Metadata = {
  description: META_DESCRIPTION,
  openGraph: {
    description: META_DESCRIPTION,
    title: META_TITLE,
    url: "/resume",
  },
  title: META_TITLE,

  twitter: {
    description: META_DESCRIPTION,
    title: META_TITLE,
  },
};

export default function ResumePage() {
  return (
    <S.Container>
      <MainTitle>
        <span className='line'>안녕하세요,</span>
        {
          <strong className='text-gradient-intro animate-bg-gradient font-semibold'>
            주니어 프론트엔드 개발자 박시우
          </strong>
        }
        입니다.
      </MainTitle>
      <IntroduceSection />
      <CareersSection>
        {careers.map((career) => (
          <CareersSection.Item key={career.company} {...career} />
        ))}
      </CareersSection>
      <ProjectSection>
        {projects.map((project) => (
          <ProjectSection.Item key={project.title} {...project} />
        ))}
      </ProjectSection>
      <ResumeSection sectionTitle='경험'>
        {experiences.map((experience) => (
          <ResumeSection.Item key={experience.title} {...experience} />
        ))}
      </ResumeSection>
      <ResumeSection sectionTitle='교육 및 자격증'>
        {educations.map((educations) => (
          <ResumeSection.Item key={educations.title} {...educations} />
        ))}
      </ResumeSection>
    </S.Container>
  );
}

const MainTitle = utld.h2`
  text-[2rem]
  font-light
  leading-[1.5]

  break-keep

  print:(
    text-[1.5rem]
    mt-[1cm]
  )

  [&>.line]:block
`;
