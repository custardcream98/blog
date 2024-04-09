import { Container as DefaultContainer } from "src/components";

import { ud, utld } from "utility-class-components";

export const Container = utld(DefaultContainer)`
  !items-start

  pt-[6em]

  print:(
    pt-0
    pb-[2em]
  )
`;

export const Section = utld.section`
  my-[4em]
  text-resume-text-light
  dark:text-resume-text-dark
  w-full

  print:(
    my-[1.5em]
    text-resume-text-print
  )
`;

export const SectionTitle = utld.h3`
  text-[1.7em]
  font-semibold
  mb-[1.7em]

  print:(
    text-[1.3em]
    mb-[1.3em]
  )
`;

export const SectionItemList = utld.ul``;

export const SectionItem = utld.li`
  mt-[3em]
  [&+&]:mt-[7em]

  print:(
    mt-[1em]
    [&+&]:mt-[2em]
    relative
    break-inside-avoid
  )
`;

export const SectionItemBordered = utld(SectionItem)`
  pl-[1em]
  border-l
  border-solid
  border-[#ccc]
`;

export const ProjectTitle = utld.h4`
  text-[1.3em]
  font-normal
  mb-[0.5em]

  break-keep
  leading-[1.2]

  print:(
    text-[1.1em]
    mb-[0.25em]
  )
`;

export const dimTextStyle = ud`
  text-[0.9em]
  font-light

  tracking-[0.02em]

  text-resume-text-dim-light
  dark:text-resume-text-dim-dark
`;

export const ProjectTeam = utld.span`
  ${dimTextStyle}

  block
  mb-[0.2em]
  break-keep
  leading-[1.2]
`;

export const ProjectShortDescription = utld.p`
  mt-[1.5em]

  font-light

  leading-[1.6]

  tracking-[0.04em]

  [&_strong]:(
    text-resume-text-strong-light
    dark:text-resume-text-strong-dark
  )

  print:mt-[0.75em]
`;

export const ProjectDescriptionList = utld.ul`
  mt-[1em]

  font-light

  tracking-[0.03em]
  leading-[1.5]

  print:mt-[0.75em]

  marker:(
    content-['-']

    text-[1em]
    font-semibold

    text-resume-accent-light
    dark:text-resume-accent-dark
  )

  [&_strong]:(
    text-resume-text-strong-light
    dark:text-resume-text-strong-dark
  )
`;

export const ProjectDescriptionItem = utld.li`
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
    font-d2coding
    text-resume-text-strong-light
    dark:text-resume-text-strong-dark
  )
`;

export const ProjectStacks = utld.ul`
  flex
  flex-wrap
  gap-[0.3125em]
`;

export const ProjectStack = utld.li`
  font-light
  text-[0.9em]

  py-[0.2em]
  px-[0.4em]

  rounded-[0.2em]

  text-resume-badge-text-light
  dark:text-resume-badge-text-dark

  bg-resume-badge-bg-light
  dark:bg-resume-badge-bg-dark
`;
