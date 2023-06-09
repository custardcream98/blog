import { Container as DefaultContainer } from "src/components/Common";

import { ud, utld } from "utility-class-components";

export const Container = utld(DefaultContainer)`
  !items-start

  pt-24

  print:(
    pt-0
    pb-8
  )
`;

export const Section = utld.section`
  my-16
  text-resume-text-light
  dark:text-resume-text-dark

  print:(
    my-8
    w-full
    last:break-inside-avoid-page
  )
`;

export const SectionTitle = utld.h3`
  text-[1.7rem]
  font-semibold
  mb-[1.7rem]
`;

export const SectionItemList = utld.ul``;

export const SectionItem = utld.li`
  mt-12
  [&+&]:mt-28

  print:(
    mt-8
    [&+&]:mt-8
    relative
    break-inside-avoid
  )
`;

export const SectionItemBordered = utld(SectionItem)`
  pl-4
  border-l
  border-solid
  border-[#ccc]
`;

export const ProjectTitle = utld.h4`
  text-[1.1rem]
  font-normal
  mb-2

  break-keep
  leading-[1.2]
`;

export const dimTextStyle = ud`
  text-[0.9rem]
  font-light

  tracking-[0.02rem]

  text-resume-text-dim-light
  dark:text-resume-text-dim-dark
`;

export const ProjectTeam = utld.span`
  ${dimTextStyle}

  block
  mb-[0.2rem]
  break-keep
  leading-[1.2]
`;

export const ProjectShortDescription = utld.p`
  mt-4

  font-light
  text-[0.9rem]

  leading-[1.6]

  tracking-[0.04rem]
`;

export const ProjectDescriptionList = utld.ul`
  mt-6

  font-light
  text-[0.9rem]

  tracking-[0.03rem]
  leading-[1.5]

  print:mt-2

  marker:(
    content-['-']

    text-[1rem]
    font-semibold

    text-resume-accent-light
    dark:text-resume-accent-dark
  )
`;

export const ProjectDescriptionItem = utld.li`
  my-[0.4rem]
  ml-[0.4rem]
  pl-[0.6rem]

  print:(
    my-[0.2rem]
    ml-[0.2rem]
  )
`;

export const ProjectStacks = utld.ul`
  flex
  flex-wrap
  gap-[0.3125rem]
`;

export const ProjectStack = utld.li`
  font-light
  text-[0.8rem]

  py-[0.2rem]
  px-[0.4rem]

  rounded-[0.2rem]

  text-resume-badge-text-light
  dark:text-resume-badge-text-dark

  bg-resume-badge-bg-light
  dark:bg-resume-badge-bg-dark
`;
