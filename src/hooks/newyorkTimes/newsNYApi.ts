import ky from "ky";
export const NY_API_URL = "https://api.nytimes.com/svc/search/v2";
export const NY_API_KEY = "8WoaQgSSggb23cjMIFG7scyVkzzGs9v6";

export const newsNyApi = ky.create({
  prefixUrl: NY_API_URL,
  headers: {},
  retry: {
    limit: 3,
    methods: ["get"],
    statusCodes: [413],
    backoffLimit: 13000,
  },
});
