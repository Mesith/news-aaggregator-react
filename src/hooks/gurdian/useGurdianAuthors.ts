import React from "react";
import { GURDIAN_API_KEY, GURDIAN_URL } from "./guardianApi";
export function useGurdianAuthors({ fetchDelay = 0 } = {}) {
  const [items, setItems] = React.useState<any>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const limit = 1;

  const loadAuthors = async (currentOffset: any) => {
    const controller = new AbortController();
    const { signal } = controller;
    const authorsSet = new Set();

    try {
      setIsLoading(true);

      if (offset > 0) {
        await new Promise((resolve) => setTimeout(resolve, fetchDelay));
      }

      const res = await fetch(
        `${GURDIAN_URL}/search?api-key=${GURDIAN_API_KEY}&&show-fields=byline&page=${currentOffset}&page=${limit}`,
        { signal }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await res.json();

      setHasMore(json.next !== null);
      json.response.results.forEach((article: any) => {
        if (article.fields && article.fields.byline) {
          const byline = article.fields.byline.trim();
          if (byline) {
            authorsSet.add({ byline, id: article?.id });
          }
        }
      });
      setItems((prevItems: any) => [...prevItems, ...Array.from(authorsSet)]);
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.error("There was an error with the fetch operation:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadAuthors(offset);
  }, []);

  const onLoadMore = () => {
    const newOffset = offset + 1;

    setOffset(newOffset);
    loadAuthors(newOffset);
  };

  return {
    items,
    hasMore,
    isLoading,
    onLoadMore,
  };
}
