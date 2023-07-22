import type { ResumeSectionData } from "src/types/resume";

import { ResumeLink, ResumeLinksList, ResumePeriod, S } from "..";

import { SectionItemDescriptionList, SectionItemP, SectionItemTitle } from "./styles";

import { type PropsWithChildren } from "react";

function Section({
  sectionTitle,
  className,
  children,
}: PropsWithChildren<{ sectionTitle: string; className?: string }>) {
  return (
    <S.Section className={className}>
      <S.SectionTitle>{sectionTitle}</S.SectionTitle>
      <S.SectionItemList>{children}</S.SectionItemList>
    </S.Section>
  );
}

function Item({ title, links, period, descriptions, points }: ResumeSectionData) {
  return (
    <S.SectionItem>
      <SectionItemTitle>{title}</SectionItemTitle>

      <ResumePeriod from={period.from} to={period.to} />

      {descriptions && (
        <SectionItemDescriptionList>
          {descriptions.map((description) => (
            <S.ProjectDescriptionItem key={description}>{description}</S.ProjectDescriptionItem>
          ))}
        </SectionItemDescriptionList>
      )}

      {points && points.map((point) => <SectionItemP key={point}>{point}</SectionItemP>)}

      {links && (
        <ResumeLinksList>
          {links.map((link) => (
            <li key={link.name}>
              <ResumeLink {...link} />
            </li>
          ))}
        </ResumeLinksList>
      )}
    </S.SectionItem>
  );
}

const ResumeSection = Object.assign(Section, {
  Item,
});

export default ResumeSection;
