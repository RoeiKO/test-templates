import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Template } from '@/types/api';

import { getTemplateQueryOptions } from './get-template';

export const updateTemplateInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

export type UpdateTemplateInput = z.infer<typeof updateTemplateInputSchema>;

export const updateTemplate = ({
  data,
  templateId,
}: {
  data: UpdateTemplateInput;
  templateId: string;
}): Promise<Template> => {
  return api.patch(`/templates/${templateId}`, data);
};

type UseUpdateTemplateOptions = {
  mutationConfig?: MutationConfig<typeof updateTemplate>;
};

export const useUpdateTemplate = ({
  mutationConfig,
}: UseUpdateTemplateOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getTemplateQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateTemplate,
  });
};
