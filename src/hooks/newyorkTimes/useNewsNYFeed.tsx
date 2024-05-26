import { useInfiniteQuery } from "@tanstack/react-query";
import { newsNyApi, NY_API_KEY } from "./newsNYApi";

export const fetchNYNews = async ({ pageParam }: { pageParam: number }) => {
  const response = await newsNyApi.get(
    `articlesearch.json?q=election&api-key=${NY_API_KEY}&page=${pageParam}`
  );
  const todos = await response.json();
  return todos;
};

export const transformNyNewsItem = (articles: any) => {
  return articles?.docs?.map((article: any) => {
    return {
      id: article.id,
      title: article?.headline?.main,
      description: article?.lead_paragraph,
      author: article.fields?.byline,
      date: article.webPublicationDate,
      url: article.web_url,
    };
  });
};

export const useNYNews = (page: number = 1) => {
  const queryInfo = useInfiniteQuery({
    queryKey: ["nyNews"],
    queryFn: ({ pageParam }) => fetchNYNews({ pageParam }),
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
        page.response?.docs?.map((article: any) => {
          return {
            id: article.id,
            title: article?.headline?.main,
            description: article?.lead_paragraph,
            author: article.fields?.byline,
            date: article.webPublicationDate,
            url: article.web_url,
          };
        })
      ),
    },
  };
  console.log("FORMAT", t);
  return t;
};
