import { useQuery } from "@tanstack/react-query";
import { gurdianApi } from "./guardianApi";


export const API_KEY = "88e1a437-05f0-44b1-9d2d-48953b1f4c48";

const fetchGardianNewsFeed = async () => {
  const parsed: any = await gurdianApi.get(`search?api-key=${API_KEY}`).json();
  return parsed;
};

const useGardianFeed = () => {
  return useQuery({
    queryKey: ["gardianFeed"],
    queryFn: () => fetchGardianNewsFeed(),
  });
};

export { useGardianFeed, fetchGardianNewsFeed };
