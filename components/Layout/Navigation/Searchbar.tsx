import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { useTheme } from "styled-components";
import { RiCloseFill } from "react-icons/ri";
import { IconContext } from "react-icons";

import { SearchButton } from "../../Common/styledComponents";
import { SearchedPost } from "../../../interfaces/searchedPosts";
import { searchPosts } from "../../../lib/axios";
import SearchResults from "./SearchResults";
import { SearchbarStore } from "./SearchbarStore";
import { cssOutlineOnFocus } from "./styles";

const TRANSITION_DURATION = 500;
const FETCH_DEBOUNCE_COOLTIME = 300;

const CloseSearchButton = styled(SearchButton)`
  position: absolute;
  margin-left: 0;
  right: 0;

  ${cssOutlineOnFocus}
`;

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
  const theme = useTheme();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<
    SearchedPost[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    if (!searchInput) {
      return;
    }

    const inputTimeout = setTimeout(async () => {
      const searchedData = await searchPosts(searchInput);

      setSearchResults(searchedData);
    }, FETCH_DEBOUNCE_COOLTIME);

    return () => clearTimeout(inputTimeout);
  }, [searchInput]);

  const closeResults = useCallback(() => {
    setSearchInput("");
    setSearchResults([]);
    onSearchbarClose();
  }, []);

  const onSearchFormSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  };

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.currentTarget.value);
      setSearchResults([]);
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
          document.querySelectorAll(
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
      containerWidth={isSearchbarOn ? 100 : 0}
      onSubmit={onSearchFormSubmit}
      autoComplete="off"
      onKeyDown={handleTabArrow}
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
        <CloseSearchButton
          ref={buttonCloseSearchbarRef}
          type="button"
          onClick={closeResults}
        >
          <span className="sr-only">검색바 닫기</span>
          <IconContext.Provider
            value={{
              size: isSearchbarOn ? "100%" : "0%",
            }}
          >
            <RiCloseFill color={theme.textColor} />
          </IconContext.Provider>
        </CloseSearchButton>
        {searchResults && (
          <SearchbarStore.Provider
            value={{
              closeResults,
            }}
          >
            <SearchResults
              visible={isSearchbarOn}
              searchResults={searchResults}
            />
          </SearchbarStore.Provider>
        )}
      </SearchbarWrapper>
    </SearchbarContainer>
  );
}
