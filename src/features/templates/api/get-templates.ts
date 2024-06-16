import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Template } from '@/types/api';

export const getTemplates = (): Promise<Template[]> => {
  return api.get('/templates');
};

export const getTemplatesQueryOptions = () => {
  return queryOptions({
    queryKey: ['templates'],
    queryFn: () => getTemplates(),
  });
};

type UseTemplatesOptions = {
  queryConfig?: QueryConfig<typeof getTemplatesQueryOptions>;
};

export const useTemplates = ({ queryConfig }: UseTemplatesOptions = {}) => {
  return useQuery({
    ...getTemplatesQueryOptions(),
    ...queryConfig,
  });
};
