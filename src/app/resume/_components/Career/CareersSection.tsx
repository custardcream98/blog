import type { Career } from "src/types/resume";

import { ResumeLink, ResumeLinksList, ResumePeriod, S } from "..";

import { type PropsWithChildren } from "react";

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

      <S.ProjectShortDescription className='!mt-1'>{position}</S.ProjectShortDescription>

      <S.ProjectDescriptionList>
        {descriptions.map((description) => (
          <S.ProjectDescriptionItem
            key={description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ))}
      </S.ProjectDescriptionList>

      <S.ProjectShortDescription dangerouslySetInnerHTML={{ __html: shortDescription }} />

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
