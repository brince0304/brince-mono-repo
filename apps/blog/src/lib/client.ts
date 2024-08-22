export const serverFetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${process.env.API_URL}/${url}`, options);
  return response.json();
};
