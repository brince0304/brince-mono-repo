import { useSearchParams } from 'next/navigation';

export default function useQueryString(keys: string[]) {
  const searchParams = useSearchParams();

  const result: Record<string, string> = {};

  for (const key of keys) {
    const value = searchParams.get(key);
    if (value !== null) {
      result[key] = value;
    }
  }

  return result;
}
