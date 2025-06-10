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
  stacks,
  // links
}: Career) {
  // const isLinksExist = links.length !== 0
  const isStacksExist = stacks && stacks.length !== 0
  const isDescriptionsExist = descriptions.length !== 0

  return (
    <S.SectionItemBordered
      className={ud`${[
        "gap-x-3 print:grid print:grid-cols-[1fr_2fr] resume:grid resume:grid-cols-[1fr_3fr]",
        "print:[&+&]:!mt-[2em]",
        "break-inside-avoid",
      ]}`}
    >
      <div>
        <S.ProjectTitle>{company}</S.ProjectTitle>

        <ResumePeriod {...period} />

        <S.ProjectShortDescription className='!mt-[0.25rem]'>{position}</S.ProjectShortDescription>

        {isStacksExist && (
          <S.ProjectStacks>
            {stacks.map((stack) => (
              <S.ProjectStack key={stack}>{stack}</S.ProjectStack>
            ))}
          </S.ProjectStacks>
        )}
      </div>

      {isDescriptionsExist && (
        <Ul>
          {descriptions.map((description) =>
            typeof description === "string" ? (
              <Li key={description} dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
              <Li key={description[0]}>
                <span dangerouslySetInnerHTML={{ __html: description[0] }}></span>
                <Ul>
                  {description[1].map((d) => (
                    <Li key={d} dangerouslySetInnerHTML={{ __html: d }} />
                  ))}
                </Ul>
              </Li>
            ),
          )}
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
  font-light 
  leading-[1.5] 
  tracking-[0.03em] 

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
