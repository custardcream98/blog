"use client";

import useSearchResults from "src/hook/useSearchResults";

import SearchbarCloseButton from "./SearchbarCloseButton";
import SearchResults from "./SearchResults";

import {
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { RiCloseFill } from "react-icons/ri";
import { utld } from "utility-class-components";

const TRANSITION_DURATION = 200;

type SearchbarStyleProps = {
  isSearchbarOn: boolean;
};

const SearchbarContainer = utld.form<SearchbarStyleProps>`
  w-full
  h-full

  absolute
  right-0

  z-[101]

  transition-all
  duration-[200ms]

  ${({ isSearchbarOn }) => (isSearchbarOn ? "" : "translate-y-[-105%]")}

  bg-bg-light
  dark:bg-bg-dark
`;

const SearchbarInput = utld.input`
  w-full
  h-4/5

  px-5

  font-sans
  font-normal
  text-base
  border-none

  rounded-full
  bg-post-element-bg-light
  dark:bg-post-element-bg-dark

  text-default-light
  dark:text-default-dark

  mr-[1.875rem]

  focus:outline-none
`;

const SearchbarWrapper = utld.div`
  relative

  w-[90vw]
  max-w-800
  h-full
  m-auto

  flex
  justify-center
  items-center
`;

type Props = {
  isSearchbarOn: boolean;
  onSearchbarClose: () => void;
};

export function Searchbar({ isSearchbarOn, onSearchbarClose }: Props) {
  const [searchInput, setSearchInput] = useState("");
  const { searchResults, clearSearchedResults } = useSearchResults(searchInput);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchbarContainerRef = useRef<HTMLFormElement>(null);
  const buttonCloseSearchbarRef = useRef<HTMLButtonElement>(null);

  const isResultExists = searchResults.length !== 0;

  const openSearchbarCallback = () => {
    if (!isSearchbarOn) {
      return;
    }
    const focusTimeout = setTimeout(() => inputRef.current?.focus(), TRANSITION_DURATION);
    return () => clearTimeout(focusTimeout);
  };

  useEffect(openSearchbarCallback, [isSearchbarOn]);

  const closeResults = useCallback(() => {
    setSearchInput("");
    clearSearchedResults();
    onSearchbarClose();
  }, [clearSearchedResults, onSearchbarClose]);

  const onSearchFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      clearSearchedResults();
      setSearchInput(event.currentTarget.value);
    },
    [clearSearchedResults],
  );

  const handleTabArrow = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    if (key !== "Tab" && key !== "ArrowUp" && key !== "ArrowDown") {
      return;
    }
    event.preventDefault();

    const tabIterables = [
      inputRef.current,
      buttonCloseSearchbarRef.current,
      ...Array.from<HTMLAnchorElement>(
        searchbarContainerRef.current?.querySelectorAll(
          ".result-link",
        ) as NodeListOf<HTMLAnchorElement>,
      ),
    ];

    const currentFocusIndex = tabIterables.indexOf(document.activeElement as HTMLInputElement);

    if (currentFocusIndex === -1) {
      return;
    }

    if (key === "ArrowUp") {
      tabIterables[
        currentFocusIndex === 0 ? tabIterables.length - 1 : currentFocusIndex - 1
      ]?.focus();
    } else {
      tabIterables[
        currentFocusIndex === tabIterables.length - 1 ? 0 : currentFocusIndex + 1
      ]?.focus();
    }
  }, []);

  return (
    <SearchbarContainer
      ref={searchbarContainerRef}
      autoComplete='off'
      onSubmit={onSearchFormSubmit}
      onKeyDown={handleTabArrow}
      isSearchbarOn={isSearchbarOn}
    >
      <label className='sr-only' htmlFor='search'>
        검색어 입력란
      </label>
      <SearchbarWrapper>
        <SearchbarInput
          ref={inputRef}
          id='search'
          type='text'
          placeholder='검색어를 입력해주세요.'
          required
          spellCheck='false'
          autoComplete='off'
          onChange={onInputChange}
          value={searchInput}
        />
        <SearchbarCloseButton
          ref={buttonCloseSearchbarRef}
          title='검색바 닫기'
          icon={RiCloseFill}
          mobileSize='22px'
          desktopSize='26px'
          onClick={closeResults}
          hidden={!isSearchbarOn}
        />
        {isResultExists && (
          <SearchResults>
            {searchResults.map((data, i) => (
              <SearchResults.Item
                key={data.slug}
                title={<SearchResults.ItemTitle>{data.titleNode}</SearchResults.ItemTitle>}
                content={<SearchResults.ItemContent>{data.contentNode}</SearchResults.ItemContent>}
                date={<SearchResults.ItemDate>{data.date}</SearchResults.ItemDate>}
                link={
                  <SearchResults.ItemLink
                    slug={data.slug}
                    title={data.title}
                    closeResults={closeResults}
                  />
                }
                isLast={i === searchResults.length - 1}
              />
            ))}
          </SearchResults>
        )}
      </SearchbarWrapper>
    </SearchbarContainer>
  );
}
