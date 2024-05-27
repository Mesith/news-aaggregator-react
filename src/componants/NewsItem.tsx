import React, { LegacyRef } from "react";

export interface NewsItemProp {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  url: string;
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
    return (
      <div
        ref={lastref}
        key={newsItem.id}
        className="border bg-gray-50 border-gray-300 rounded-lg p-4 m-4 sm:p-8 sm:m-8 md:p-16 md:m-16 lg:p-24 lg:m-24"
      >
        <h1 className="text-3xl mb-4">{newsItem.title}</h1>
        <p>{newsItem.description}</p>
        <div className="mt-4">
          <label className="bg-blue-200 p-2 rounded-lg font-semibold text-blue-800">
            {extractDomain(newsItem.url)}
          </label>
        </div>
      </div>
    );
  }
);

export default NewsItem;
