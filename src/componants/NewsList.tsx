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
        <div key={newsItem?.id}>
          <NewsItem
            newsItem={newsItem}
            lastref={index === news.length - 1 ? lastref : null}
          />
        </div>
      ))}
    </div>
  );
};

export default NewsList;
