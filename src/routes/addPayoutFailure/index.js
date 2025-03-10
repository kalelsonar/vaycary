import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import messages from '../../locale/messages';
import AddPayoutFailure from './AddPayoutFailure';

const title = 'Payout Failure';

export default function action({ store, intl, query }) {

  const title = intl?.formatMessage(messages.payoutFailureTab);

  // From Redux Store
  let isAuthenticated = store.getState().runtime.isAuthenticated;
  let currentAccountId = query && query.account;

  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: <UserLayout><AddPayoutFailure title={title} currentAccountId={currentAccountId} /></UserLayout>,
  };
};
