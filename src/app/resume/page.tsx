import { CareersSection, IntroduceSection, ProjectSection, ResumeSection, S } from "./_components";

import "./style.css";

import { careers, educations, experiences, opensources, projects } from "fixtures/resume";
import { utld } from "utility-class-components";

export { metadata } from "./metadata";

export default function ResumePage() {
  return (
    <S.Container>
      <MainTitle>
        <span className='line'>안녕하세요,</span>
        {
          <strong className='text-gradient-intro animate-bg-gradient font-semibold print:animate-none'>
            주니어 프론트엔드 개발자 박시우
          </strong>
        }
        입니다.
      </MainTitle>
      <IntroduceSection />
      <ProjectSection title='프로젝트' className='print:mt-44'>
        {projects.map((project) => (
          <ProjectSection.Item key={project.title} {...project} />
        ))}
      </ProjectSection>
      <ProjectSection title='오픈소스 컨트리뷰션' className='print:mt-24'>
        {opensources.map((opensource) => (
          <ProjectSection.Item key={opensource.title} {...opensource} />
        ))}
      </ProjectSection>
      <CareersSection className='print:mt-24'>
        {careers.map((career) => (
          <CareersSection.Item key={career.company} {...career} />
        ))}
      </CareersSection>
      <ResumeSection sectionTitle='경험' className=' print:break-inside-avoid'>
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
