import React from "react";
export function useGurdianAuthors({ fetchDelay = 0 } = {}) {
  const [items, setItems] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const limit = 1;

  const loadPokemon = async (currentOffset: any) => {
    const controller = new AbortController();
    const { signal } = controller;
    const authorsSet = new Set();

    try {
      setIsLoading(true);

      if (offset > 0) {
        await new Promise((resolve) => setTimeout(resolve, fetchDelay));
      }

      let res = await fetch(
        `https://content.guardianapis.com/search?api-key=88e1a437-05f0-44b1-9d2d-48953b1f4c48&&show-fields=byline&page=${currentOffset}&page=${limit}`,
        { signal }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      let json = await res.json();

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
    } catch (error) {
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
    loadPokemon(offset);
  }, []);

  const onLoadMore = () => {
    const newOffset = offset + 1;

    setOffset(newOffset);
    loadPokemon(newOffset);
  };

  return {
    items,
    hasMore,
    isLoading,
    onLoadMore,
  };
}
