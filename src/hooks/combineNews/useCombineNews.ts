/* eslint-disable @typescript-eslint/no-unused-vars */
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchGurdianNews,
  transformGurdianNewsItem,
} from "../gurdian/useGurdianNewsFeed";
import { fetchApiNews, transformApiNewsItem } from "../newsApi/useNewsApiFeed";
import {
  fetchNYNews,
  transformNyNewsItem,
} from "../newyorkTimes/useNewsNYFeed";

const mergePages = (pages1, pages2, pages3) => {
  console.log("Pages", pages1);
  return [...pages1, ...pages2, ...pages3].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
};

export const useCombinedNews = () => {
  const combinedQuery = useInfiniteQuery({
    queryKey: ["combinedNews"],
    queryFn: ({ pageParam = 1 }) => {
      return Promise.all([
        fetchApiNews({ pageParam }),
        fetchGurdianNews({ pageParam }),
        fetchNYNews({ pageParam }),
      ]).then(([apiPages, gurdianPages, nyPages]) => {
        return mergePages(
          transformApiNewsItem(apiPages?.articles),
          transformGurdianNewsItem(gurdianPages.response),
          transformNyNewsItem(nyPages.response)
        );
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      console.log("Last Page", lastPage);
      console.log("All Pages", allPages);
      const sourcePerPage = 2;
      const pagesLength = allPages.length / sourcePerPage;
      const currentpage = pagesLength / 10;
      return allPages.length + 1;
    },
  });

  return combinedQuery;
};
