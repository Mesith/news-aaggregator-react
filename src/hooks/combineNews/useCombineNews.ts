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

const mergePages = (pages1: any[], pages2: any[], pages3: any[]) => {
  return [...pages1, ...pages2, ...pages3].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};

export const useCombinedNews = (
  search?: string,
  fetchFrom?: string,
  date?: string,
  category?: string,
  byline?: string
) => {
  return useInfiniteQuery({
    queryKey: ["combinedNews", search, fetchFrom, date, category, byline],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const apiPromises = [];
      if (fetchFrom === undefined || fetchFrom.includes("news-api")) {
        apiPromises.push(fetchApiNews({ pageParam, search, date }));
      }
      if (fetchFrom === undefined || fetchFrom.includes("the-guardian")) {
        apiPromises.push(fetchGurdianNews({ pageParam, search, date, byline }));
      }
      if (fetchFrom === undefined || fetchFrom.includes("newyork-times")) {
        apiPromises.push(fetchNYNews({ pageParam, search, date, byline }));
      }

      const results = await Promise.allSettled(apiPromises);

      const apiPages: any =
        results[0]?.status === "fulfilled" ? results[0]?.value : [];
      const gurdianPages: any =
        results[1]?.status === "fulfilled" ? results[1]?.value : [];
      const nyPages: any =
        results[2]?.status === "fulfilled" ? results[2]?.value : [];

      if (fetchFrom === "news-api") {
        return mergePages(
          transformApiNewsItem(apiPages?.articles || []),
          [],
          []
        );
      } else if (fetchFrom === "newyork-times") {
        const t = mergePages(
          transformNyNewsItem(apiPages?.response || []),
          [],
          []
        );
        return t;
      } else if (fetchFrom === "the-guardian") {
        return mergePages(
          transformGurdianNewsItem(apiPages?.response || []),
          [],
          []
        );
      } else {
        return mergePages(
          transformApiNewsItem(apiPages?.articles || []),
          transformGurdianNewsItem(gurdianPages?.response || []),
          transformNyNewsItem(nyPages?.response || [])
        );
      }
    },
    getNextPageParam: (allPages: any) => {
      return allPages.length + 1;
    },
  });
};
