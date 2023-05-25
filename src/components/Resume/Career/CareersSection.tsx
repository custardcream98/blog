import type { Career } from "src/types/resume";

import { ResumeLink, ResumeLinksList, ResumePeriod, S } from "..";

import { PropsWithChildren } from "react";

function Section({ children }: PropsWithChildren) {
  return (
    <S.Section>
      <S.SectionTitle>경력</S.SectionTitle>
      <S.SectionItemList>{children}</S.SectionItemList>
    </S.Section>
  );
}

function Item({ company, period, position, shortDescription, descriptions, links }: Career) {
  return (
    <S.SectionItemBordered>
      <S.ProjectTitle>{company}</S.ProjectTitle>
      <ResumePeriod {...period} />
      <S.ProjectShortDescription>{position}</S.ProjectShortDescription>
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
    </S.SectionItemBordered>
  );
}

const CareersSection = Object.assign(Section, { Item });

export default CareersSection;
