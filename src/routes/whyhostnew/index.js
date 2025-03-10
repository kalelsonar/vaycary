import React from 'react';
import Layout from '../../components/Layout';
import messages from '../../locale/messages';
import WhyHostNew from './WhyHostNew';

const title = 'Become a host';


export default function action({ intl }) {

  const title = intl?.formatMessage(messages.becomeAHost);

  let whyHostHeader = 'whyHostHeader';

  return {
    title,
    component: <Layout whyHostHeader={whyHostHeader} whyHostSearchHide><WhyHostNew title={title} /></Layout>,
  };
}
