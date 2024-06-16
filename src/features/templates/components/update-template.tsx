import { Pen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { useTemplate } from '../api/get-template';
import {
  updateTemplateInputSchema,
  useUpdateTemplate,
} from '../api/update-template';

type UpdateTemplateProps = {
  templateId: string;
};

export const UpdateTemplate = ({ templateId }: UpdateTemplateProps) => {
  const { addNotification } = useNotifications();
  const templateQuery = useTemplate({ templateId });
  const updateTemplateMutation = useUpdateTemplate({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Template Updated',
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateTemplateMutation.isSuccess}
        triggerButton={
          <Button icon={<Pen className="size-4" />} size="sm">
            Update Template
          </Button>
        }
        title="Update Template"
        submitButton={
          <Button
            form="update-template"
            type="submit"
            size="sm"
            isLoading={updateTemplateMutation.isPending}
          >
            Submit
          </Button>
        }
      >
        <Form
          id="update-template"
          onSubmit={(values) => {
            updateTemplateMutation.mutate({
              data: values,
              templateId,
            });
          }}
          options={{
            defaultValues: {
              title: templateQuery.data?.title ?? '',
              body: templateQuery.data?.body ?? '',
            },
          }}
          schema={updateTemplateInputSchema}
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
