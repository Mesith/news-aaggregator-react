import { useInfiniteQuery } from "@tanstack/react-query";
import { GURDIAN_API_KEY, gurdianApi } from "./guardianApi";

export const fetchGurdianNews = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const response = await gurdianApi.get(
    `search?api-key=${GURDIAN_API_KEY}&show-fields=byline&page=${pageParam ?? 1}`
  );
  const todos = await response.json();
  return todos;
};

export const transformGurdianNewsItem = (response: any) => {
  console.log("MMMMMMMMM", response);
  return response?.results?.map((article: any) => {
    return {
      id: article.id,
      title: article.webTitle,
      author: article.fields?.byline,
      date: article.webPublicationDate,
      url: article.webUrl,
    };
  });
};

export const useGurdianNews = (page: number = 1) => {
  const queryInfo = useInfiniteQuery({
    queryKey: ["gaurdianNews"],
    queryFn: ({ pageParam }) => fetchGurdianNews({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.response?.currentPage + 1 < lastPage.response?.pages
        ? lastPage.response?.currentPage + 1
        : undefined;
    },
  });
  //console.log(queryInfo.data);
  const t = {
    ...queryInfo,
    data: {
      pageParam: queryInfo.data?.pageParams,
      pages: queryInfo.data?.pages?.map((page: any) =>
        page.response?.results?.map((article: any) => {
          return {
            id: article.id,
            title: article.webTitle,
            author: article.fields?.byline,
            date: article.webPublicationDate,
            url: article.webUrl,
          };
        })
      ),
    },
  };
  //console.log("FORMAT", t);
  return t;
};
