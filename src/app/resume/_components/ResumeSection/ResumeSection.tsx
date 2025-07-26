import type { ResumeSectionData } from "@/app/resume/_types"

import { ResumeLink, ResumeLinksList, ResumePeriod, S } from ".."
import { SectionItemDescriptionList, SectionItemP, SectionItemTitle } from "./styles"

type PropsWithClassName<T> = T & {
  className?: string
}

function Section({
  sectionTitle,
  className,
  children,
}: React.PropsWithChildren<PropsWithClassName<{ sectionTitle: string }>>) {
  return (
    <S.Section className={className}>
      <S.SectionTitle>{sectionTitle}</S.SectionTitle>
      <S.SectionItemList>{children}</S.SectionItemList>
    </S.Section>
  )
}

function Item({ title, links, period, descriptions, points }: ResumeSectionData) {
  const isDescriptionsExist = !!descriptions && descriptions.length !== 0
  const isPointsExist = !!points && points.length !== 0
  const isLinksExist = !!links && links.length !== 0

  return (
    <S.SectionItem className='break-inside-avoid'>
      <SectionItemTitle>{title}</SectionItemTitle>

      <ResumePeriod from={period.from} to={period.to} />

      {isDescriptionsExist && (
        <SectionItemDescriptionList>
          {descriptions.map((description) => (
            <S.ProjectDescriptionItem key={description}>{description}</S.ProjectDescriptionItem>
          ))}
        </SectionItemDescriptionList>
      )}

      {isPointsExist && points.map((point) => <SectionItemP key={point}>{point}</SectionItemP>)}

      {isLinksExist && (
        <ResumeLinksList>
          {links.map((link) => (
            <li key={link.name}>
              <ResumeLink {...link} />
            </li>
          ))}
        </ResumeLinksList>
      )}
    </S.SectionItem>
  )
}

const ResumeSection = Object.assign(Section, {
  Item,
})

export default ResumeSection
