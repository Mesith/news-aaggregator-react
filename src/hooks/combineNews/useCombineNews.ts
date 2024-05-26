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

export const useCombinedNews = (search, fetchFrom = "all") => {
  return useInfiniteQuery({
    queryKey: ["combinedNews", search, fetchFrom],
    queryFn: async ({ pageParam = 1 }) => {
      const apiPromises = [];
      console.log("DDDDDDDDDDDDDDD", search);
      console.log("AAAAAAAA", fetchFrom);
      // Determine which APIs to call based on the fetchFrom parameter
      if (fetchFrom === "all" || fetchFrom.includes("news-api")) {
        apiPromises.push(fetchApiNews({ pageParam, search }));
      }
      if (fetchFrom === "all" || fetchFrom.includes("the-gradian")) {
        apiPromises.push(fetchGurdianNews({ pageParam, search }));
      }
      if (fetchFrom === "all" || fetchFrom.includes("newyork-times")) {
        apiPromises.push(fetchNYNews({ pageParam, search }));
      }

      const results = await Promise.allSettled(apiPromises);

      const apiPages =
        results[0]?.status === "fulfilled" ? results[0]?.value : [];
      const gurdianPages =
        results[1]?.status === "fulfilled" ? results[1]?.value : [];
      const nyPages =
        results[2]?.status === "fulfilled" ? results[2]?.value : [];

      return mergePages(
        transformApiNewsItem(apiPages?.articles || []),
        transformGurdianNewsItem(gurdianPages?.response || []),
        transformNyNewsItem(nyPages?.response || [])
      );
    },
    getNextPageParam: (lastPage, allPages) => {
      const sourcePerPage = 3; // Adjust based on number of sources
      const pagesLength = allPages.length / sourcePerPage;
      const currentPage = pagesLength / 10;
      return allPages.length + 1;
    },
  });
};
