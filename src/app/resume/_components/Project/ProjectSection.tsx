import { compileResumeMDX } from "src/lib/mdx"
import type { PropsWithClassName } from "src/types/props"
import { Project } from "src/types/resume"

import { ResumeLink, ResumeLinksList, ResumePeriod, S } from ".."

function Section({
  title,
  className,
  children,
}: React.PropsWithChildren<PropsWithClassName<{ title: string }>>) {
  return (
    <S.Section className={className}>
      <S.SectionTitle>{title}</S.SectionTitle>
      <S.SectionItemList>{children}</S.SectionItemList>
    </S.Section>
  )
}

async function Item({
  title,
  shortDescription,
  stacks,
  links,
  period,
  // team,
  description,
  className,
}: PropsWithClassName<Project>) {
  const isStacksExist = stacks && stacks.length !== 0
  const isLinksExist = links && links.length > 0

  const descriptionContent = description ? await compileResumeMDX(description) : null

  return (
    <S.SectionItemBordered className={className}>
      <S.ProjectTitle>{title}</S.ProjectTitle>

      {/* {!!team && <S.ProjectTeam>{team}</S.ProjectTeam>} */}

      {period && <ResumePeriod from={period.from} to={period.to} />}

      {descriptionContent}

      <S.ProjectShortDescription dangerouslySetInnerHTML={{ __html: shortDescription }} />

      {isLinksExist && (
        <ResumeLinksList>
          {links.map((link) => (
            <li key={link.url}>
              <ResumeLink {...link} />
            </li>
          ))}
        </ResumeLinksList>
      )}

      {isStacksExist && (
        <S.ProjectStacks>
          {stacks.map((stack) => (
            <S.ProjectStack key={stack}>{stack}</S.ProjectStack>
          ))}
        </S.ProjectStacks>
      )}
    </S.SectionItemBordered>
  )
}

const Projects = Object.assign(Section, {
  Item,
})

export default Projects
