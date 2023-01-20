import {
  ChangeEvent,
  Children,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import SearchResults from "./SearchResults";
import useSearchResults from "../../lib/hook/useSearchResults";
import SearchbarCloseButton from "./SearchbarCloseButton";

const TRANSITION_DURATION = 500;

type SearchbarStyleProps = {
  containerWidth: number;
};

const SearchbarContainer = styled.form<SearchbarStyleProps>`
  visibility: ${({ containerWidth }) =>
    containerWidth !== 0 ? "visible" : "hidden"};

  width: ${({ containerWidth }) => containerWidth}%;
  height: 100%;

  position: absolute;
  right: 0;

  z-index: 101;

  transition: all linear ${TRANSITION_DURATION}ms;

  background-color: ${({ theme }) => theme.bgColor};
`;

const SearchbarInput = styled.input`
  width: 100%;
  height: 100%;

  padding: 20px;

  font-family: "Noto Sans", "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid
    ${({ theme }) => theme.accentColor};

  background: none;

  color: ${({ theme }) => theme.textColor};

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

  const openSearchbarCallback = useCallback(() => {
    if (!isSearchbarOn) {
      return;
    }
    const focusTimeout = setTimeout(
      () => inputRef.current?.focus(),
      TRANSITION_DURATION
    );
    return () => clearTimeout(focusTimeout);
  }, [isSearchbarOn, inputRef.current]);

  useEffect(openSearchbarCallback, [
    isSearchbarOn,
    inputRef.current,
  ]);

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
    [inputRef.current, buttonCloseSearchbarRef.current]
  );

  return (
    <SearchbarContainer
      ref={searchbarContainerRef}
      autoComplete="off"
      onSubmit={onSearchFormSubmit}
      onKeyDown={handleTabArrow}
      containerWidth={isSearchbarOn ? 100 : 0}
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
          onClick={closeResults}
          hidden={!isSearchbarOn}
        />
        {searchResults.length !== 0 && (
          <SearchResults>
            {Children.toArray(
              searchResults.map((data, i) => (
                <SearchResults.Item
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
              ))
            )}
          </SearchResults>
        )}
      </SearchbarWrapper>
    </SearchbarContainer>
  );
}