import { GURDIAN_API_KEY, gurdianApi } from "./guardianApi";

export const fetchGurdianNews = async ({
  pageParam,
  search,
  date,
  category,
  byline,
}: {
  pageParam?: number;
  search?: string;
  date?: string;
  category?: string;
  byline?: string;
}) => {
  const params = new URLSearchParams();
  params.append("api-key", GURDIAN_API_KEY);
  params.append("q", search || "");
  params.append("show-fields", "byline");
  params.append("page", String(pageParam ?? 1));
  if (byline) {
    params.append("byline", byline);
  }

  if (date) params.append("from-date", date);
  if (category) params.append("section", category);

  const response = await gurdianApi.get(`search?${params.toString()}`);
  const gurdianNews = await response.json();
  return gurdianNews;
};

export const transformGurdianNewsItem = (response: any) => {
  if (response && response?.results && response.results.length) {
    return response?.results?.map((article: any) => {
      return {
        id: article.id,
        title: article.webTitle,
        author: article.fields?.byline,
        date: article.webPublicationDate,
        url: article.webUrl,
      };
    });
  } else {
    return [];
  }
};
