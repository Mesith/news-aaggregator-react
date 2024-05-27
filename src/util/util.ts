import { NewsFeedSerchParamProps } from "../routes";

export const navigateWithFilteredSearchParams = ({
  navigate,
  to,
  searchParams,
}: {
  navigate: (params: any) => void;
  to: string;
  searchParams: any;
}) => {
  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParams).filter(([_, value]) => value != null)
  );

  navigate({
    to,
    search: filteredSearchParams,
  });
};

export const getFilteredSearchParams = (
  searchParams: NewsFeedSerchParamProps
) => {
  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParams).filter(([_, value]) => value != null)
  );

  return filteredSearchParams;
};
