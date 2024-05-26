import ky from "ky";
export const NEWS_API_URL = "https://newsapi.org/v2";
export const NEWS_API_KEY = "c125779e311b4021bed9aed63aad6295";

export const newsApi = ky.create({
  prefixUrl: NEWS_API_URL,
  headers: {},
});
