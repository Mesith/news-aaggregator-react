import { useQuery } from "@tanstack/react-query";
import { GURDIAN_API_KEY, gurdianApi } from "./guardianApi";

const fetchGardianNewsFeed = async () => {
  const parsed: any = await gurdianApi
    .get(`search?api-key=${GURDIAN_API_KEY}`)
    .json();
  return parsed;
};

const useGardianFeed = () => {
  return useQuery({
    queryKey: ["gardianFeed"],
    queryFn: () => fetchGardianNewsFeed(),
  });
};

export { useGardianFeed, fetchGardianNewsFeed };
