import { useQuery, queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Template } from '@/types/api';

export const getTemplate = ({
  templateId,
}: {
  templateId: string;
}): Promise<Template> => {
  return api.get(`/templates/${templateId}`);
};

export const getTemplateQueryOptions = (templateId: string) => {
  return queryOptions({
    queryKey: ['templates', templateId],
    queryFn: () => getTemplate({ templateId }),
  });
};

type UseTemplateOptions = {
  templateId: string;
  queryConfig?: QueryConfig<typeof getTemplateQueryOptions>;
};

export const useTemplate = ({
  templateId,
  queryConfig,
}: UseTemplateOptions) => {
  return useQuery({
    ...getTemplateQueryOptions(templateId),
    ...queryConfig,
  });
};
