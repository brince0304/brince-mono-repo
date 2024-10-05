import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Parameter = {
  [key: string]: string;
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

  const handleRoute = ({ baseUrl, parameters, replace, clear = true }: RouteWithParameters) => {
    const currentSearchParams = new URLSearchParams(useSearchParams());
    const newSearchParams = new URLSearchParams(currentSearchParams);

    if (parameters) {
      for (const [key, value] of Object.entries(parameters)) {
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
    const newPathname = `${baseUrl || pathname}${queryString ? `?${queryString}` : ''}`;

    if (replace) {
      router.replace(newPathname);
      return;
    }

    router.push(newPathname);
  };

  return handleRoute;
};

export default useRouteWithParameters;
