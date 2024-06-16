import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

import { getTemplateQueryOptions } from '@/features/templates/api/get-template';

export const templateLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const templateId = params.templateId as string;

    const templateQuery = getTemplateQueryOptions(templateId);

    const promises = [
      queryClient.getQueryData(templateQuery.queryKey) ??
        (await queryClient.fetchQuery(templateQuery)),
    ] as const;

    const [template] = await Promise.all(promises);

    return {
      template,
    };
  };
