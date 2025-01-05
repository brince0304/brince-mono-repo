import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface QueryHydrationBoundaryProps {
  children: React.ReactNode;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  queryOptions: any;
  isInfiniteQuery?: boolean;
}

const QueryHydrationBoundary = async ({ children, queryOptions, isInfiniteQuery }: QueryHydrationBoundaryProps) => {
  const queryClient = new QueryClient();

  if (isInfiniteQuery) {
    await queryClient.prefetchInfiniteQuery(queryOptions);
  } else {
    await queryClient.prefetchQuery(queryOptions);
  }

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default QueryHydrationBoundary;
