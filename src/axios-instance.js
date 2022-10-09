import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.defaults.headers.common.Authorization =
  "Bearer asd.js2jd9a.gC6paXtNOg0OZL4-adsd-asd";

export default instance;
