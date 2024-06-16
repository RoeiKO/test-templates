import { ContentLayout } from '@/components/layouts';
import { CreateTemplate } from '@/features/templates/components/create-template';
import { TemplatesList } from '@/features/templates/components/templates-list';

export const TemplatesRoute = () => {
  return (
    <ContentLayout title="Templates">
      <div className="flex justify-end">
        <CreateTemplate />
      </div>
      <div className="mt-4">
        <TemplatesList />
      </div>
    </ContentLayout>
  );
};
