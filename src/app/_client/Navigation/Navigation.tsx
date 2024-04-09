import { useWindowScrollEvent } from "src/hook";

import { Searchbar } from "../Searchbar";

import { NavigationBar } from "./NavigationBar";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ud, utld } from "utility-class-components";

const NAVIGATION_HEIGHT = 50; // px
const SCROLL_THRESHOLD = 25; // 0 ~ 50

export function Navigation() {
  const [isSearchbarOn, setIsSearchbarOn] = useState(false);
  const toggleSearchbar = useCallback(() => setIsSearchbarOn((prev) => !prev), []);

  const pathname = usePathname();
  const isPostRoute = useMemo(() => /\/posts\//g.test(pathname ?? ""), [pathname]);

  const lastScrollTopRef = useRef(0);
  const [isNavbarOn, setIsNavbarOn] = useState(true);
  useEffect(() => {
    if (!isPostRoute) {
      setIsNavbarOn(true);
      lastScrollTopRef.current = 0;
    }
  }, [isPostRoute]);

  const handleWindowScroll = useCallback(() => {
    const { scrollTop: currentScrollTop } = window.document.documentElement;

    if (currentScrollTop < NAVIGATION_HEIGHT) {
      return setIsNavbarOn(true);
    }

    if (lastScrollTopRef.current < currentScrollTop) {
      setIsNavbarOn(false);
    } else if (lastScrollTopRef.current - SCROLL_THRESHOLD > currentScrollTop) {
      setIsNavbarOn(true);
    }

    lastScrollTopRef.current = currentScrollTop;
  }, []);

  useWindowScrollEvent({
    disabled: !isPostRoute,
    onScroll: handleWindowScroll,
  });

  const [isMobileHamburgerMenuOpened, setIsMobileHamburgerMenuOpened] = useState(false);

  const handleMobileHamburgerMenuButtonClick = useCallback(
    () => setIsMobileHamburgerMenuOpened((prev) => !prev),
    [],
  );

  const handleSearchResultClick = useCallback(() => {
    setIsMobileHamburgerMenuOpened(false);
    setIsSearchbarOn(false);
  }, []);

  return (
    <Header>
      <Container $isNavbarOn={isNavbarOn}>
        <NavigationBar
          onSearchButtonClick={toggleSearchbar}
          isMobileHamburgerMenuOpened={isMobileHamburgerMenuOpened}
          onMobileHamburgerMenuButtonClick={handleMobileHamburgerMenuButtonClick}
        />
        <Searchbar
          isSearchbarOn={isSearchbarOn}
          onSearchbarClose={toggleSearchbar}
          onSearchResultClick={handleSearchResultClick}
        />
      </Container>
    </Header>
  );
}

const Header = utld.header`
  h-nav
  w-full
  print:hidden
`;

const Container = utld.div<{
  $isNavbarOn: boolean;
}>`
  w-full

  fixed

  z-[101]
  flex
  justify-center
  items-center

  transition-transform
  duration-300
  
  before:(
    absolute
    inset-0
    bg-nav-bg-light
    dark:bg-nav-bg-dark
    backdrop-blur
    -z-10
  )

  ${({ $isNavbarOn }) =>
    !$isNavbarOn &&
    ud`
      translate-y-[-3.125rem]
    `}
`;
