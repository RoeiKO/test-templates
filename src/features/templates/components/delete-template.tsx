import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDeleteTemplate } from '../api/delete-template';

type DeleteTemplateProps = {
  id: string;
};

export const DeleteTemplate = ({ id }: DeleteTemplateProps) => {
  const { addNotification } = useNotifications();
  const deleteTemplateMutation = useDeleteTemplate({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Template Deleted',
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Template"
        body="Are you sure you want to delete this template?"
        triggerButton={
          <Button variant="destructive" icon={<Trash className="size-4" />}>
            Delete Template
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteTemplateMutation.isPending}
            type="button"
            variant="destructive"
            onClick={() =>
              deleteTemplateMutation.mutate({ templateId: id })
            }
          >
            Delete Template
          </Button>
        }
      />
    </Authorization>
  );
};
