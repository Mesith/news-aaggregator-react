function extractDomain(url: string) {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}

const NewsList = ({ news, lastref }: any) => {
  return (
    <div>
      {news?.map((newsItem, index) => {
        return (
          <div
            ref={lastref}
            key={newsItem.id}
            className="border border-gray-300 p-24 m-24"
          >
            <h2>{newsItem.title}</h2>
            <p>{newsItem.description}</p>
            <p>{extractDomain(newsItem.url)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default NewsList;
