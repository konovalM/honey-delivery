import { LOCAL_STORAGE_ACCESS_TOKEN } from "@shared/const/const";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_URL ?? 'https://honey.local/';

const API_URL = BASE_URL + 'api';

const http = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default http;