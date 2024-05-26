import ky from "ky";
export const GURDIAN_URL = "https://content.guardianapis.com";
export const GURDIAN_API_KEY = "88e1a437-05f0-44b1-9d2d-48953b1f4c48";

export const gurdianApi = ky.create({
  prefixUrl: GURDIAN_URL,
  headers: {},
  retry: {
    limit: 2,
    methods: ["get"],
    statusCodes: [413],
    backoffLimit: 13000,
  },
});
