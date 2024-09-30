import type { PropsWithClassName } from "src/types/props"
import type { Career } from "src/types/resume"

import {
  // ResumeLink, ResumeLinksList,
  ResumePeriod,
  S,
} from ".."

import { ud, utld } from "utility-class-components"

function Section({ className, children }: React.PropsWithChildren<PropsWithClassName>) {
  return (
    <S.Section className={className}>
      <S.SectionTitle>경력</S.SectionTitle>
      <S.SectionItemList>{children}</S.SectionItemList>
    </S.Section>
  )
}

function Item({
  company,
  period,
  position,
  // shortDescription,
  descriptions,
  // links
}: Career) {
  // const isLinksExist = links.length !== 0
  const isDescriptionsExist = descriptions.length !== 0

  return (
    <S.SectionItemBordered className='resume:flex flex-row justify-between print:flex print:[&+&]:!mt-[2em]'>
      <div>
        <S.ProjectTitle>{company}</S.ProjectTitle>

        <ResumePeriod {...period} />

        <S.ProjectShortDescription className='!mt-[0.25rem]'>{position}</S.ProjectShortDescription>
      </div>

      {isDescriptionsExist && (
        <Ul>
          {descriptions.map((description) => (
            <Li
              key={description}
              className={ud``}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ))}
        </Ul>
      )}

      {/* {!!shortDescription && (
        <S.ProjectShortDescription dangerouslySetInnerHTML={{ __html: shortDescription }} />
      )} */}

      {/* {isLinksExist && (
        <ResumeLinksList>
          {links.map((link) => (
            <li key={link.name}>
              <ResumeLink {...link} />
            </li>
          ))}
        </ResumeLinksList>
      )} */}
    </S.SectionItemBordered>
  )
}

const Ul = utld.ul`
  resume:text-right 
  print:text-right 

  font-light 
  leading-[1.5] 
  tracking-[0.03em] 
  print:mt-[0.75em]

  resume:marker:(
    content-none
  )

  print:marker:(
    content-none
  )

  marker:(
    content-['-']

    text-[1em]
    font-semibold

    text-resume-accent-light
    dark:text-resume-accent-dark
  )
`

const Li = utld.li`
  my-[0.4em]
  ml-[0.4em]
  pl-[0.6em]

  print:(
    my-[0.2em]
    ml-[0.3em]
  )

  [&_strong]:(
    text-resume-text-strong-light
    dark:text-resume-text-strong-dark
  )

  [&_code]:(
    font-normal
    text-resume-text-strong-light
    dark:text-resume-text-strong-dark
  )
`

const CareersSection = Object.assign(Section, { Item })

export default CareersSection
