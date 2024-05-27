import { LegacyRef } from "react";
import NewsItem, { NewsItemProp } from "./NewsItem";

const NewsList = ({
  news,
  lastref,
}: {
  news: NewsItemProp[];
  lastref: LegacyRef<HTMLDivElement>;
}) => {
  return (
    <div>
      {news?.map((newsItem, index) => (
        <NewsItem
          key={newsItem.id}
          newsItem={newsItem}
          lastref={index === news.length - 1 ? lastref : null}
        />
      ))}
    </div>
  );
};

export default NewsList;
