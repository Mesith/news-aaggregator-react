import { useInfiniteQuery } from "@tanstack/react-query";
import { NEWS_API_KEY, newsApi } from "./newsApiApi";

export const searchNews = async ({ pageParam }: { pageParam: number }) => {
  const response = await newsApi.get(
    `everything?q=all&apiKey=c125779e311b4021bed9aed63aad6295&page=${pageParam ?? 1}&pageSize=10`
  );
  const todos = await response.json();
  return todos;
};

export const useNewsAPINews = (page: number = 1) => {
  return useInfiniteQuery({
    queryKey: ["newsApiNews"],
    queryFn: ({ pageParam }) => searchNews({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.response?.currentPage + 1 < lastPage.response?.pages
        ? lastPage.response?.currentPage + 1
        : undefined;
    },
  });
};
