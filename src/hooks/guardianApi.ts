import ky from "ky";


export const gurdianpi = ky.create({
  prefixUrl: "https://content.guardianapis.com",
  headers: {},
});
