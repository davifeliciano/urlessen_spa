import axios, { HttpStatusCode } from "axios";

const baseOptions = {
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
};

const axiosPrivate = axios.create({
  ...baseOptions,
  withCredentials: true,
});

export { axiosPrivate, HttpStatusCode };
export default axios.create(baseOptions);
