import { ResponsiveIconButton } from "src/components/client";

import { cssOutlineOnFocus } from "../Navigation/styles";

import { utld } from "utility-class-components";

const SearchbarCloseButton = utld(ResponsiveIconButton)`
  absolute
  ml-0
  right-0

  ${cssOutlineOnFocus}
`;

export default SearchbarCloseButton;
