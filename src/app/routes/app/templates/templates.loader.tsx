import { QueryClient } from '@tanstack/react-query';

import { getTemplatesQueryOptions } from '@/features/templates/api/get-templates';

export const templatesLoader = (queryClient: QueryClient) => async () => {
  const query = getTemplatesQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
