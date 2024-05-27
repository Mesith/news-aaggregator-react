import { render } from "@testing-library/react";
import NewsList from "../../componants/NewsList";

describe("NewsList", () => {
  it("renders news items correctly", () => {
    const news = [
      {
        id: "1",
        title: "Test News Title 1",
        description: "Test news description 1",
        url: "https://example.com/news1",
        author: "",
        byline: "By Test Author 1",
        date: "2024/5/26",
      },
      {
        id: "2",
        title: "Test News Title 2",
        description: "Test news description 2",
        url: "https://example.com/news2",
        author: "",
        byline: "By Test Author 2",
        date: "2024/5/27",
      },
    ];

    const { getAllByText } = render(<NewsList news={news} lastref={null} />);

    news.forEach((newsItem) => {
      const titleElement = getAllByText(newsItem.title);
      const descriptionElement = getAllByText(newsItem.description);
      const bylineElement = getAllByText(newsItem.byline);
      const domainElement = getAllByText(new URL(newsItem.url).hostname);

      expect(titleElement).toHaveLength(1);
      expect(descriptionElement).toHaveLength(1);
      expect(bylineElement).toHaveLength(1);
      expect(domainElement).toHaveLength(2);
    });
  });

  it("renders no news items when news is empty", () => {
    const { queryByText } = render(<NewsList news={[]} lastref={null} />);

    expect(queryByText(/Test News Title/)).toBeNull();
    expect(queryByText(/Test news description/)).toBeNull();
    expect(queryByText(/By Test Author/)).toBeNull();
    expect(queryByText(/example.com/)).toBeNull();
  });
});
