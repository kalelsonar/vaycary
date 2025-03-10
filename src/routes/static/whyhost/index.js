import React from 'react';
import Layout from '../../../components/Layout';
import messages from '../../../locale/messages';
import WhyHost from './WhyHost';

const title = 'whyhost';

export default function action({ intl }) {
   
  const title = intl?.formatMessage(messages.whyhostTab);

  return {
    title,
    component: <Layout><WhyHost title={title} /></Layout>,
  };
}
