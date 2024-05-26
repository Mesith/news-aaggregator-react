import { useInfiniteQuery } from "@tanstack/react-query";
import { NEWS_API_KEY, newsApi } from "./newsApiApi";

export const fetchApiNews = async ({ pageParam }: { pageParam: number }) => {
  const response = await newsApi.get(
    `everything?q=all&apiKey=${NEWS_API_KEY}&page=${pageParam ?? 1}&pageSize=10`
  );
  const todos = await response.json();
  return todos;
};

export const transformApiNewsItem = (articles: any) => {
  return articles?.map((article: any) => {
    return {
      id: article.url,
      title: article.title,
      author: article.fields?.byline,
      date: article.webPublicationDate,
      url: "https://newsapi.org",
      imageUrl: article.urlToImage,
    };
  });
};

export const useNewsAPINews = (page: number = 1) => {
  const queryInfo = useInfiniteQuery({
    queryKey: ["newsApiNews"],
    queryFn: ({ pageParam }) => fetchApiNews({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return allPages?.length + 1;
    },
  });

  //console.log(queryInfo.data);
  const t = {
    ...queryInfo,
    data: {
      pageParam: queryInfo.data?.pageParams,
      pages: queryInfo.data?.pages?.map((page: any) =>
        page.articles?.map((article: any) => {
          return {
            id: article.url,
            title: article.title,
            author: article.fields?.byline,
            date: article.webPublicationDate,
            url: "https://newsapi.org",
            imageUrl: article.urlToImage,
          };
        })
      ),
    },
  };
  //console.log("FORMAT", t);
  return t;
};
