import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useRef } from "react";
import {
  useGurdianNews,
} from "../hooks/gurdian/useGurdianNewsFeed";
import NewsList from "../componants/NewsList";
import { useNewsAPINews } from "../hooks/newsApi/useNewsApiFeed";

export const Route = createFileRoute("/")({
  component: () => <NewsFeed />,
  beforeLoad: async ({ search }) => {},
  validateSearch: (search: Record<string, unknown>): any => {
    return search;
  },
});

export default function NewsFeed() {
  const observer = useRef<IntersectionObserver>();

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useGurdianNews();

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
      return [...acc, ...page?.response?.results];
    }, []);
  }, [data]);

  // const news = useMemo(() => {
  //   return data?.pages?.reduce((acc, page) => {
  //     return [...acc, ...page?.articles];
  //   }, []);
  // }, [data]);

  if (isLoading) return <h1>Loading News</h1>;

  if (error) return <h1>Error Loading</h1>;

  return (
    <div>
      <NewsList news={news} lastref={lastElementRef} />

      {isFetching && <div>Carregando mais dados...</div>}
    </div>
  );
}
