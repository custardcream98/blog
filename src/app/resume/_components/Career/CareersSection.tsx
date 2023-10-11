import type { PropsWithClassName } from "src/types/props";
import type { Career } from "src/types/resume";

import { ResumeLink, ResumeLinksList, ResumePeriod, S } from "..";

function Section({ className, children }: React.PropsWithChildren<PropsWithClassName>) {
  return (
    <S.Section className={className}>
      <S.SectionTitle>경력</S.SectionTitle>
      <S.SectionItemList>{children}</S.SectionItemList>
    </S.Section>
  );
}

function Item({ company, period, position, shortDescription, descriptions, links }: Career) {
  const isLinksExist = links.length !== 0;

  return (
    <S.SectionItemBordered className='print:[&+&]:!mt-[4em]'>
      <S.ProjectTitle>{company}</S.ProjectTitle>

      <ResumePeriod {...period} />

      <S.ProjectShortDescription className='!mt-[0.25rem]'>{position}</S.ProjectShortDescription>

      <S.ProjectDescriptionList>
        {descriptions.map((description) => (
          <S.ProjectDescriptionItem
            key={description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ))}
      </S.ProjectDescriptionList>

      {shortDescription && (
        <S.ProjectShortDescription dangerouslySetInnerHTML={{ __html: shortDescription }} />
      )}

      {isLinksExist && (
        <ResumeLinksList>
          {links.map((link) => (
            <li key={link.name}>
              <ResumeLink {...link} />
            </li>
          ))}
        </ResumeLinksList>
      )}
    </S.SectionItemBordered>
  );
}

const CareersSection = Object.assign(Section, { Item });

export default CareersSection;
