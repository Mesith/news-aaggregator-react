import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCallback, useMemo, useRef } from "react";
import NewsList from "../componants/NewsList";
import { useCombinedNews } from "../hooks/combineNews/useCombineNews";
import { Spinner } from "@nextui-org/spinner";
import Cookies from "js-cookie";
import { getFilteredSearchParams } from "../util/util";

export interface NewsFeedSerchParamProps {
  query?: string;
  source?: string;
  date?: string;
  category?: string;
  byline?: string;
  redirect?: boolean;
}

export const Route = createFileRoute("/")({
  component: () => <NewsFeed />,
  beforeLoad: async ({ location }: any) => {
    const source = Cookies.get("source");
    const category = Cookies.get("category");
    const author = Cookies.get("author");

    if (!location.search?.redirect && (category || author || author)) {
      throw redirect({
        to: "/",
        search: getFilteredSearchParams({
          source: source,
          category: category,
          byline: author,
          redirect: true,
        }),
      });
    }
  },
});

const NewsFeed = () => {
  const observer = useRef<IntersectionObserver>();
  const searchParams = Route.useSearch<NewsFeedSerchParamProps>();
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useCombinedNews(
      searchParams?.query,
      searchParams?.source,
      searchParams?.date,
      searchParams?.category,
      searchParams?.byline
    );

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );


  const news: any = useMemo(() => {
    return data?.pages?.reduce((acc: any, page: any) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  if (isLoading)
    return (
      <div className="flex w-full h-full items-center justify-center mt-40">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <h1 className="items-center w-full text-center pt-24 text-blue-700 font-bold font-24">
        Error Loading, Please try again later
      </h1>
    );

  if (!isLoading && news?.length === 0) {
    return (
      <h1 className="items-center w-full text-center pt-24 text-blue-700 font-bold font-24">
        No articles found for given search parameters
      </h1>
    );
  }
  return (
    <div>
      <NewsList news={news} lastref={lastElementRef} />

      {true && (
        <div className="w-fill h-16 bg-orange-200 content-center text-center font-semibold">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
