import NewsItem from "../NewsItem";
import { render } from "@testing-library/react";

describe("NewsItem", () => {
  it("renders the news item title correctly", () => {
    const newsItem = {
      id: "1",
      title: "Test News Title",
      description: "Test news description",
      url: "https://example.com/news",
      author: "",
      byline: "By Test Author",
      date: "2024/5/26",
    };
    const { getByText } = render(
      <NewsItem newsItem={newsItem} lastref={null} />
    );
    const titleElement = getByText("Test News Title");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the news item description correctly", () => {
    const newsItem = {
      id: "1",
      title: "Test News Title",
      author: "",
      description: "Test news description",
      url: "https://example.com/news",
      byline: "By Test Author",
      date: "2024/5/26",
    };
    const { getByText } = render(
      <NewsItem newsItem={newsItem} lastref={null} />
    );
    const descriptionElement = getByText("Test news description");
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders the news item domain correctly", () => {
    const newsItem = {
      id: "1",
      title: "Test News Title",
      description: "Test news description",
      url: "https://example.com/news",
      byline: "By Test Author",
      date: "2024/5/26",
      author: "",
    };
    const { getByText } = render(
      <NewsItem newsItem={newsItem} lastref={null} />
    );
    const domainElement = getByText("example.com");
    expect(domainElement).toBeInTheDocument();
  });

  it("renders the news item byline correctly", () => {
    const newsItem = {
      id: "1",
      title: "Test News Title",
      description: "Test news description",
      url: "https://example.com/news",
      byline: "By Test Author",
      date: "2024/5/26",
      author: "",
    };
    const { getByText } = render(
      <NewsItem newsItem={newsItem} lastref={null} />
    );
    const bylineElement = getByText("By Test Author");
    expect(bylineElement).toBeInTheDocument();
  });
});
