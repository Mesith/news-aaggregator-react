import { NEWS_API_KEY, newsApi } from "./newsApiApi";

export const fetchApiNews = async ({
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
    let url = `everything?q=${encodeURIComponent(search || category || "all")}&apiKey=${NEWS_API_KEY}&page=${pageParam}&pageSize=10&sort=popularity`;
    if (date) {
      url += `&from=${date}`;
    }
    if (byline) {
      url += `&byline=${byline}`;
    }
    const response = await newsApi.get(url);

    if (!response.ok) {
      throw new Error(`Error fetching news: ${response.statusText}`);
    }
    const apiNews = await response.json();
    return apiNews;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

export const transformApiNewsItem = (articles: any) => {
  if (articles.length > 0) {
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
  } else {
    return [];
  }
};
