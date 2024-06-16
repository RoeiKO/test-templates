import { MDPreview } from '@/components/ui/md-preview';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/utils/format';

import { useTemplate } from '../api/get-template';

import { UpdateTemplate } from './update-template';

export const TemplateView = ({ templateId }: { templateId: string }) => {
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
    <div>
      <span className="text-xs font-bold">
        {formatDate(templateQuery.data.createdAt)}
      </span>
      {templateQuery.data.author && (
        <span className="ml-2 text-sm font-bold">
          by {templateQuery.data.author.firstName}{' '}
          {templateQuery.data.author.lastName}
        </span>
      )}
      <div className="mt-6 flex flex-col space-y-16">
        <div className="flex justify-end">
          <UpdateTemplate templateId={templateId} />
        </div>
        <div>
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="mt-1 max-w-2xl text-sm text-gray-500">
                <MDPreview value={templateQuery.data.body} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
