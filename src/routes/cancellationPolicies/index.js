import React from 'react';
import Layout from '../../components/Layout';
import messages from '../../locale/messages';
import Policies from './Policies';

const title = 'Cancellation Policies';

export default function action({ params, intl }) {

  const title = intl?.formatMessage(messages.cancellationPolicies);

  // From URL
  const policyType = params.type;

  return {
    title,
    component: <Layout><Policies policyType={policyType} /></Layout>,
  };
}