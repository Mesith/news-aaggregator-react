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
  return [...pages1, ...pages2, ...pages3].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
};

// const mergePages = (pages1) => {
//   return [...pages1].sort((a, b) => new Date(b.date) - new Date(a.date));
// };

export const useCombinedNews = (search) => {
  const combinedQuery = useInfiniteQuery({
    queryKey: ["combinedNews", search],
    queryFn: async ({ pageParam = 1 }) => {
      const results = await Promise.allSettled([
        fetchApiNews({ pageParam, search }),
        fetchGurdianNews({ pageParam, search }),
        fetchNYNews({ pageParam, search }),
      ]);

      const [apiResult, gurdianResult, nyResult] = results;

      const apiPages = apiResult.status === "fulfilled" ? apiResult.value : [];
      const gurdianPages =
        gurdianResult.status === "fulfilled" ? gurdianResult?.value : [];
      const nyPages = nyResult.status === "fulfilled" ? nyResult?.value : [];
      return mergePages(
        transformApiNewsItem(apiPages?.articles || []),
        transformGurdianNewsItem(gurdianPages?.response || []),
        transformNyNewsItem(nyPages?.response || [])
      );
    },
    getNextPageParam: (lastPage, allPages) => {
      const sourcePerPage = 2;
      const pagesLength = allPages.length / sourcePerPage;
      const currentpage = pagesLength / 10;
      return allPages.length + 1;
    },
  });

  return combinedQuery;
};
