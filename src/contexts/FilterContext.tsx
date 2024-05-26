import { createContext } from "react";

export interface FilterContextProps {
  searchText: String;
}

export const FilterContext = createContext<any>({});
