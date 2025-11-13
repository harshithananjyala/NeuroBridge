import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5050",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
