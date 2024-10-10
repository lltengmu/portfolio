import Axios from "./Axios";

export const Http = new Axios({
  baseURL: "https://portfolio.hub-sky.com/api",
  timeout: 3000,
});

export default defineNuxtPlugin((nuxtapp) => {
  return {
    provide: {
      Http,
    },
  };
});
