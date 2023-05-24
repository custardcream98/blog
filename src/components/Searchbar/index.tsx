import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
} from "react";
import styled from "styled-components";
import { RiCloseFill } from "react-icons/ri";

import SearchResults from "./SearchResults";
import useSearchResults from "src/lib/hook/useSearchResults";
import SearchbarCloseButton from "./SearchbarCloseButton";

const TRANSITION_DURATION = 200;

type SearchbarStyleProps = {
  isSearchbarOn: boolean;
};

const SearchbarContainer = styled.form<SearchbarStyleProps>`
  width: 100%;
  height: 100%;

  position: absolute;
  right: 0;

  z-index: 101;

  transition: all ease ${TRANSITION_DURATION}ms;

  transform: translateY(
    ${({ isSearchbarOn }) =>
      isSearchbarOn ? "0" : "-105%"}
  );

  background-color: ${({ theme }) => theme.bgColor};
`;

const SearchbarInput = styled.input`
  width: 100%;
  height: 80%;

  padding: 0 20px;

  font-family: "Noto Sans", "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  border: none;

  border-radius: 9999px;
  background: ${({ theme }) =>
    theme.postElementBackgroundColor};

  color: ${({ theme }) => theme.textColor};

  margin-right: 30px;

  :focus {
    outline: none;
  }
`;

const SearchbarWrapper = styled.div`
  position: relative;

  width: 90vw;
  max-width: 800px;
  height: 100%;
  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  isSearchbarOn: boolean;
  onSearchbarClose: () => void;
};

export default function Searchbar({
  isSearchbarOn,
  onSearchbarClose,
}: Props) {
  const [searchInput, setSearchInput] = useState("");
  const { searchResults, clearSearchedResults } =
    useSearchResults(searchInput);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchbarContainerRef =
    useRef<HTMLFormElement>(null);
  const buttonCloseSearchbarRef =
    useRef<HTMLButtonElement>(null);

  const isResultExists = searchResults.length !== 0;

  const openSearchbarCallback = () => {
    if (!isSearchbarOn) {
      return;
    }
    const focusTimeout = setTimeout(
      () => inputRef.current?.focus(),
      TRANSITION_DURATION
    );
    return () => clearTimeout(focusTimeout);
  };

  useEffect(openSearchbarCallback, [isSearchbarOn]);

  const closeResults = useCallback(() => {
    setSearchInput("");
    clearSearchedResults();
    onSearchbarClose();
  }, []);

  const onSearchFormSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  };

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      clearSearchedResults();
      setSearchInput(event.currentTarget.value);
    },
    []
  );

  const handleTabArrow = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      if (
        key !== "Tab" &&
        key !== "ArrowUp" &&
        key !== "ArrowDown"
      ) {
        return;
      }
      event.preventDefault();

      const tabIterables = [
        inputRef.current,
        buttonCloseSearchbarRef.current,
        ...Array.from<HTMLAnchorElement>(
          searchbarContainerRef.current?.querySelectorAll(
            ".result-link"
          ) as NodeListOf<HTMLAnchorElement>
        ),
      ];

      const currentFocusIndex = tabIterables.indexOf(
        document.activeElement as HTMLInputElement
      );

      if (currentFocusIndex === -1) {
        return;
      }

      if (key === "ArrowUp") {
        tabIterables[
          currentFocusIndex === 0
            ? tabIterables.length - 1
            : currentFocusIndex - 1
        ]?.focus();
      } else {
        tabIterables[
          currentFocusIndex === tabIterables.length - 1
            ? 0
            : currentFocusIndex + 1
        ]?.focus();
      }
    },
    []
  );

  return (
    <SearchbarContainer
      ref={searchbarContainerRef}
      autoComplete="off"
      onSubmit={onSearchFormSubmit}
      onKeyDown={handleTabArrow}
      isSearchbarOn={isSearchbarOn}
    >
      <label className="sr-only" htmlFor="search">
        검색어 입력란
      </label>
      <SearchbarWrapper>
        <SearchbarInput
          ref={inputRef}
          id="search"
          type="text"
          placeholder="검색어를 입력해주세요."
          required
          spellCheck="false"
          autoComplete="off"
          onChange={onInputChange}
          value={searchInput}
        />
        <SearchbarCloseButton
          ref={buttonCloseSearchbarRef}
          title="검색바 닫기"
          icon={RiCloseFill}
          mobileSize="22px"
          desktopSize="26px"
          onClick={closeResults}
          hidden={!isSearchbarOn}
        />
        {isResultExists && (
          <SearchResults>
            {searchResults.map((data, i) => (
              <SearchResults.Item
                key={data.slug}
                title={
                  <SearchResults.ItemTitle>
                    {data.titleNode}
                  </SearchResults.ItemTitle>
                }
                content={
                  <SearchResults.ItemContent>
                    {data.contentNode}
                  </SearchResults.ItemContent>
                }
                date={
                  <SearchResults.ItemDate>
                    {data.date}
                  </SearchResults.ItemDate>
                }
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
