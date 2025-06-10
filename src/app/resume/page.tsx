import { CareersSection, IntroduceSection, ProjectSection, ResumeSection, S } from "./_components"

import "./style.css"

import {
  careers,
  educations,
  experiences,
  // opensources,
  projects,
} from "fixtures/resume"
import { utld } from "utility-class-components"

export { metadata } from "./metadata"

export default function ResumePage() {
  return (
    <S.Container className='resume-container'>
      <MainTitle>
        <span className='line'>안녕하세요,</span>
        <strong className='text-gradient-intro animate-bg-gradient font-semibold print:animate-none'>
          프론트엔드 개발자 박시우
        </strong>
        입니다.
      </MainTitle>

      <IntroduceSection />

      <CareersSection className='print:pt-2'>
        {careers.map((career) => (
          <CareersSection.Item key={career.company} {...career} />
        ))}
      </CareersSection>

      <ProjectSection title='프로젝트 및 오픈소스 활동' className='print:mt-10'>
        {projects.map((project) => (
          <ProjectSection.Item
            key={project.title}
            className='print:break-inside-avoid'
            {...project}
          />
        ))}
      </ProjectSection>

      {/* <ProjectSection title='오픈소스 컨트리뷰션' className='break-inside-avoid'>
        {opensources.map((opensource, index) => (
          <ProjectSection.Item
            key={opensource.title}
            className={[1].includes(index) ? "print:!mt-[4em]" : ""}
            {...opensource}
          />
        ))}
      </ProjectSection> */}

      <ResumeSection sectionTitle='경험'>
        {experiences.map((experience) => (
          <ResumeSection.Item key={experience.title} {...experience} />
        ))}
      </ResumeSection>

      <ResumeSection sectionTitle='교육 및 자격증' className='print:!mb-0'>
        {educations.map((educations) => (
          <ResumeSection.Item key={educations.title} {...educations} />
        ))}
      </ResumeSection>
    </S.Container>
  )
}

const MainTitle = utld.h2`
  text-[2em]
  font-light
  leading-[1.5]

  break-keep

  print:(
    text-[1.5em]
    mt-[1cm]
  )

  [&>.line]:block
`
