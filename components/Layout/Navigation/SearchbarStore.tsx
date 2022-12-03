import { createContext, MouseEvent } from "react";

const SearchbarStore = createContext<{
  closeResults: () => void;
}>({ closeResults: () => {} });
export default SearchbarStore;
