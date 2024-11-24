import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface QueryHydrationBoundaryProps {
  children: React.ReactNode;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  queryOptions: any;
}

const QueryHydrationBoundary = async ({ children, queryOptions }: QueryHydrationBoundaryProps) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryOptions);

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default QueryHydrationBoundary;
