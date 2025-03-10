import React from 'react';
import HeadLessLayout from '../../../components/Layout/HeadLessLayout';
import messages from '../../../locale/messages';
import AdminLogin from './AdminLogin';

const title = 'Admin Log In';

export default function action(context) {

  const title = context?.intl?.formatMessage(messages.adminLogInTab);

  // From Redux Store
  let isAdminAuthenticated = context.store.getState().runtime.isAdminAuthenticated;

  if (isAdminAuthenticated) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: <HeadLessLayout><AdminLogin title={title} /></HeadLessLayout>,
  };
}
