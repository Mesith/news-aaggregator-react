import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useRef } from "react";
import NewsList from "../componants/NewsList";
import { useCombinedNews } from "../hooks/combineNews/useCombineNews";

export const Route = createFileRoute("/")({
  component: () => <NewsFeed />,
  beforeLoad: async (params: any) => {
    console.log("AAAAAAAAA", params);
    return true;
  },
  // loader: ({ context: { queryClient } }: any) => {
  //   return useCombinedNews(searchParams?.query);
  // },

  validateSearch: (search: Record<string, unknown>): any => {
    return true;
  },
});

export default function NewsFeed() {
  const observer = useRef<IntersectionObserver>();
  const searchParams = Route.useSearch();
  console.log("GGGGGGGGG", searchParams);

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useCombinedNews(searchParams?.query);

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

  const news = useMemo(() => {
    return data?.pages?.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  if (isLoading) return <h1>Loading News</h1>;

  if (error) return <h1>Error Loading</h1>;

  return (
    <div>
      <NewsList news={news} lastref={lastElementRef} />

      {isFetching && <div>Carregando mais dados...</div>}
    </div>
  );
}
