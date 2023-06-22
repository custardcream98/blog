import useDebouncedValue from "src/hook/useDebouncedValue";
import useDelayedFocus from "src/hook/useDelayedFocus";
import { useGetSearchedPostCardDataQuery } from "src/request";
import { calculateLoopedIndex, preventDefaultEvent } from "src/utils";

import { SearchbarCloseButton } from "./SearchbarCloseButton";
import { RESULT_LINK_CLASSNAME } from "./SearchResultCard";
import { SearchResults } from "./SearchResults";

import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { RiCloseFill } from "react-icons/ri";
import { utld } from "utility-class-components";

const SEARCH_INPUT_DEBOUNCE_DELAY = 300;

const TRANSITION_DURATION = 200;
const TAB_KEY = "Tab";
const ARROW_UP_KEY = "ArrowUp";
const ARROW_DOWN_KEY = "ArrowDown";

const TAB_AND_ARROW_KEYS = new Set([TAB_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY]);

type SearchbarProps = {
  isSearchbarOn: boolean;
  onSearchbarClose: () => void;
};

export function Searchbar({ isSearchbarOn, onSearchbarClose }: SearchbarProps) {
  const [searchInput, setSearchInput] = useState("");
  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchInput(event.currentTarget.value);
  }, []);
  const debouncedSearchInput = useDebouncedValue(searchInput, SEARCH_INPUT_DEBOUNCE_DELAY);
  const { isLoading: isSearchedPostsCardDataLoading, data: searchedPostsCardData } =
    useGetSearchedPostCardDataQuery(!searchInput ? searchInput : debouncedSearchInput);
  const isSearchedPostsCardDataEmpty =
    isSearchedPostsCardDataLoading || !searchedPostsCardData || searchedPostsCardData.length === 0;

  const inputRef = useRef<HTMLInputElement>(null);
  const focusOnSearchInput = useDelayedFocus(inputRef, TRANSITION_DURATION);
  useEffect(() => {
    if (isSearchbarOn) {
      focusOnSearchInput();
    }
  }, [isSearchbarOn, focusOnSearchInput]);

  const searchResultsListRef = useRef<HTMLOListElement>(null);
  const buttonCloseSearchbarRef = useRef<HTMLButtonElement>(null);
  const getTabbableElements = useCallback(() => {
    return [
      inputRef.current,
      buttonCloseSearchbarRef.current,
      ...Array.from(
        searchResultsListRef.current?.querySelectorAll(
          `.${RESULT_LINK_CLASSNAME}`,
        ) as NodeListOf<HTMLAnchorElement>,
      ),
    ];
  }, []);
  const isSearchInputComposingRef = useRef(false);
  const handleCompositionStart = useCallback(() => {
    isSearchInputComposingRef.current = true;
  }, []);
  const handleCompositionEnd = useCallback(() => {
    isSearchInputComposingRef.current = false;
  }, []);
  const handleTabArrow = useCallback(
    (event: KeyboardEvent) => {
      if (isSearchInputComposingRef.current) {
        return;
      }

      const { key } = event;
      if (!TAB_AND_ARROW_KEYS.has(key)) {
        return;
      }
      event.preventDefault();

      const tabIterables = getTabbableElements();
      const currentFocusIndex = tabIterables.indexOf(document.activeElement as HTMLInputElement);

      if (currentFocusIndex === -1) {
        return;
      }

      const offset = key === ARROW_UP_KEY ? -1 : 1;
      const nextFocusIndex = calculateLoopedIndex(currentFocusIndex, offset, tabIterables.length);
      tabIterables[nextFocusIndex]?.focus();
    },
    [getTabbableElements],
  );

  const closeResults = useCallback(() => {
    setSearchInput("");
    onSearchbarClose();
  }, [onSearchbarClose]);

  return (
    <SearchbarForm
      autoComplete='off'
      onSubmit={preventDefaultEvent}
      onKeyDown={handleTabArrow}
      $isSearchbarOn={isSearchbarOn}
    >
      <label className='sr-only' htmlFor='search'>
        검색어 입력란
      </label>
      <SearchbarWrapper>
        <SearchbarInputGradientBorder>
          <SearchbarInput
            ref={inputRef}
            id='search'
            type='text'
            placeholder='검색어를 입력해주세요.'
            required
            spellCheck='false'
            autoComplete='off'
            onChange={handleInputChange}
            value={searchInput}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
        </SearchbarInputGradientBorder>
        <SearchbarCloseButton
          ref={buttonCloseSearchbarRef}
          title='검색바 닫기'
          icon={RiCloseFill}
          mobileSize='22px'
          desktopSize='26px'
          onClick={closeResults}
          hidden={!isSearchbarOn}
        />
        {!isSearchedPostsCardDataEmpty && (
          <SearchResults ref={searchResultsListRef}>
            {searchedPostsCardData.map((data, index) => (
              <SearchResults.Item
                key={data.hash}
                hash={data.hash}
                resultTitle={data.title}
                resultTitleNode={
                  <SearchResults.ItemTitle>{data.titleNode}</SearchResults.ItemTitle>
                }
                contentNode={
                  <SearchResults.ItemContent>{data.contentNode}</SearchResults.ItemContent>
                }
                resultDateNode={<SearchResults.ItemDate>{data.date}</SearchResults.ItemDate>}
                isLast={index === searchedPostsCardData.length - 1}
                onClick={closeResults}
              />
            ))}
          </SearchResults>
        )}
      </SearchbarWrapper>
    </SearchbarForm>
  );
}

type SearchbarFormProps = {
  $isSearchbarOn: boolean;
};
const SearchbarForm = utld.form<SearchbarFormProps>`
  w-full
  h-full

  absolute
  right-0

  z-[101]

  transition-all
  duration-[200ms]

  ${({ $isSearchbarOn }) => ($isSearchbarOn ? "" : "translate-y-[-105%]")}

  bg-bg-light
  dark:bg-bg-dark
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

const SearchbarInput = utld.input`
  w-full
  h-full

  px-5

  font-sans
  font-normal
  text-base

  rounded-full
  bg-post-element-bg-light
  dark:bg-post-element-bg-dark

  text-default-light
  dark:text-default-dark

  focus:(
    !outline-none
    rounded-full
  )
`;

const SearchbarInputGradientBorder = utld.div`
  w-full
  h-4/5
  mr-[1.875rem]
  rounded-full
  p-[0.125rem]

  focus-within:(
    bg-[200%_auto]
    bg-gradient-to-r
    from-accent-light
    via-[#c9faff]
    to-accent-light
    animate-bg-gradient
  )
`;
