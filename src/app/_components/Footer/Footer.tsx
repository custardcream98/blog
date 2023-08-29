import { LinkDecorated, LogoTitleSpan } from "src/components";

import { utld } from "utility-class-components";

const Container = utld.footer`
  print:hidden

  w-[85vw]
  max-w-800

  flex
  justify-between
  items-center

  text-[0.9rem]
  font-light
  mt-20
  mb-8
  mx-auto

  mobile:(
    flex-col
    items-start

    text-[0.6875rem]
    mt-12

    w-[90vw]
  )
`;

const Small = utld.small`
  text-default-sub-light
  dark:text-default-sub-dark
`;

const Address = utld.address`
  mobile:mt-[0.7rem]
`;

const AddressUl = utld.ul`
  flex

  [&>li]:(
    text-default-sub-light
    dark:text-default-sub-dark
    text-inherit
  )

  [&>li+li]:pl-[0.7rem]
`;

export function Footer() {
  const YEAR = new Date().getFullYear();

  return (
    <Container>
      <Small>
        <LogoTitleSpan className='mb-[0.3rem] block' />
        &copy; {YEAR} custardcream98. All rights reserved.
      </Small>
      <Address>
        <AddressUl>
          <li>
            <LinkDecorated href='https://github.com/custardcream98' target='_blank'>
              GitHub
            </LinkDecorated>
          </li>
          <li>
            <LinkDecorated
              href='https://www.linkedin.com/in/shi-woo-park-668b33147/'
              target='_blank'
            >
              LinkedIn
            </LinkDecorated>
          </li>
          <li>
            <LinkDecorated href='mailto:custardcream@kakao.com' target='_blank'>
              Email
            </LinkDecorated>
          </li>
          <li>
            <LinkDecorated href='/rss.xml' target='_blank'>
              RSS
            </LinkDecorated>
          </li>
        </AddressUl>
      </Address>
    </Container>
  );
}
