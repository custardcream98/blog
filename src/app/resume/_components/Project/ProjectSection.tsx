import { Project } from "src/types/resume";

import { ResumeLink, ResumeLinksList, ResumePeriod, S } from "..";

import { type PropsWithChildren } from "react";

function Section({ title, children }: PropsWithChildren<{ title?: string }>) {
  return (
    <S.Section>
      <S.SectionTitle>{title ?? "프로젝트"}</S.SectionTitle>
      <S.SectionItemList>{children}</S.SectionItemList>
    </S.Section>
  );
}

function Item({ title, shortDescription, stacks, links, period, team, descriptions }: Project) {
  const isStacksExist = stacks.length !== 0;
  const isDescriptionsExist = descriptions.length !== 0;

  return (
    <S.SectionItemBordered>
      <S.ProjectTitle>{title}</S.ProjectTitle>

      {team && <S.ProjectTeam>{team}</S.ProjectTeam>}

      <ResumePeriod from={period.from} to={period.to} />

      {isDescriptionsExist && (
        <S.ProjectDescriptionList>
          {descriptions.map((description) => (
            <S.ProjectDescriptionItem
              key={description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ))}
        </S.ProjectDescriptionList>
      )}

      <S.ProjectShortDescription dangerouslySetInnerHTML={{ __html: shortDescription }} />

      <ResumeLinksList>
        {links.map((link) => (
          <li key={link.name}>
            <ResumeLink {...link} />
          </li>
        ))}
      </ResumeLinksList>

      {isStacksExist && (
        <S.ProjectStacks>
          {stacks.map((stack) => (
            <S.ProjectStack key={stack}>{stack}</S.ProjectStack>
          ))}
        </S.ProjectStacks>
      )}
    </S.SectionItemBordered>
  );
}

const Projects = Object.assign(Section, {
  Item,
});

export default Projects;
