import {
  careers,
  educations,
  experiences,
  projects,
} from "_resume";
import Meta from "components/Layout/Meta";
import {
  IntroduceSection,
  ProjectSection,
  CareersSection,
  S,
  ResumeSection,
} from "components/Resume";

const Resume = () => {
  return (
    <>
      <Meta
        type="default"
        title="개발자 박시우 이력서"
        description="안녕하세요, 삽질 좋아하는 개발자 박시우입니다. 문제가 생기면 밤을 새서라도 알아내고 해결합니다."
      />
      <S.Container>
        <S.MainTitle>
          <span className="line">안녕하세요,</span>
          <strong className="strong">
            주니어 프론트엔드 개발자 박시우
          </strong>
          입니다.
        </S.MainTitle>

        <IntroduceSection />

        <CareersSection>
          {careers.map((career) => (
            <CareersSection.Item
              key={career.company}
              {...career}
            />
          ))}
        </CareersSection>

        <ProjectSection>
          {projects.map((project) => (
            <ProjectSection.Item
              key={project.title}
              {...project}
            />
          ))}
        </ProjectSection>

        <ResumeSection sectionTitle="경험">
          {experiences.map((experience) => (
            <ResumeSection.Item
              key={experience.title}
              {...experience}
            />
          ))}
        </ResumeSection>

        <ResumeSection sectionTitle="교육 및 자격증">
          {educations.map((educations) => (
            <ResumeSection.Item
              key={educations.title}
              {...educations}
            />
          ))}
        </ResumeSection>
      </S.Container>
    </>
  );
};

export default Resume;
