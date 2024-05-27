
# News Aggrigator APP

Welcome to the News Aggregator App! This app fetches the latest news from three sources: NewsAPI.org, The Guardian, and The New York Times, creating a comprehensive news feed for users.

### Key Features:
- **Multi-Source News Feed:** Aggregates news from NewsAPI.org, The Guardian, and The New York Times.
- **User Preferences:** Save preferences for preferred news sources, dates, and authors.
- **Filtering and Searching:** Users can filter news and search for specific articles.

### How It Works
- **News Fetching:** By default, the app fetches the latest news from three APIs. It supports infinite scrolling for seamless navigation and performance optimization. News is fetched page by page from each source, with each page containing 10 articles. The articles from all sources are concatenated and appended to the feed.

- **Infinite Scrolling:** When a user scrolls down and reaches the last item in the news feed, the app fetches the next page of news.

- **User Preferences:** Users can save their preferences by selecting relevant options. These inputs are stored in `cookies`, ensuring preferences persist even if the user closes the browser and returns later. If saved preferences exist, the news feed is generated accordingly.

## Installation Guide:

#### 2. Installation:

Clone the repository from GitHub.
`https://github.com/Mesith/news-aggregator-react`
Navigate to the project directory.
Run `npm install` or `yarn install` to install the project dependencies.

#### 3. Usage:

Start the development server by running `npm run dev` or `yarn dev`.
Launch the app on an `http://localhost:8080`
#### **Docker**
If you are using Docker, this app is configured for Docker. Follow these steps to set up the app using Docker:

**1. Clone the repository:**

`git clone https://github.com/Mesith/news-aggregator-react`

`cd news-aggregator-react`

**2. Build the Docker image:**

`docker run -p 8080:8080 news-aggregator-react`

**3. Run the Docker image::**

`docker run -p 8080:8080 news-aggregator-react`
## Technology Used

- Build Tool: **Vite** (https://vitejs.dev/) - for fast development and build performance.
- State Management: **Redux** (https://redux.js.org/) - for predictable and maintainable state management.
- TanStack Router: Navigation library (https://tanstack.com/router)
- Tanstack Query : Query state management (https://tanstack.com/query/latest)
- UI Framework: **React 18.2** (https://react.dev/) - for building dynamic and interactive user interfaces.
- Responsive Design: **Tailwind CSS** (https://tailwindcss.com/) - for rapid and utility-first CSS development.
- Unit Testing: **Vitest** (https://vitest.dev/) with React Testing Library (https://testing-library.com/docs/react-testing-library/intro/) - for ensuring code quality and maintainability.

## Unit Tests
The project includes a comprehensive set of unit tests, covering various aspects of the codebase. These tests can be found in the `__test__` folder under some packages, which includes unit tests.

**Running Unit Tests:**

To run the unit tests, execute the following command:

```
npm run test
```

This command will trigger the test runner, which will run all the unit tests in the "test" folder. The test runner will provide feedback on the test results, including the number of tests passed and any failures or errors encountered during testing.
