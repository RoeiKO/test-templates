import { Helmet, HelmetData } from 'react-helmet-async';

import { env } from '@/config/env';

type HeadProps = {
  title?: string;
  description?: string;
};

const helmetData = new HelmetData({});

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title} | ${env.APP_NAME}` : undefined}
      defaultTitle={env.APP_NAME}
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
