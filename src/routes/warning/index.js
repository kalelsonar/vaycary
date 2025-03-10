import React from 'react';
import Layout from '../../components/Layout';
import messages from '../../locale/messages';
import Warning from './Warning';

const title = 'Page Not Found';

export default function action({ intl }) {

  const title = intl?.formatMessage(messages.pageNotFoundTab);

  return {
    title,
    component: <Layout><Warning title={title} /></Layout>,
    status: 404,
  };
}
