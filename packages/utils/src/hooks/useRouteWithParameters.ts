import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Parameter = {
  [key: string]: string | undefined;
};

type RouteWithParameters = {
  parameters?: Parameter;
  baseUrl?: string;
  replace?: boolean;
  clear?: boolean;
};

const useRouteWithParameters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createUrl = ({
    baseUrl,
    parameters,
    clear = true,
  }: Omit<RouteWithParameters, 'replace'>) => {
    const currentSearchParams = new URLSearchParams(searchParams);
    const newSearchParams = new URLSearchParams(currentSearchParams);

    if (parameters) {
      for (const [key, value] of Object.entries(parameters)) {
        if (value === undefined) {
          newSearchParams.delete(key);
          continue;
        }

        newSearchParams.set(key, value);
      }

      if (clear) {
        newSearchParams.forEach((_, key) => {
          if (!(key in parameters)) {
            newSearchParams.delete(key);
          }
        });
      }
    }

    const queryString = newSearchParams.toString();
    return `${baseUrl || pathname}${queryString ? `?${queryString}` : ''}`;
  };

  const handleRoute = {
    push: (options: Omit<RouteWithParameters, 'replace'>) => {
      router.push(createUrl(options));
    },
    replace: (options: Omit<RouteWithParameters, 'replace'>) => {
      router.replace(createUrl(options));
    },
  };

  return handleRoute;
};

export default useRouteWithParameters;
