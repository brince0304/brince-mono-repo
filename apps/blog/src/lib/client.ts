import axios from 'axios';

export const serverFetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  return response.json();
};

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
