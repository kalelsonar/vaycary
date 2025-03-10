import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import TransactionContainer from './TransactionContainer';
import messages from '../../locale/messages';

export default function action({ store, params, intl }) {

  const title = intl?.formatMessage(messages.transactionHistory);
  const isAuthenticated = store.getState().runtime.isAuthenticated;
  const mode = params.type;

  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: <UserLayout><TransactionContainer mode={mode ? mode : "completed"} /></UserLayout>,
  };
}
