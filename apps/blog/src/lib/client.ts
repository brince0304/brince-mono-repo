import axios, { type AxiosResponse } from 'axios';

export const serverFetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, options);
  return response.json();
};

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const returnData = <T>(data: T) => {
  return { data } as AxiosResponse<T>;
};
