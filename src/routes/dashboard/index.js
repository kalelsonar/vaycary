import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import messages from '../../locale/messages';
import Dashboard from './Dashboard';

const title = 'Dashboard';

export default function action({ store, intl }) {

  const title = intl?.formatMessage(messages.dashboard);

  // From Redux Store
  let isAuthenticated = store.getState().runtime.isAuthenticated;

  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: <UserLayout><Dashboard title={title} /></UserLayout>,
  };
};
