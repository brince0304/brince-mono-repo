import { usePathname } from 'next/navigation';
import { isServer } from '@/lib/next';

export default function useQueryString(keys: string[]) {
  const pathname = isServer() ? usePathname() : window.location.pathname;
  const searchParams = new URLSearchParams(pathname.split('?')[1] || '');

  const result: Record<string, string> = {};

  for (const key of keys) {
    const value = searchParams.get(key);
    if (value !== null) {
      result[key] = value;
    }
  }

  return result;
}
