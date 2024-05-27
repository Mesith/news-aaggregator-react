import ky from "ky";
export const NEWS_API_URL = "https://newsapi.org/v2";
export const NEWS_API_KEY = "a9c35fa05f26435491427f96ff051a7a";

export const newsApi = ky.create({
  prefixUrl: NEWS_API_URL,
  headers: {},
  retry: {
    limit: 3,
    methods: ["get"],
    statusCodes: [413],
    backoffLimit: 13000,
  },
});
