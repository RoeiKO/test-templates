import { ContentLayout } from '@/components/layouts';
import { useUser } from '@/lib/auth/auth';

export const DashboardRoute = () => {
  const user = useUser();

  return (
    <ContentLayout title="Dashboard">
      <h1 className="text-xl">
        Welcome <b>{`${user.data?.firstName} ${user.data?.lastName}`}</b>
      </h1>
      <h4 className="my-3">
        Your role is : <b>{user.data?.role}</b>
      </h4>
    </ContentLayout>
  );
};
