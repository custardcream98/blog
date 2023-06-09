import { Project } from "src/types/resume";

import { ResumeLink, ResumeLinksList, ResumePeriod, S } from "..";

import { type PropsWithChildren } from "react";

function Section({ children }: PropsWithChildren) {
  return (
    <S.Section>
      <S.SectionTitle>프로젝트</S.SectionTitle>
      <S.SectionItemList>{children}</S.SectionItemList>
    </S.Section>
  );
}

function Item({ title, shortDescription, stacks, links, period, team, descriptions }: Project) {
  return (
    <S.SectionItemBordered>
      <S.ProjectTitle>{title}</S.ProjectTitle>

      <S.ProjectTeam>{team}</S.ProjectTeam>

      <ResumePeriod from={period.from} to={period.to} />

      <S.ProjectShortDescription>{shortDescription}</S.ProjectShortDescription>

      <S.ProjectDescriptionList>
        {descriptions.map((description) => (
          <S.ProjectDescriptionItem key={description}>{description}</S.ProjectDescriptionItem>
        ))}
      </S.ProjectDescriptionList>

      <ResumeLinksList>
        {links.map((link) => (
          <li key={link.name}>
            <ResumeLink {...link} />
          </li>
        ))}
      </ResumeLinksList>

      <S.ProjectStacks>
        {stacks.map((stack) => (
          <S.ProjectStack key={stack}>{stack}</S.ProjectStack>
        ))}
      </S.ProjectStacks>
    </S.SectionItemBordered>
  );
}

const Projects = Object.assign(Section, {
  Item,
});

export default Projects;