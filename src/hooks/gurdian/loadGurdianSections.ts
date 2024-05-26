import React from "react";
import { GURDIAN_API_KEY, GURDIAN_URL } from "./guardianApi";
export function useGurdianSections({ fetchDelay = 0 } = {}) {
  const [items, setItems] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const limit = 1;

  const loadGurdianSections = async (currentOffset: any) => {
    const controller = new AbortController();
    const { signal } = controller;
    const sectionsSet = new Set();

    try {
      setIsLoading(true);

      if (offset > 0) {
        await new Promise((resolve) => setTimeout(resolve, fetchDelay));
      }

      let res = await fetch(
        `${GURDIAN_URL}/sections?api-key=${GURDIAN_API_KEY}&&show-fields=byline&page=${currentOffset}&page=${limit}`,
        { signal }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      let json = await res.json();

      setHasMore(json.next !== null);
      json.response.results.forEach((section: any) => {
        sectionsSet.add({ name: section?.webTitle, id: section?.id });
      });
      setItems((prevItems: any) => [...prevItems, ...Array.from(sectionsSet)]);
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
    loadGurdianSections(offset);
  }, []);

  const onLoadMore = () => {
    const newOffset = offset + 1;

    setOffset(newOffset);
    loadGurdianSections(newOffset);
  };

  return {
    items,
    hasMore,
    isLoading,
    onLoadMore,
  };
}
