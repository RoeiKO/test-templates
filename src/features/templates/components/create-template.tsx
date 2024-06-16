import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import {
  createTemplateInputSchema,
  useCreateTemplate,
} from '../api/create-template';

export const CreateTemplate = () => {
  const { addNotification } = useNotifications();
  const createTemplateMutation = useCreateTemplate({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Template Created',
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createTemplateMutation.isSuccess}
        triggerButton={
          <Button size="sm" icon={<Plus className="size-4" />}>
            Create Template
          </Button>
        }
        title="Create Template"
        submitButton={
          <Button
            form="create-template"
            type="submit"
            size="sm"
            isLoading={createTemplateMutation.isPending}
          >
            Submit
          </Button>
        }
      >
        <Form
          id="create-template"
          onSubmit={(values) => {
            createTemplateMutation.mutate({ data: values });
          }}
          schema={createTemplateInputSchema}
        >
          {({ register, formState }) => (
            <>
              <Input
                label="Title"
                error={formState.errors['title']}
                registration={register('title')}
              />

              <Textarea
                label="Body"
                error={formState.errors['body']}
                registration={register('body')}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
