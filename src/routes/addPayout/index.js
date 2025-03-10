import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import messages from '../../locale/messages';
import AddPayoutContainer from './AddPayoutContainer';

const title = 'Add Payout Preferences';

export default function action({ store, intl }) {

  // From Redux Store
  let isAuthenticated = store.getState().runtime.isAuthenticated;

  const title = intl?.formatMessage(messages.addPayoutPreferencesTab);

  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  let accountData = store.getState().account.data;

  return {
    title,
    component: <UserLayout><AddPayoutContainer title={title} initialData={accountData} /></UserLayout>,
  };
}
