import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getTemplatesQueryOptions } from './get-templates';

export const deleteTemplate = ({
  templateId,
}: {
  templateId: string;
}) => {
  return api.delete(`/templates/${templateId}`);
};

type UseDeleteTemplateOptions = {
  mutationConfig?: MutationConfig<typeof deleteTemplate>;
};

export const useDeleteTemplate = ({
  mutationConfig,
}: UseDeleteTemplateOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getTemplatesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteTemplate,
  });
};
