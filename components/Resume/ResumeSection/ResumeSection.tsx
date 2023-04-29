import { PropsWithChildren } from "react";
import type { ResumeSectionData } from "types/resume";
import {
  SectionItemDescriptionList,
  SectionItemP,
  SectionItemTitle,
} from "./styles";
import {
  S,
  ResumePeriod,
  ResumeLink,
  ResumeLinksList,
} from "..";
import { ProjectDescriptionList } from "../styles";

const Section = ({
  sectionTitle,
  children,
}: PropsWithChildren<{ sectionTitle: string }>) => {
  return (
    <S.Section>
      <S.SectionTitle>{sectionTitle}</S.SectionTitle>
      <S.SectionItemList>{children}</S.SectionItemList>
    </S.Section>
  );
};

const Item = ({
  title,
  links,
  period,
  descriptions,
  points,
}: ResumeSectionData) => {
  return (
    <S.SectionItem>
      <SectionItemTitle>{title}</SectionItemTitle>

      <ResumePeriod from={period.from} to={period.to} />

      {points &&
        points.map((point) => (
          <SectionItemP key={point}>{point}</SectionItemP>
        ))}

      {descriptions && (
        <SectionItemDescriptionList>
          {descriptions.map((description) => (
            <S.ProjectDescriptionItem key={description}>
              {description}
            </S.ProjectDescriptionItem>
          ))}
        </SectionItemDescriptionList>
      )}

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
};

const ResumeSection = Object.assign(Section, {
  Item,
});

export default ResumeSection;
