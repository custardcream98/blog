import { forwardRef, MouseEventHandler } from "react";
import { IconContext } from "react-icons";
import { RiCloseFill } from "react-icons/ri";
import styled, { useTheme } from "styled-components";
import { SearchButton } from "../Common/styledComponents";
import { cssOutlineOnFocus } from "../Layout/Navigation/styles";

const Button = styled(SearchButton)`
  position: absolute;
  margin-left: 0;
  right: 0;

  ${cssOutlineOnFocus}
`;

type Props = {
  hidden: boolean;
  onClick: MouseEventHandler;
};

const SearchbarCloseButton = forwardRef<
  HTMLButtonElement,
  Props
>(function SearchbarCloseButton({ hidden, onClick }, ref) {
  const theme = useTheme();
  return (
    <Button
      ref={ref}
      type="button"
      onClick={onClick}
      hidden={hidden}
    >
      <span className="sr-only">검색바 닫기</span>
      <IconContext.Provider
        value={{
          size: "100%",
        }}
      >
        <RiCloseFill color={theme.textColor} />
      </IconContext.Provider>
    </Button>
  );
});

export default SearchbarCloseButton;
