/* eslint-disable @typescript-eslint/no-unused-vars */
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchGurdianNews,
  transformGurdianNewsItem,
} from "../gurdian/useGurdianNewsFeed";
import {
  fetchApiNews,
  transformApiNewsItem,
  useNewsAPINews,
} from "../newsApi/useNewsApiFeed";
import { useNYTNews } from "./useNYTNews";

const mergePages = (pages1, pages2) => {
  console.log("Pages", pages1);
  return [...pages1, ...pages2].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
};

export const useCombinedNews = () => {
  const combinedQuery = useInfiniteQuery({
    queryKey: ["combinedNews"],
    queryFn: ({ pageParam = 1 }) => {
      console.log("PAAAAARRRRRAAAAMMM", pageParam);
      return Promise.all([
        fetchApiNews({ pageParam }),
        //fetchGurdianNews({ pageParam }),
      ]).then(([apiPages]) => {
        console.log("111111111", apiPages);
        //console.log("2222222", transformGurdianNewsItem(gurdianPages.response));
        return transformApiNewsItem(apiPages?.articles);
        // return mergePages(
        //   transformApiNewsItem(apiPages?.articles),
        //   transformGurdianNewsItem(gurdianPages.response)
        // );
        // return {
        //   pageParam: apiPages?.pageParams,
        //   pages: apiPages?.pages?.map((page: any) =>
        //     page.articles?.map((article: any) => {
        //       return {
        //         id: article.url,
        //         title: article.title,
        //         author: article.fields?.byline,
        //         date: article.webPublicationDate,
        //         url: "https://newsapi.org",
        //         imageUrl: article.urlToImage,
        //       };
        //     })
        //   ),
        // };
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      console.log("Last Page", lastPage);
      console.log("All Pages", allPages);
      return allPages.length + 1;
    },
  });

  return combinedQuery;
};
