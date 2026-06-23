import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api",
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function fetcher<T>(url: string, params?: Record<string, unknown>) {
  const { data } = await api.get<{ success: boolean; data: T }>(url, { params });
  return data.data;
}
