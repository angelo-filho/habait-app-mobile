import axios from "axios";

export const api = axios.create({
  baseURL: "http://172.22.184.75:3333",
});
