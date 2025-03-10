import React from 'react';
import Layout from '../../components/Layout';
import NotFound from './NotFound';

import messages from '../../locale/messages';

export default function action({ intl }) {
  const title = intl?.formatMessage(messages.pageNotFoundTab);
  return {
    title,
    component:
      <Layout>
        <NotFound title={title} />
      </Layout>,
    status: 404,
  };
}