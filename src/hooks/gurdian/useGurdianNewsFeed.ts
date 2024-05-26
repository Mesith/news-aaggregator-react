import { useInfiniteQuery } from "@tanstack/react-query";
import { GURDIAN_API_KEY, gurdianApi } from "./guardianApi";

export const searchNews = async ({ pageParam }: { pageParam: number }) => {
  const response = await gurdianApi.get(
    `search?api-key=${GURDIAN_API_KEY}&show-fields=byline&page=${pageParam ?? 1}`
  );
  const todos = await response.json();
  return todos;
};

export const useGurdianNews = (page: number = 1) => {
  return useInfiniteQuery({
    queryKey: ["gaurdianNews"],
    queryFn: ({ pageParam }) => searchNews({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.response?.currentPage + 1 < lastPage.response?.pages
        ? lastPage.response?.currentPage + 1
        : undefined;
    },
  });
};
