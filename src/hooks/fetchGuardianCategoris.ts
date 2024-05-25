import { useQuery } from "@tanstack/react-query";
import { gurdianpi } from "./guardianApi";

export const API_KEY = "88e1a437-05f0-44b1-9d2d-48953b1f4c48";

const fetchGardianNewsFeed = async () => {
  const parsed: any = await gurdianpi.get(`search?api-key=${API_KEY}`).json();
  return parsed;
};

const useGardianFeed = () => {
  return useQuery({
    queryKey: ["gardianFeed"],
    queryFn: () => fetchGardianNewsFeed(),
  });
};

export { useGardianFeed, fetchGardianNewsFeed };
