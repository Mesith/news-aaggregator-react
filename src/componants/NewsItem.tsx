import React, { LegacyRef } from "react";

export interface NewsItemProp {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  url: string;
  byline: string;
}

function extractDomain(url: string) {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}

const NewsItem = React.memo(
  ({
    newsItem,
    lastref,
  }: {
    newsItem: NewsItemProp;
    lastref: LegacyRef<HTMLDivElement>;
  }) => {
    const domain = extractDomain(newsItem.url);
    return (
      <div
        ref={lastref}
        key={newsItem.id}
        className="border bg-gray-50 border-gray-300 rounded-lg p-4 m-4 sm:p-8 sm:m-8 md:p-16 md:m-16 lg:p-24 lg:m-24"
        role="article"
        aria-labelledby={`title-${newsItem.id}`}
        aria-describedby={`desc-${newsItem.id} byline-${newsItem.id}`}
      >
        <h1 id={`title-${newsItem.id}`} className="text-3xl mb-4">
          {newsItem.title}
        </h1>
        <p id={`desc-${newsItem.id}`}>{newsItem.description}</p>
        <div className="mt-4 flex flex-row" aria-label="News item details">
          <span
            className="bg-blue-200 p-2 rounded-lg font-semibold text-blue-800"
            role="text"
            aria-label={`Source: ${domain}`}
          >
            {domain}
          </span>
          <p
            id={`byline-${newsItem.id}`}
            className="text-center pt-2 ml-4 font-semibold"
            aria-label={`Byline: ${newsItem.byline}`}
          >
            {newsItem.byline}
          </p>
        </div>
      </div>
    );
  }
);

export default NewsItem;
