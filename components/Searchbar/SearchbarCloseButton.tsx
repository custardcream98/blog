import styled from "styled-components";

import { ResponsiveIconButton } from "../Common/IconButton";
import { cssOutlineOnFocus } from "../Layout/Navigation/styles";

const SearchbarCloseButton = styled(ResponsiveIconButton)`
  position: absolute;
  margin-left: 0;
  right: 0;

  ${cssOutlineOnFocus}
`;

export default SearchbarCloseButton;
