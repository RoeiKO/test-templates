import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Template } from '@/types/api';

import { getTemplatesQueryOptions } from './get-templates';

export const createTemplateInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

export type CreateTemplateInput = z.infer<typeof createTemplateInputSchema>;

export const createTemplate = ({
  data,
}: {
  data: CreateTemplateInput;
}): Promise<Template> => {
  return api.post(`/templates`, data);
};

type UseCreateTemplateOptions = {
  mutationConfig?: MutationConfig<typeof createTemplate>;
};

export const useCreateTemplate = ({
  mutationConfig,
}: UseCreateTemplateOptions = {}) => {
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
    mutationFn: createTemplate,
  });
};
