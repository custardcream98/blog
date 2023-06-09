import { ProjectDescriptionList } from "../styles";

import { utld } from "utility-class-components";

export const SectionItemP = utld.p`
  font-light
  text-[0.9rem]
  leading-[1.5]
  tracking-[0.03rem]

  mt-4
  [&+&]:mt-[0.2rem]

  last-of-type:mb-4

  print:(
    mt-2
    last-of-type:mb-2
  )
`;

export const SectionItemTitle = utld.h3`
  text-[1.3rem]
  font-normal
  leading-[1.2]
  
  mt-[0.8rem]
  mb-2

  break-keep
`;

export const SectionItemDescriptionList = utld(ProjectDescriptionList)`
  !mt-2

  print:!mt-0
`;
