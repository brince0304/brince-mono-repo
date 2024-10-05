import { isServer } from '@/lib/next';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

type RouteWithParameters = {
  parameters: Record<string, string>;
  replace?: boolean;
  maintenance?: boolean;
};

const useRouteWithParameters = (args: RouteWithParameters) => {
  const router = isServer() ? useRouter() : window.location;

  const { parameters, replace, maintenance } = args;
};
