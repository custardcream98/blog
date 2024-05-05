import { POSTS_SECTION_ID } from "src/app/constants"
import { LogoTitleSpan } from "src/components"
import { IconButton, ResponsiveIconButton } from "src/components/client"
import { LogoSvg } from "src/components/Svgs"

import { DarkmodeSwitch } from "./DarkmodeSwitch"
import { NavList } from "./NavList"

import Link from "next/link"
import React, { useEffect } from "react"
import { HiSearch } from "react-icons/hi"
import { RxHamburgerMenu } from "react-icons/rx"
import { utld } from "utility-class-components"

function NavigationBarPresentational({
  onSearchButtonClick,
  isMobileHamburgerMenuOpened,
  onMobileHamburgerMenuButtonClick,
}: {
  onSearchButtonClick: React.MouseEventHandler<HTMLButtonElement>
  isMobileHamburgerMenuOpened: boolean
  onMobileHamburgerMenuButtonClick: () => void
}) {
  /**
   * Prevent scrolling when the mobile hamburger menu is opened.
   */
  useEffect(() => {
    if (!isMobileHamburgerMenuOpened) return

    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileHamburgerMenuOpened, onMobileHamburgerMenuButtonClick])

  return (
    <Nav>
      <Link href='/'>
        <H1>
          <LogoSvg className='h-4 w-4 text-default-light dark:text-default-dark' />
          <LogoTitleSpan className='ml-[0.4375rem]' />
          <span className='sr-only'>: FE 개발자 박시우의 기술 블로그</span>
        </H1>
      </Link>
      <IconButton
        type='button'
        className='hidden mobile:block'
        icon={RxHamburgerMenu}
        title='메뉴 열기 버튼입니다.'
        onClick={onMobileHamburgerMenuButtonClick}
      />
      <MenuWrapper $isMenuOpened={isMobileHamburgerMenuOpened}>
        <NavList
          onClick={isMobileHamburgerMenuOpened ? onMobileHamburgerMenuButtonClick : undefined}
          className='mobile:order-3 mobile:flex-col mobile:items-end mobile:gap-4'
        >
          <NavList.Item href={`/#${POSTS_SECTION_ID}`}>Posts</NavList.Item>
          <NavList.Item href='/categories'>Categories</NavList.Item>
          <NavList.Item href='/series'>Series</NavList.Item>
          <NavList.Item href='/resume'>About</NavList.Item>
        </NavList>
        <ResponsiveIconButton
          className='ml-1 mobile:order-1'
          title='검색 버튼입니다.'
          type='button'
          mobileSize='22px'
          desktopSize='25px'
          icon={HiSearch}
          onClick={onSearchButtonClick}
        />
        <DarkmodeSwitch className='absolute right-[-2.1875rem] mobile:relative mobile:right-0 mobile:order-2' />
      </MenuWrapper>
    </Nav>
  )
}

export const NavigationBar = React.memo(NavigationBarPresentational)

const Nav = utld.nav`
  relative
  
  h-nav
  w-[85vw]
  max-w-800
  flex
  justify-between
  items-center

  mobile:w-[90vw]
`

const H1 = utld.h1`
  flex
  justify-start
  items-center
`

const MenuWrapper = utld.div<{
  $isMenuOpened: boolean
}>`
  flex

  mobile:(
    py-4
    pr-[5vw]

    fixed
    top-nav
    -right-full
    
    h-full
    w-full

    bg-nav-bg-no-transparent-light
    dark:bg-nav-bg-no-transparent-dark

    transition-transform
    duration-500
    ease-in-out
    transform

    flex-col

    items-end

    gap-4
  )

  ${(props) => (props.$isMenuOpened ? "mobile:-translate-x-full" : "mobile:translate-x-0")}
`
