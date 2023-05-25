import { ResponsiveIconButton } from "src/components/Common/IconButton";

import { cssOutlineOnFocus } from "../Layout/Navigation/styles";

import styled from "styled-components";

const SearchbarCloseButton = styled(ResponsiveIconButton)`
  position: absolute;
  margin-left: 0;
  right: 0;

  ${cssOutlineOnFocus}
`;

export default SearchbarCloseButton;
