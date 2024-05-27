import ky from "ky";
export const NY_API_URL = "https://api.nytimes.com/svc/search/v2";
export const NY_API_KEY = "SnHHGD0bPF3v3nGpYrgKUBo8lHASc1zK";

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
