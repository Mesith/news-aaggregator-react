import { newsNyApi, NY_API_KEY } from "./newsNYApi";

export const fetchNYNews = async ({
  pageParam = 1,
  search = "all",
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
  try {
    const params = new URLSearchParams({
      q: search,
      "api-key": NY_API_KEY,
      page: String(pageParam),
    });

    if (date) {
      params.append("pub_date", date);
    }
    if (category) {
      params.append("section_name", category);
    }
    if (byline) {
      params.append("byline", byline);
    }

    const url = `articlesearch.json?${params.toString()}`;
    const response = await newsNyApi.get(url);

    if (!response.ok) {
      throw new Error(`Error fetching news: ${response.statusText}`);
    }

    const newyorkTimesNews = await response.json();
    return newyorkTimesNews;
  } catch (error) {
    console.error("Error fetching NY Times news:", error);
    throw error;
  }
};

export const transformNyNewsItem = (articles: any) => {
  if (articles?.docs?.length > 0) {
    return articles?.docs?.map((article: any) => {
      return {
        id: article._id,
        title: article?.headline?.main,
        description: article?.snippet,
        date: article.webPublicationDate,
        url: article.web_url,
        byline: article?.byline?.original,
      };
    });
  } else return [];
};
