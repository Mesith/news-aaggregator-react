import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <Home />,
  loader: async (params: any) => {},
  beforeLoad: async ({ search }) => {},
  validateSearch: (search: Record<string, unknown>): any => {
    return search;
  },
});

const Home = () => {
  return (
    <div>
      <h1 className="text-blue-400">News Feed</h1>
    </div>
  );
};
