import { utld } from "utility-class-components"

import { ProjectDescriptionList } from "../styles"

export const SectionItemP = utld.p`
  font-light
  text-[0.9em]
  leading-[1.5]
  tracking-[0.03em]

  mt-4
  [&+&]:mt-[0.2em]

  last-of-type:mb-4

  print:(
    mt-2
    last-of-type:mb-2
  )
`

export const SectionItemTitle = utld.h4`
  text-[1.3em]
  font-normal
  mb-[0.5em]

  break-keep
  leading-[1.2]

  print:(
    text-[1.1em]
    mb-[0.25em]
  )
`

export const SectionItemDescriptionList = utld(ProjectDescriptionList)`
  !mt-2

  print:!mt-0
`
