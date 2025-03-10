import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import PayoutContainer from './PayoutContainer';
import { getPayouts } from '../../actions/Payout/getPayouts';
import messages from '../../locale/messages';

const title = 'Payout Preferences';

export default async function action({ store, intl, query }) {
  const title = intl?.formatMessage(messages.payoutPreferencesTab);

  // From Redux Store
  let isAuthenticated = store.getState().runtime.isAuthenticated;
  let currentAccountId = query && query.account;
  const userId = store.getState().account && store.getState().account.data && store.getState().account.data.userId;
  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  await store.dispatch(getPayouts(currentAccountId, userId));

  return {
    title,
    component: <UserLayout><PayoutContainer title={title} currentAccountId={currentAccountId} /></UserLayout>,
  };
}
