import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import { ContentLayout } from '@/components/layouts';
import { Spinner } from '@/components/ui/spinner';
import { useTemplate } from '@/features/templates/api/get-template';
import { TemplateView } from '@/features/templates/components/template-view';

export const TemplateRoute = () => {
  const params = useParams();
  const templateId = params.templateId as string;
  const templateQuery = useTemplate({
    templateId,
  });

  if (templateQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!templateQuery.data) return null;

  return (
    <>
      <ContentLayout title={templateQuery.data.title}>
        <TemplateView templateId={templateId} />
        <div className="mt-8">
          <ErrorBoundary
            fallback={
              <div>Failed to load comments. Try to refresh the page.</div>
            }
          >
            Assume we have comments here for {templateId}
          </ErrorBoundary>
        </div>
      </ContentLayout>
    </>
  );
};
